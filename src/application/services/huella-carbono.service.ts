import { TrasladoEntity } from '../../domain/entities/traslado.entity';
import { IHuellaCarbonoService } from '../../domain/repository/IHuellaCarbonoService';
import { ITrasladoRepository } from '../../domain/repository/ITrasladoRepository';

const factoresEmision: Record<string, number> = {
  Metro: 0.033,
  Auto: 0.21,
  Caminoneta: 0.249,
  Motocicleta: 0.092,
  'Bus Transantiago': 0.039,
  'Bus Privado': 0.012,
  'Avión Nacional': 0.279,
  'Avión Internacional': 0.179,
};

export class HuellaCarbonoService implements IHuellaCarbonoService {
  constructor(private readonly trasladoRepository: ITrasladoRepository) {}

  calcularHuella(kilometros: number, medioTransporte: string, idaVuelta: boolean): number {
    const factor = factoresEmision[medioTransporte] || 0;
    const kmTotales = idaVuelta ? kilometros * 2 : kilometros;
    return kmTotales * factor;
  }

  async calcularHuellaTotal(): Promise<number> {
    const traslados: TrasladoEntity[] = await this.trasladoRepository.findAll();
    return traslados.reduce((total, traslado) => {
      const huella = this.calcularHuella(traslado.kilometros, traslado.medioTransporte, traslado.idaVuelta);
      return total + huella;
    }, 0);
  }
}
