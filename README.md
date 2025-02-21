
### Backend

## Base Datos
   - MySql

## Rest Project + TypeScript

Este proyecto previamente inicializado tiene todo lo necesario para trabajar con TypeScript, Express y Rest.

## Patrones
  - Adaptador
  - Dtos
  - Inyección de dependencias



## Instalación

2. Ejecutar `npm install` para instalar las dependencias
3. En caso de necesitar base de datos, configurar el docker-compose.yml y ejecutar `docker-compose up -d` para levantar los servicios deseados.
## 4. Prisma
- ` npm run prisma:generate`
- `npm run prisma:migrate nombre_migracion`
5. Ejecutar `npm run dev` para levantar el proyecto en modo desarrollo


### Endpoint 

## LOGIN - REGISTER 
- POST - http://localhost:3200/api/auth/register
{
    "name": "Manuel",
    "email": "ma18@gmail.com",
    "password": "wilson1890"
    
}

- POST - http://localhost:3200/api/auth/login

{
    "email": "cor@gmail.com",
    "password": "wilson1890"
}



- POST - http://localhost:3200/api/traslado/
{
    "puntoPartida": "Chiclayo",
    "puntoTermino": "Lima",
    "medioTransporte": "Caminoneta",
    "fechaViaje": "2025-02-21",
    "kilometros": "7",
    "nombreTrabajador": "Wilson",
    "idaVuelta": true,
    "userId": 1
}

-- GET - http://localhost:3200/api/traslado/

-- GET - http://localhost:3200/api/traslado/huella-carbono/total
