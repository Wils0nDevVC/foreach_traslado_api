import { CustomError } from "../errors/custom.error"


export class UserEntity {

    constructor(
        public id : string,
        public  name: string,
        public  email: string,
        public  password: string
    ) { }

    static fromObject(object:{[key:string]:any}){

        const {id, name, email,password } = object
        if( !name  ) throw CustomError.badRequest('Missing Name')
        if( !email  ) throw CustomError.badRequest('Missing Email')
        if( !password  ) throw CustomError.badRequest('Missing password')
        return new UserEntity( id, name, email,password)
        
    }
}