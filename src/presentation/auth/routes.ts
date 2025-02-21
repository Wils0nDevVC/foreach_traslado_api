import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../../application/services/auth.service';
import {  UserRepository } from '../../infraestructure/repository/PrismaUserRepository';




export class AuthRoutes {


  static get routes(): Router {

    const router = Router();
    const userRepository = new UserRepository();

    const authService = new AuthService(userRepository)
    const controller = new AuthController(authService);
    
    router.post('/login', controller.loginUser );
    router.post('/register', controller.registerUser );




    return router;
  }


}

