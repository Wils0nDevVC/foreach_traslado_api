
import { Request, Response } from "express";
import { CustomError, PaginationDto } from "../../domain";
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';
import { handlerError } from "../shared";
import { FileUploadService } from '../services/file-upload.service';
import { UploadedFile } from "express-fileupload";

export enum ValidTypes {
   users ='users',
   products ='products',
   categories ='categories'
}

  

export class FileUploadController {
    constructor(
        private readonly fileUploadService : FileUploadService
    ) {}

    uplodadFile = async (req:Request, res:Response)=> { 
        const type = req.params.type
        // const validTypes  = ['']
        if( !Object.keys(ValidTypes).includes(type)){
            return res.status(400).json({error : `Invalid type : ${type}, valide ones ${Object.keys(ValidTypes)}`})
        }

        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({error : 'No files were selected'})
        }
        const file = req.files.file as UploadedFile;
        
        this.fileUploadService.uploadSingle(file, `uploads/${type}`)
        .then( uploaded => res.json(uploaded) )
        .catch(error => handlerError(error,res))

    }

    uplodadMultipleFile = async (req:Request, res:Response)=> { 
      
        res.json('uplodadMultipleFile')
    }
}