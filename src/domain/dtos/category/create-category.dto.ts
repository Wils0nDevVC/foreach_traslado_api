import { UserEntity } from "../../entities/user.entity";



export class CreateCategoryDto {
    constructor(
        public  name: string,
        public  available: boolean,
    ) {}

    static create(object:{[key:string]:any}) : [string?, CreateCategoryDto?]{

        const {name,available = false}  =  object
        let availableBoolean = available
        if(!name) return ['Missing name', undefined]
        if(typeof available !== 'boolean') {
            availableBoolean = ( available === 'true' )
        }


        return [undefined, new CreateCategoryDto(name,availableBoolean)]
    }
}