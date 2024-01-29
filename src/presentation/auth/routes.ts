import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../services/auth.service';
import { EmailService } from '../services';
import { envs } from '../../config';




export class AuthRoutes {


  static get routes(): Router {

    const router = Router();
    const emailService = new EmailService(
       envs.MAILER_SERVICE,
       envs.MAILER_EMAIL,
       envs.MAILER_SECRET_KEY,
       envs.SEEND_EMAIL
    )
    //AuthService : recibe como D.I el servicio de EmailService
    const authService = new AuthService(emailService)
    //Controlador: recibe como D.I el servicio  AuthService, 
    //elcontrolador solo se encargar de recibir y enviar
    //las peticiones a los servicios y estos harán toda la logica del negocio, 
    //posterior mente el controlador enviara la respuesta
    const controller = new AuthController(authService);
    // Definir las rutas y sus controladores
    router.post('/login', controller.loginUser );
    router.post('/register', controller.registerUser );

    router.get('/validate-email/:token', controller.validateEmail );



    return router;
  }


}

