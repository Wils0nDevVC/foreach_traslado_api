import { PrismaClient } from '@prisma/client';
import { ITrasladoRepository } from '../../domain/repository/ITrasladoRepository';
import { TrasladoEntity } from '../../domain/entities/traslado.entity';

const prisma = new PrismaClient();

export class PrismaTrasladoRepository implements ITrasladoRepository {
  async findAll(): Promise<TrasladoEntity[]> {
    const traslados = await prisma.traslado.findMany();
    return traslados.map(traslado => new TrasladoEntity(
      traslado.id,
      traslado.puntoPartida,
      traslado.puntoTermino,
      traslado.medioTransporte,
      new Date(traslado.fechaViaje),
      traslado.kilometros,
      traslado.nombreTrabajador,
      traslado.idaVuelta,
      traslado.userId,
      new Date(traslado.createdAt),
      new Date(traslado.updatedAt)
    ));
  }

  async findById(id: number): Promise<TrasladoEntity | null> {
    const traslado = await prisma.traslado.findUnique({ where: { id } });
    return traslado ? new TrasladoEntity(
      traslado.id,
      traslado.puntoPartida,
      traslado.puntoTermino,
      traslado.medioTransporte,
      new Date(traslado.fechaViaje),
      traslado.kilometros,
      traslado.nombreTrabajador,
      traslado.idaVuelta,
      traslado.userId,
      new Date(traslado.createdAt),
      new Date(traslado.updatedAt)
    ) : null;
  }

  async create(traslado: TrasladoEntity): Promise<TrasladoEntity> {
    const newTraslado = await prisma.traslado.create({
      data: {
        puntoPartida: traslado.puntoPartida,
        puntoTermino: traslado.puntoTermino,
        medioTransporte: traslado.medioTransporte,
        fechaViaje: traslado.fechaViaje,
        kilometros: traslado.kilometros,
        nombreTrabajador: traslado.nombreTrabajador,
        idaVuelta: traslado.idaVuelta,
        userId: traslado.userId,
      }
    });
    return new TrasladoEntity(
      newTraslado.id,
      newTraslado.puntoPartida,
      newTraslado.puntoTermino,
      newTraslado.medioTransporte,
      new Date(newTraslado.fechaViaje),
      newTraslado.kilometros,
      newTraslado.nombreTrabajador,
      newTraslado.idaVuelta,
      newTraslado.userId,
      new Date(newTraslado.createdAt),
      new Date(newTraslado.updatedAt)
    );
  }

  async update(id: number, traslado: Partial<TrasladoEntity>): Promise<TrasladoEntity | null> {
    const updatedTraslado = await prisma.traslado.update({
      where: { id },
      data: traslado,
    });
    return updatedTraslado ? new TrasladoEntity(
      updatedTraslado.id,
      updatedTraslado.puntoPartida,
      updatedTraslado.puntoTermino,
      updatedTraslado.medioTransporte,
      new Date(updatedTraslado.fechaViaje),
      updatedTraslado.kilometros,
      updatedTraslado.nombreTrabajador,
      updatedTraslado.idaVuelta,
      updatedTraslado.userId,
      new Date(updatedTraslado.createdAt),
      new Date(updatedTraslado.updatedAt)
    ) : null;
  }

  async delete(id: number): Promise<boolean> {
    const deletedTraslado = await prisma.traslado.delete({ where: { id } });
    return deletedTraslado ? true : false;
  }
}
