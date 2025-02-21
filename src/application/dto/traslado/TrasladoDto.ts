export class CreateTrasladoDto {
  constructor(
    public readonly puntoPartida: string,
    public readonly puntoTermino: string,
    public readonly medioTransporte: string,
    public readonly fechaViaje: string,
    public readonly kilometros: number,
    public readonly nombreTrabajador: string,
    public readonly idaVuelta: boolean,
    public readonly userId: number
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateTrasladoDto?] {
    const {
      puntoPartida,
      puntoTermino,
      medioTransporte,
      fechaViaje,
      kilometros,
      nombreTrabajador,
      idaVuelta,
      userId,
    } = object;

    if (!puntoPartida) return ['Missing puntoPartida', undefined];
    if (typeof puntoPartida !== 'string') return ['puntoPartida must be a string', undefined];

    if (!puntoTermino) return ['Missing puntoTermino', undefined];
    if (typeof puntoTermino !== 'string') return ['puntoTermino must be a string', undefined];

    if (!medioTransporte) return ['Missing medioTransporte', undefined];
    if (typeof medioTransporte !== 'string') return ['medioTransporte must be a string', undefined];

    if (!fechaViaje) return ['Missing fechaViaje', undefined];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaViaje)) {
      return ['fechaViaje must be in YYYY-MM-DD format', undefined];
    }

    if (kilometros === undefined) return ['Missing kilometros', undefined];
    if (typeof kilometros !== 'number' || kilometros <= 0) {
      return ['kilometros must be a positive number', undefined];
    }

    if (!nombreTrabajador) return ['Missing nombreTrabajador', undefined];
    if (typeof nombreTrabajador !== 'string') return ['nombreTrabajador must be a string', undefined];

    if (idaVuelta === undefined) return ['Missing idaVuelta', undefined];
    if (typeof idaVuelta !== 'boolean') return ['idaVuelta must be a boolean', undefined];

    if (userId === undefined) return ['Missing userId', undefined];
    if (typeof userId !== 'number' || userId <= 0) {
      return ['userId must be a positive number', undefined];
    }

    return [
      undefined,
      new CreateTrasladoDto(
        puntoPartida,
        puntoTermino,
        medioTransporte,
        fechaViaje,
        kilometros,
        nombreTrabajador,
        idaVuelta,
        userId
      ),
    ];
  }
}
