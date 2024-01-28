import { regularExps } from "../../../config"
import { CustomError } from "../../errors/custom.error"


export class LoginUserDto {
    constructor(
        public readonly email:string,
        public readonly password: string
    ) {}
        
    static createLogin(object:{[key:string]:any}): [string?,LoginUserDto?] { 

        const {email,password}  =  object

        if(!email) return ['Missing email', undefined]
        if(!password)  return ['Missing pasword', undefined]
        if(!regularExps.email.test(email)) { return ['Email is not valid']}
        if(password.length < 6 ) return ['Password too short']

        return [undefined, new LoginUserDto(email,password)]
    }
}