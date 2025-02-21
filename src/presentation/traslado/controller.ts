import { Request, Response } from 'express';
import { TrasladoService } from '../../application/services/traslado.service';
import { handlerError } from '../shared';

export class TrasladoController {
  constructor(private readonly trasladoService: TrasladoService) {}

  // Crear un nuevo traslado
  createTraslado = async (req: Request, res: Response) => {
    try {
      const trasladoData = req.body;
      const newTraslado = await this.trasladoService.createTraslado(trasladoData);
      res.status(201).json(newTraslado);
    } catch (error) {
      console.error('Error al crear el traslado:', error);
      handlerError(error, res);
    }
  }

  // Obtener todos los traslados
  getAllTraslados = async (req: Request, res: Response) => {
    try {
      const traslados = await this.trasladoService.getAllTraslados();
      res.json(traslados);
    } catch (error) {
      console.error('Error al obtener los traslados:', error);
      handlerError(error, res);
    }
  }

  // Obtener un traslado por ID
  getTrasladoById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const traslado = await this.trasladoService.getTrasladoById(Number(id));
      if (!traslado) {
        return res.status(404).json({ message: 'Traslado no encontrado.' });
      }
      res.json(traslado);
    } catch (error) {
      console.error('Error al obtener el traslado:', error);
      handlerError(error, res);
    }
  }

  // Actualizar un traslado
  updateTraslado = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const trasladoData = req.body;
      const updatedTraslado = await this.trasladoService.updateTraslado(Number(id), trasladoData);
      if (!updatedTraslado) {
        return res.status(404).json({ message: 'Traslado no encontrado.' });
      }
      res.json(updatedTraslado);
    } catch (error) {
      console.error('Error al actualizar el traslado:', error);
      handlerError(error, res);
    }
  }

  // Eliminar un traslado
  deleteTraslado = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await this.trasladoService.deleteTraslado(Number(id));
      if (!result) {
        return res.status(404).json({ message: 'Traslado no encontrado.' });
      }
      res.json({ message: 'Traslado eliminado correctamente.' });
    } catch (error) {
      console.error('Error al eliminar el traslado:', error);
      handlerError(error, res);
    }
  }

  // Calcular la huella de carbono total
  calcularHuellaTotal = async (req: Request, res: Response) => {
    try {
      const huellaTotal = await this.trasladoService.calcularHuellaTotal();
      res.json({ huellaTotal });
    } catch (error) {
      console.error('Error al calcular la huella de carbono total:', error);
      handlerError(error, res);
    }
  }
}
