import { envs } from './config/envs';
import { MysqlDatabase } from './data/mysql/mysql-database';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';


(async()=> {
  main();
})();


async function  main() {
  //Inicializo la conexion a BD
  await MysqlDatabase.connect({
    host: envs.DB_HOST,
    user: envs.DB_USER,
    password: envs.DB_PASSWORD,
    database: envs.DB_NAME,
    port: envs.DB_PORT 
  });
  
  //Server es el que orquesta toda mi aplicacion
  //recibe un puerto y las rutas
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}