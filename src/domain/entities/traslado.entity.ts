export class TrasladoEntity {
    constructor(
      public id: number,
      public puntoPartida: string,
      public puntoTermino: string,
      public medioTransporte: string,
      public fechaViaje: Date,
      public kilometros: number,
      public nombreTrabajador: string,
      public idaVuelta: boolean,
      public userId: number,
      public createdAt: Date,
      public updatedAt: Date
    ) {}
  
  }
  