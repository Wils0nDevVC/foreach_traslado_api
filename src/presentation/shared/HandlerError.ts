import {  Response } from "express";
import { CustomError } from "../../domain"


export const handlerError = (error: unknown, res: Response) => { 
    //si error es una instancia de CustomError
    if(error instanceof CustomError) {
        return res.status(error.statusCode).json({error: error.message})
    }

}