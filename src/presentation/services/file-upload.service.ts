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


            //Obetenemos el destino del archivo
            //__dirname : nos ubica en donde esta este archivo, 
            //'../../../' : retrocedemos 3 veces
            //folder : sería lo que recibimos q por defecto es "uploads"
            const destination = path.resolve(__dirname,'../../../',folder);

            //revisamos si el directorio existe 
            this.checkFolder(destination)

            //renombramos el archivo
            const fileName = `${this.uuid()}.${fileExtension}`
            //movemos el archivo con el nombre renombrado
            file.mv(`${destination}/${fileName}`)

            return {fileName};
       } catch (error) {
        //enviamos el errords
             throw error
       }
    }

    async uploadMultiple(
        files:UploadedFile[],
        folder: string = 'uploads',
        validExtensions : string[] = ['png', 'jpg', 'jpeg', 'gif']
    ){
        const filesNames = await Promise.all(
            files.map(file => this.uploadSingle(file, folder, validExtensions))
        );

        return filesNames;
    }
}