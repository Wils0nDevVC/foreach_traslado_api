import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './category/routes';




export class AppRoutes {

  //routes : este metodo obtiene todas las rutas de AuthRoutes
  static get routes(): Router {

    const router = Router();
    
    // router.use : por este middleware pasaran mis rutas
     router.use('/api/auth', AuthRoutes.routes );

     router.use('/api/category', CategoryRoutes.routes );



    return router;
  }


}

