import { Request, Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";

export class AuthController {
    //D.I
    constructor(
        public readonly authService : AuthService

    ){}
    //unknown: se utiliza para decir que es un tipo de dato desconocido
    private handlerError = (error: unknown, res: Response) => { 
        //si error es una instancia de CustomError
        if(error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message})
        }

    }

     registerUser  = async (req:Request, res: Response)  => {
        
        const [error,registerUserDto] = RegisterUserDto.create(req.body)

        if(error) {
           
            return res.status(400).json(error)
        }
        this.authService.registerUser(registerUserDto!)
        .then((user) => res.json(user))
        .catch((error) => {
            this.handlerError(error,res)
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
            this.handlerError(error,res)
        })
    }
    
    validateEmail  = (req:Request, res: Response) => {
        const {token} = req.params;
        this.authService.validateEmail(token)
        .then(()=> res.json('Email validated'))
        .catch(error => this.handlerError(error,res))
    }

}

