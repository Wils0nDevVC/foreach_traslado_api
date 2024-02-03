import { NextFunction, Request, Response } from "express";


export class TypeMiddleware {

    static validTypes(validTypes : string []) {

        return (req:Request, res:Response, next : NextFunction) => {

            //hacemos esto porque el middleware se ejecuta antes del req.params, por lo tanto no podemos obener el parametro
            //req.url : esto me obtiene el url ejemplo : "multiple/products"
            const type = req.url.split('/').at(2)  ?? ''

            if(!validTypes.includes(type)){
                //capturamops el error
                return res.status(400).json({error : `Invalid type : ${type}, valide ones ${validTypes}`})
            }

    
            next();
    
        }

    }
}