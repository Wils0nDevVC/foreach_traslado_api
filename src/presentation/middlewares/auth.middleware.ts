import { NextFunction, Request, Response } from "express";
import { JsonWebTokenAdapter } from "../../config";
import { JWTSeed } from "../../config/jwt_seed";
import { UserEntity } from "../../domain";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthMiddleware {

    static async validateJWT(req:Request, res:Response,next:NextFunction) {
        const authorization = req.header('Authorization');
        if(!authorization) return res.status(401).json({error: 'No token provided'})

        if(!authorization.startsWith('Bearer ')) return  res.status(401).json({error: 'Invalid Bearer token'})

        const token = authorization.split(' ').at(1) || '';
        try {
            const jwtAdapter = new JsonWebTokenAdapter(new JWTSeed())
            const payload = await jwtAdapter.validateToken<{id:number}>(token)
            if(!payload) return res.status(401).json({error:'Invalid token'})
            const id = payload.id
            const user = await  prisma.user.findUnique({ where : {id } }); 
            if(!user) return res.status(401).json({error: 'Invalid token - user'});

            req.body.user = UserEntity.fromObject(user);
            next();

        } catch (error) {
            res.status(500).json({error: 'Internal server error'})
        }
    }
}