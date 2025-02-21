import { TrasladoEntity } from "../entities/traslado.entity";

export interface ITrasladoRepository {
  create(traslado: TrasladoEntity): Promise<TrasladoEntity>;
  findAll(): Promise<TrasladoEntity[]>;
  findById(id: number): Promise<TrasladoEntity | null>;
  update(id: number, traslado: Partial<TrasladoEntity>): Promise<TrasladoEntity | null>;
  delete(id: number): Promise<boolean>;
}


