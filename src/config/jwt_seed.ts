import { envs } from "./envs";


export class  JWTSeed {
    
    constructor(){}
    public  getJWTSeed(){
        return envs.JWT_SEED
    }
}