import { CustomError } from "../errors/custom.error"


export class UserEntity {

    constructor(
        public id : string,
        public  name: string,
        public  email: string,
        public  emailValidator: boolean,
        public  password: string,
        public  role: string,
        public  img?: string

    ) { }

    static fromObject(object:{[key:string]:any}){

        const {id, _id, name, email,emailValidator,password,img,role } = object
        if( !_id && !id ) { throw CustomError.badRequest('Missing Id')}
        if( !name  ) throw CustomError.badRequest('Missing Name')
        if( !email  ) throw CustomError.badRequest('Missing Email')
        if( emailValidator === undefined  ) throw CustomError.badRequest('Missing emailValidator')
        if( !password  ) throw CustomError.badRequest('Missing password')
        if( !role  ) throw CustomError.badRequest('Missing role')
        return new UserEntity( _id || id, name, email,emailValidator,password,role,img)
        
    }
}