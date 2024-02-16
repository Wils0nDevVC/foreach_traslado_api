
# Auth ,  Validación de Correo, Productos y Categorias

- Este proyecto esta orientado a la autenticación de usuario y la validación de este mediante un token que se enviara a su correo. 
- Tambien se hará la creación de categorias, productos y subida de archivos
- Todo esto usando Usando Clean Architecture.
    - Registro de usuario
    - Login
    - Validación de correo (mediando un correo enviado)
    - Middlewars


## Base Datos
   - MongoDB

## Rest Project + TypeScript

Este proyecto previamente inicializado tiene todo lo necesario para trabajar con TypeScript, Express y Rest.

## Patrones
  - Adaptador
  - Dtos
  - Inyección de dependencias



## Instalación

1. Clonar .env.template a .env y configurar las variables de entorno
2. Ejecutar `npm install` para instalar las dependencias
3. En caso de necesitar base de datos, configurar el docker-compose.yml y ejecutar `docker-compose up -d` para levantar los servicios deseados.
4. Ejecutar `npm run dev` para levantar el proyecto en modo desarrollo

## Configuracion Email
### .env
1. SEEND_EMAIL : 
      - true - envia email
      - false - no envia
2. MAILER_SECRET_KEY : configurar en gmail 
  - activar seguridad : https://myaccount.google.com/security
  - crear clave : https://myaccount.google.com/u/0/apppasswords

3. WEBSERVICE_URL : aqui colocar la url que brina ngrok, para poder ver la validación desde el movil 


# DESCRIPCION DE SCRIPTS
``` 
"scripts": {
    //Esto ejecuta en el hambiente DEV, 
    "dev": "tsnd --respawn --clear src/app.ts", 
    tsnd --respawn --clear : detecta los cambios que se han hecho en algun archivo y reinicia el ambiente

    //build : Te genera los compilados de JS basciamente esto ira a PRD
    "build": "rimraf ./dist && tsc",
    rimraf : elimina y genera un directorio al mismo iempo 
    tsc : compila el typescript

    //Inicia el proyecto en modo PRD 
    "start": "npm run build && node dist/app.js"
  },
  ```