import { CreateProductDto, CustomError, PaginationDto } from "../../domain";
import { UserEntity } from "../../domain/entities/user.entity";
import { CategoryEntity } from "../../domain/entities/category.entity";
import { ProductModel } from "../../data";

export class ProductService {
  constructor() {}

  createProduct = async (createProductDto: CreateProductDto) => {
    const existProduct = await ProductModel.findOne({
      name: createProductDto.name,
    });
    if (existProduct) throw CustomError.badRequest("Producto ya existe");

    try {
      const product = await new ProductModel(createProductDto);
      await product.save();

      return product;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  };

  getProduct = async (paginationDto: PaginationDto) => {

    const { page, limit } = paginationDto;

    console.log(page, limit)

    try {
      //Hacemos uso de  Promise.all para ejecutar dos peticiones async simultaneamente
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit) ///pagina1
          .limit(limit)
          .populate('user')  //populate llama al diccionario que tiene relacionado y su información
          .populate('category')
      ]);

      //Retorno un objeto de categorias con información de la paginación
      return {
        total: total,
        page: page,
        limit: limit,
        next: `/api/product?page=${page + 1}&limit=${limit}`,
        prev:
          page - 1 > 0 ? `/api/product?page=${page - 1}&limit=${limit}` : null,
        products:products
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  };

  getProductById = async (id: string) => {
    const product = ProductModel.findById(id);
    return product;
  };
}
