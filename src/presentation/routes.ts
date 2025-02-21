import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { TrasladoRoutes } from './traslado/routes';




export class AppRoutes {

  //routes : este metodo obtiene todas las rutas de AuthRoutes
  static get routes(): Router {
    const router = Router();
    
    // router.use : por este middleware pasaran mis rutas
     router.use('/api/auth', AuthRoutes.routes );
     router.use('/api/traslado', TrasladoRoutes.routes );
    //  router.use('/api/category', CategoryRoutes.routes );
    //  router.use('/api/products', ProductRoutes.routes );
    //  router.use('/api/upload', FileUploadRoutes.routes );



    return router;
  }


}

