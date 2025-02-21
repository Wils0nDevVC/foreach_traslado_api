import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { handlerError } from "../shared";
import { AuthService } from "../../application/services/auth.service";
import { RegisterUserDto } from "../../application/dto/RegisterUserDto";
import { LoginUserDto } from "../../application/dto/LoginUserDto";

export class AuthController {
    //D.I
    
    constructor(
        public readonly authService : AuthService

    ){}

     registerUser  = async (req:Request, res: Response)  => {
        console.log(req.body)
       const { name, email, password } = req.body;
       const registerUserDto = new RegisterUserDto(name, email, password);

       if (!name || !email || !password) {
           return res.status(400).json({ message: 'Todos los campos son obligatorios' });
       }
       
        this.authService.registerUser(registerUserDto!)
        .then((user) => res.json(user))
        .catch((error) => {
            console.log(error)
            handlerError(error,res)
        })
       
    }

    loginUser  = (req:Request, res: Response) => {
        
        const [ error, loginUserDto ] = LoginUserDto.createLogin(req.body)

        if(error) {
            return res.status(400).json(error)
        }
        this.authService.loginUser(loginUserDto!)
        .then((user)=> res.json(user))
        .catch((error)=>{
            handlerError(error,res)
        })
    }
    
}

