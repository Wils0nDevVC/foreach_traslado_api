import { CustomError } from "../errors/custom.error"
import { UserEntity } from "./user.entity"


export class CategoryEntity {

    constructor(
        public id : string,
        public  name: string,
        public  available: boolean,
       

    ) { }

    static fromObject(object:{[key:string]:any}){

        const {id, _id, name, available, user } = object
        if( !_id && !id ) { throw CustomError.badRequest('Missing Id')}
        if( !name  ) throw CustomError.badRequest('Missing Name')
        if( !available  ) throw CustomError.badRequest('Missing Available')
        if( !user  ) throw CustomError.badRequest('Missing User')
        return new CategoryEntity( _id || id, name, available)
        
    }
}