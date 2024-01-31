import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import {  CreateProductDto, PaginationDto } from '../../domain';
import { handlerError } from '../shared';




export class ProductController { 
    constructor(
        private readonly productService : ProductService
    ){}

    createProduct =  (req:Request, res : Response) => {

        const [error, productDto ] = CreateProductDto.create(
            { 
                ...req.body,
                user: req.body.user.id
            }
            )
        if(error) return res.status(400).json({error});

        this.productService.createProduct(productDto!)
        .then( product => res.status(200).json(product))
        .catch(err => handlerError(err,res))
    }

    getProducts =  (req:Request, res : Response) => {
        const   {page = 1,limit = 10} = req.query;
         const [error, paginationDto] = PaginationDto.create(+page,+limit);
         if(error) return  res.status(400).json({error});
         
        this.productService.getProduct(paginationDto!)
        .then( products => res.status(200).json(products))
        .catch(err => handlerError(err,res))
    }

    getProductById =  (req:Request, res : Response) => {     
        
    }
}