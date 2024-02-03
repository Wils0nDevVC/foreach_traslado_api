import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CategoryService } from '../services/category.service';
import { FileUploadController } from './controller';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { TypeMiddleware } from '../middlewares/type.middleware';




export class FileUploadRoutes {


  static get routes(): Router {

    const router = Router();
    const categoryService = new CategoryService()
    const fileUpload = new FileUploadController(new FileUploadService)
    
    //esto aplica los middlware a todas nuestras rutas de manera automatica
    router.use(FileUploadMiddleware.containFiles)
    router.use(TypeMiddleware.validTypes(['users,categories,products']))
    //api/upload/single/<user|category|product>
    //api/upload/multiple/<user|category|product>
    router.post('/single/:type',[AuthMiddleware.validateJWT], fileUpload.uplodadFile );
    router.post('/multiple/:type',[AuthMiddleware.validateJWT], fileUpload.uplodadMultipleFile);

    return router;
  }


}

