import { JsonWebTokenAdapter, bcrypAdapter, envs } from "../../config";
import { JWTSeed } from "../../config/jwt_seed";
import {
  CustomError,
  UserEntity,
} from "../../domain";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import { LoginUserDto } from "../dto/LoginUserDto";
import { RegisterUserDto } from "../dto/RegisterUserDto";

export class AuthService {
  constructor(private readonly userRepository: IUserRepository) {}


  
  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await this.userRepository.findByEmail(
      registerUserDto.email
    );

    if (existUser) throw CustomError.badRequest("Usuario ya existe");

    try {

     const hashedPassword = await bcrypAdapter.hash(registerUserDto.password);



      const newUser = new UserEntity(
        '', 
        registerUserDto.name,
        registerUserDto.email,
        hashedPassword,
      );

      const savedUser = await this.userRepository.save(newUser);

      const { password, ...userEntity } = savedUser;

      const token = await this.generateToken({ ...userEntity });
      
      return {
        user: userEntity,
        token: token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const existUser = await this.userRepository.findByEmail(loginUserDto.email);
    if (!existUser) throw CustomError.badRequest("Usuario no existe");
    try {
      const passwordHash = existUser.password;

      const isPassword = bcrypAdapter.compare(
        loginUserDto.password,
        passwordHash
      );
      if (!isPassword) throw CustomError.badRequest("Password is no valid");
      if (isPassword) {
        const { password, ...uerEntity } = UserEntity.fromObject(existUser);

        const token = await this.generateToken({ ...uerEntity });
        if (!token)
          throw CustomError.internalServer("Error while creating JWT");
        return {
          user: uerEntity,
          token: token,
        };
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  private async generateToken({ ...uerEntity }) {
    const jwtAdapter = new JsonWebTokenAdapter(new JWTSeed());
    const token = await jwtAdapter.generateToken(uerEntity);

    return token;
  }

  // public validateEmail = async (token: string) => {
  //   const jwtAdapter = new JsonWebTokenAdapter(new JWTSeed());
  //   const payload = await jwtAdapter.validateToken(token);

  //   if (!payload) throw CustomError.unAuthrized("Inalid token");

  //   const { email } = payload as { email: string };
  //   if (!email) throw CustomError.internalServer("Email not in token");

  //   const user = await UserModel.findOne({ email });
  //   if (!user) throw CustomError.internalServer("Email not exist");

  //   user.emailValidator = true;
  //   await user.save();

  //   return true;
  // };
}
