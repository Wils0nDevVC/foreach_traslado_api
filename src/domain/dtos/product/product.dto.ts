import { Validators } from "../../../config";




export class CreateProductDto {
    private constructor( 
        public name: string ,
        public available: boolean,
        public price: number,
        public description: number,
        public user: string,
        public category: string) { }

        static create(object : {[key:string]:any}) : [string?, CreateProductDto?]{

            const {
                name,
                available,
                price,
                description,
                user,
                category} = object;
            if(!name) return ['Missing name'];
            if(!user) return ['Missing user'];
            if(!Validators.isMongoID(user)) return ['User Id invalid']
            if(!category) return ['Missing category'];
            if(!Validators.isMongoID(category)) return ['Category Id invalid']

            return [undefined, new CreateProductDto(
                name,
                !!available,
                price,
                description,
                user,
                category)]
        }
}