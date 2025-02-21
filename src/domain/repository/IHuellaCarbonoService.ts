export interface IHuellaCarbonoService {
    calcularHuella(kilometros: number, medioTransporte: string, idaVuelta: boolean): number;
    calcularHuellaTotal(): Promise<number>;
  }
  