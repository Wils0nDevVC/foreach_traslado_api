
export class CustomError extends Error {

    //hacemos el metodo privado, para que las instancias se creen mediante sus
    //metodos estaticos
    private constructor(
        public readonly statusCode : number,
        public readonly message : string
    ) {
        super(message)
    }

    //el objetivo del metodo es enviar el mensaje y este ya enviara el código 
    //de forma automatica
    static badRequest(message: string) {
        return new CustomError(400, message);
    }

    static unAuthrized(message: string) {
        return new CustomError(401, message);
    }

    static forBidden(message: string) {
        return new CustomError(403, message);
    }

    static notFound(message: string) {
        return new CustomError(404, message);
    }

    static internalServer(message: string) {
        return new CustomError(500, message);
    }
}