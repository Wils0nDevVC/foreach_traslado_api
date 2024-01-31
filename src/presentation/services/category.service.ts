import { CategoryModel } from '../../data';
import { CustomError, PaginationDto, UserEntity } from '../../domain';
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';


export class CategoryService {
    constructor() { }

    public async createCategory(createCategoryDto:CreateCategoryDto, user:UserEntity){
        const existCategory = await CategoryModel.findOne({name : createCategoryDto.name});

         if(existCategory) throw CustomError.badRequest('Categoría ya existe');
         try {

            const category =  await new CategoryModel({
                ...createCategoryDto,
                user:user.id
                
            });

            await category.save();

            return { 
                id: category.id,
                name: category.name,
                available : category.available
            }

         } catch (error) {
            throw CustomError.internalServer(`${error}`)
         }

    }

    public async getCategory(paginationDto:PaginationDto) { 

        const {page, limit} = paginationDto

        try {
            // const total = await CategoryModel.countDocuments();
            // const categories = await CategoryModel.find()
            // .skip( (page - 1) * limit) ///pagina1
            // .limit(limit)

            //Hacemos uso de  Promise.all para ejecutar dos peticiones async simultaneamente
            const [ total, categories] = await Promise.all([
                CategoryModel.countDocuments(),
                CategoryModel.find()
                .skip( (page - 1) * limit) ///pagina1
                .limit(limit)
            ])

            //Retorno un objeto de categorias con información de la paginación
            return { 
                total: total,
                page: page,
                limit: limit,
                next : `/api/categories?page=${page + 1}&limit=${limit}`,
                prev : (page - 1 > 0 ) ? `/api/categories?page=${page - 1}&limit=${limit}` : null,
                categories : categories.map(category =>({
                    id:category.id,
                    name: category.name,
                    available : category.available
                }))
            }

            return categories;

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }
}