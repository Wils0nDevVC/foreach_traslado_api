import path  from 'path';
import fs from 'fs'
import { UploadedFile } from "express-fileupload";
import { Uuid } from '../../config';
import { CustomError } from '../../domain';


export class FileUploadService {
    constructor(
        private readonly uuid = Uuid.v4
    ) { }

    private checkFolder(folderPath: string){
        if(!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath)
        }
    }

    async uploadSingle(
        file:UploadedFile,
        folder: string = 'uploads',
        validExtensions : string[] = ['png', 'jpg', 'jpeg', 'gif']
    ){
       try {
            //obtenemos la extensión
            const fileExtension = file.mimetype.split('/').at(1) ?? '';
            //validamos si la extensión que viene esta incluida
            if(!validExtensions.includes(fileExtension)){
                //capturamops el error
                throw CustomError.badRequest(`Invalid extension: ${fileExtension}, valid ones ${validExtensions}`)
            }


            const destination = path.resolve(__dirname,'../../../',folder);
            this.checkFolder(destination)
            const fileName = `${this.uuid()}.${fileExtension}`
            file.mv(`${destination}/${fileName}`)

            return {fileName};
       } catch (error) {
        //enviamos el errords
             throw error
       }
    }

    uploadMultiple(
        file:any[],
        folder: string = 'uploads',
        validExtensions : string[] = ['png', 'jpg', 'jpeg', 'gif']
    ){

    }
}