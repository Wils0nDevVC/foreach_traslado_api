import mysql  from "mysql2";

interface Options {
    host:string,
    user: string,
    password: string,
    database: string,
    port: number
}

export class MysqlDatabase {
   

    static async connect(options:Options){

        const { host,
            user,
            password,
            database,
            port } = options;
        try {
            const connection = mysql.createConnection({
                host,
                user,
                password,
                database,
                port
              });
              console.log('Connectado...');
            return true;
        } catch (error) {
          console.log('MySql connection error');
          throw error;
        }
    }
}