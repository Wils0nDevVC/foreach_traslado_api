import { IHuellaCarbonoService } from './../../domain/repository/IHuellaCarbonoService';
import { ITrasladoRepository } from "../../domain/repository/ITrasladoRepository";
import { TrasladoEntity } from "../../domain/entities/traslado.entity";
import { CreateTrasladoDto } from '../dto/traslado/TrasladoDto';

export class TrasladoService {
  constructor(
    private readonly trasladoRepository: ITrasladoRepository,
    private readonly huellaCarbonoService: IHuellaCarbonoService
  ) {}

  // Crear un nuevo traslado y calcular huella de carbono
  async createTraslado(trasladoData: CreateTrasladoDto): Promise<TrasladoEntity> {

    const fechaViaje = new Date(trasladoData.fechaViaje);

    const traslado = new TrasladoEntity(
      0, // El ID se genera en la base de datos
      trasladoData.puntoPartida,
      trasladoData.puntoTermino,
      trasladoData.medioTransporte,
      fechaViaje,
      trasladoData.kilometros,
      trasladoData.nombreTrabajador,
      trasladoData.idaVuelta,
      trasladoData.userId,
      new Date(),
      new Date()
    );

    // Calcular huella de carbono utilizando el servicio inyectado
    const huellaCarbono = this.huellaCarbonoService.calcularHuella(
      traslado.kilometros,
      traslado.medioTransporte,
      traslado.idaVuelta
    );
    console.log('Huella de Carbono:', huellaCarbono);

    // Guardar el traslado en la base de datos
    return await this.trasladoRepository.create(traslado);
  }

  // Obtener todos los traslados
  async getAllTraslados(): Promise<TrasladoEntity[]> {
    return await this.trasladoRepository.findAll();
  }

  // Obtener un traslado por ID
  async getTrasladoById(id: number): Promise<TrasladoEntity | null> {
    return await this.trasladoRepository.findById(id);
  }

  // Actualizar un traslado
  async updateTraslado(id: number, trasladoData: Partial<TrasladoEntity>): Promise<TrasladoEntity | null> {
    return await this.trasladoRepository.update(id, trasladoData);
  }

  // Eliminar un traslado
  async deleteTraslado(id: number): Promise<boolean> {
    return await this.trasladoRepository.delete(id);
  }

  // Calcular la huella de carbono total
  async calcularHuellaTotal(): Promise<number> {
    return await this.huellaCarbonoService.calcularHuellaTotal();
  }
}
