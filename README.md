# Next.js TesloShop App
Para correr localmente, se necesita la base de datos

## Configurar las variables de entorno

Renombrar el archivo __.env.template__ a __.env__
*MongoDB URL Local:
```
MONGO_URL=mongodb://localhost:27017/teslodb -> example!
```

* Reconstruir los modulos de node y levantar Next
```
npm install
npm run dev
```

## Llenar la bas de datos con informacion de pruebas


Llamar a un endpoint
```
http://localhost:3000/api/seed
```