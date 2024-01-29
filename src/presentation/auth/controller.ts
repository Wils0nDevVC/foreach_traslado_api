import { Request, Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";
import { handlerError } from "../shared";

export class AuthController {
    //D.I
    constructor(
        public readonly authService : AuthService

    ){}

     registerUser  = async (req:Request, res: Response)  => {
        
        const [error,registerUserDto] = RegisterUserDto.create(req.body)

        if(error) {
           
            return res.status(400).json(error)
        }
        this.authService.registerUser(registerUserDto!)
        .then((user) => res.json(user))
        .catch((error) => {
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
    
    validateEmail  = (req:Request, res: Response) => {
        const {token} = req.params;
        this.authService.validateEmail(token)
        .then(()=> res.json('Email validated'))
        .catch(error => handlerError(error,res))
    }

}

