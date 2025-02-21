import { Router } from 'express';
import { TrasladoController } from './controller';
import { TrasladoService } from '../../application/services/traslado.service';
import { PrismaTrasladoRepository } from '../../infraestructure/repository/PrismaTrasladoRepository';
import { HuellaCarbonoService } from '../../application/services/huella-carbono.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class TrasladoRoutes {
  static get routes(): Router {
    const router = Router();

    // Instancia de dependencias
    const trasladoRepository = new PrismaTrasladoRepository();
    const huellaCarbonoService = new HuellaCarbonoService(trasladoRepository);
    const trasladoService = new TrasladoService(trasladoRepository, huellaCarbonoService);

    // Inyección de dependencias en el controlador
    const controller = new TrasladoController(trasladoService);

    router.post('/',[AuthMiddleware.validateJWT], controller.createTraslado);
    router.get('/',[AuthMiddleware.validateJWT], controller.getAllTraslados);
    router.get('/:id',[AuthMiddleware.validateJWT], controller.getTrasladoById);
    router.put('/:id',[AuthMiddleware.validateJWT], controller.updateTraslado);
    router.delete('/:id',[AuthMiddleware.validateJWT], controller.deleteTraslado);
    router.get('/huella-carbono/total',[AuthMiddleware.validateJWT], controller.calcularHuellaTotal);

    return router;
  }
}
