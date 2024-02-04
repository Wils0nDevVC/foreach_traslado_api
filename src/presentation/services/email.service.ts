import nodemailer, { Transporter } from 'nodemailer'

interface SendMailOptions {
    to:string | string[];
    subject : string;
    htmlBody:string;
   attachments? : Attachments[]
}
interface  Attachments {
    filename : string;
    path : string
}
export class EmailService {

    private transporter : Transporter;
    constructor(
        mailerService : string,
        mailerEmail : string,
        senderEmailPassword : string,
        private readonly postToProvider: boolean

    ){
        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                user : mailerEmail,
                pass:senderEmailPassword
            }
        });
    }


    async sendEmail(options:SendMailOptions):Promise<boolean>{

        const { to,subject, htmlBody, attachments = []} = options;

        
        try {
            if(!this.postToProvider) return true
            
            await this.transporter.sendMail({
                to:to,
                subject:subject,
                html:htmlBody,
                attachments : attachments
            })
            return true;
        } catch (error) {       
            console.error(error)  
            return false;
        }

    }

   
}