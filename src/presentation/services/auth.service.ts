import { JsonWebTokenAdapter, bcrypAdapter, envs } from "../../config";
import { JWTSeed } from "../../config/jwt_seed";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity,LoginUserDto } from "../../domain";
import { EmailService } from './email.service';


export  class AuthService {

    constructor(private readonly emailService : EmailService){}

    public async registerUser(registerUserDto: RegisterUserDto) {

        const existUser = await UserModel.findOne({email : registerUserDto.email});

        if(existUser) throw CustomError.badRequest('Usuario ya existe');

        try {

            const user =  await new UserModel(registerUserDto);
            //Encriptar contraseña
                //obtengo el password que ya viene del modelo de mongoose y lo hasheo
            user.password = bcrypAdapter.hash(registerUserDto.password);


            await user.save();
            //Email de confirmacion
            this.sendEmailValidationLink(user.email)
            //JWT <--- para mostrar la autenticacion del usuario
            const {password, ...uerEntity} = UserEntity.fromObject(user);

            const token = await this.generateToken({...uerEntity})
            return {
                user : uerEntity,
                token : token
            };
            
           } catch (error) {

                throw CustomError.internalServer(`${error}`)
           }


        
    }


    public async loginUser(loginUserDto : LoginUserDto) {
         
        const existUser = await UserModel.findOne({email : loginUserDto.email});
        if(!existUser) throw CustomError.badRequest('Usuario no existe');
        try {

            const passwordHash = existUser.password

            const isPassword = bcrypAdapter.compare(loginUserDto.password,passwordHash)
            if(!isPassword)  throw CustomError.badRequest('Password is no valid');
            if(isPassword){
                const {password, ...uerEntity} = UserEntity.fromObject(existUser);

                const token = await this.generateToken({...uerEntity})
                if(!token)  throw CustomError.internalServer('Error while creating JWT')
                return  {
                    user : uerEntity,
                    token : token
                };
            }
            
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

    private async generateToken  ({...uerEntity}) {

        const jwtAdapter = new JsonWebTokenAdapter(new JWTSeed())
        const token = await jwtAdapter.generateToken(uerEntity)

        return token
    }

    private sendEmailValidationLink = async( email:string) => { 

        const token = await this.generateToken({email})
        if(!token) throw CustomError.internalServer('Error getting token')
        console.log(token)

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;

        const html = `<h1>Valida Tú Email </h1>
        <p>Click en el siguiente link para validar tu email</p>
        <a href="${link}" >Valida tu email: ${email}</a>`
        const options = {
            to : email,
            subject : 'Valida tu email',
            htmlBody : html,
        }

        const isSent = await this.emailService.sendEmail(options);
        if(!isSent) throw CustomError.internalServer('Error sending email')

        return true;

    }

    public validateEmail = async (token:string) =>{
    
        const jwtAdapter =   new JsonWebTokenAdapter(new JWTSeed())
        const payload = await jwtAdapter.validateToken(token)

        if(!payload) throw CustomError.unAuthrized('Inalid token');

        const { email } = payload as {email:string};
        if(!email) throw CustomError.internalServer('Email not in token');

        const user = await UserModel.findOne({email});
        if(!user) throw CustomError.internalServer('Email not exist');

        user.emailValidator = true;
        await user.save();

        return true;
    }

    
}
