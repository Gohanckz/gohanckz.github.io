---
title: "Mongo db"
date: 2020-10-20T11:07:35-03:00
draft: false
---

### Instalar Mongodb en  Gnu/Linux usando 

* Instalar requisitos previos

```
sudo apt-get install libcurl4 openssl liblzma5
```

* Centro de descargas Mongo DB
```
https://www.mongodb.com/try/download/community?tck=docs_server
```

* Instalar .deb amd64 mongo DB

```
sudo dpkg -i install mongodb-linux-*-4.4.1.tgz
```

* Iniciar servicio mongo db

```
sudo systemctl start mongod
```

* Recargar proceso mongo db

```
sudo systemctl daemon-reload
```

* Verificar estatus de mongo db

```
sudo systemctl status mongod
```

* Iniciar mongo db luego de reinicio

```
sudo systemctl enable mongod
```

* Deteter proceso de mongo db

```
sudo systemctl stop mongod
```

* Reiniciar proceso de mongo db
```
sudo systemctl restart mongod
```

* Abrir mongo db

```
mongo
```
### Consultas Mongo db

* Mostrar bases de datos 
```
show databases
```
* Mostrar bases de datos (forma 2)
```
show dbs
```
* Crear base de datos (No se crea hasta que tenga por lo menos un registro)
```
use <nombre_db>
```

### Crear documentos para la base de datos

* Crear documento para base de datos (ejemplo Libro), se debe pegar directamente en la terminal.
```
var book1 = {
    'name' : 'GOT - Vientos de Invierno - InsertOne',
    'description' : 'Libro de fantasia'
};
```
* Acceder al nombre del documento
```
book1.name
```
* Acceder a la descripcion del documento
```
book1.description
```

* Ver la base de datos que tenemos seleccionada
```
db
```
### Insertar documentos en la Base de Datos

* Crear colección (con solo 1 registro - InsertOne)
```
db.collection.insertOne(<documento>);
```
Ejemplo:
```
db.books.insertOne(book1);
```

* Mostrar colecciones de base de datos
```
show collections
```

* Crear documentos para base de datos (Se deben copiar y pegar en la terminal- Inser Many)
```
var book2 = {
    'name' : 'GOT - Cancion de huielo y fuego - InsertMany',
    'description' : 'Libro de fantasia ...'
};

var book3 = {
    'name' : 'GOT - Sangre y fuego - InsertMany',
    'description' : 'Libro de fantasia XD'
};
```

Insertar documentos en colección (multiples registros - InsertMany)
```
db.collection.insertMany([<documento1>,<documento2>,...])
```
Ejemplo:
```
db.books.insertMany([book2,book3])
```

* Insertar documentos en colección con Insert
(Insert es la versión hibrida de insertOne e insertMany, por lo que se puede ocupar de ambas formas)

```
db.collection.insert(<documento>)
db.colelction.insert([<documento1>,<documento2>,...])
```

Ejemplo:
```
db.books.insert(book4);
db.books.insert([book5,book6]);
```

### Buscar elementos en la base de datos - Método find

* Buscar todos los registros insertados en la colección

```
db.collection.find()
```

Ejemplo:

```
db.books.find()
```

* Buscar solo un registro de la colección
```
db.collection.findOne()
```
Ejemplo:
```
db.books.findOne()
```

* Buscar registros por el nombre (devolverá todas las coincidencias)
```
db.collection.find(<query>)
```
Ejemplo:
```
db.books.find({'name':"GOT - Vientos de Invierno - InsertOne"})
```

* Buscar solo 1 registro por el nombre (devolverá solo 1 coincidencia)
```
db.collection.findOne(<query>)
```
Ejemplo
```
db.books.findOne({'name':"GOT - Vientos de Invierno - InsertOne"})
```
* Buscar registro utilizando el ObjectId
```
db.collection.find({'_id': ObjectId("<hash_id>")})
```
Ejemplo:
```
db.books.find({'_id': ObjectId("5f8f0bdc42c01e633df9a043")})
```

* Buscar filtrando por dos parametros y controlar respuesta

```
db.collection.find({
    '_id': ObjectId("<hash_id>"),
    'name': "<valor>",
},
{
    'name':<boolean>,
    'description':<boolean>,
    '_id': <boolean>
});

```

Ejemplo:

```
db.books.find({
    '_id': ObjectId("5f8f0bdc42c01e633df9a043"),
    'name': "GOT - Vientos de Invierno - InsertOne",
},
{
    'name':true,
    'description':true,
    '_id': false
});
```

* Realizar busqueda de todos los elementos de forma ordenada (Pretty)
```
db.collection.find().pretty()
```
Ejemplo:
```
db.books.find().pretty()
```
### Actualizar documentos - Método Update

* Actualizar Nombre del registro desde un ObjectId , Si hay mas de un registro con el mismo Id, se actualizaran todas las coincidencias.
```
db.collection.updateMany(
    {
        '_id': ObjectId("<hash_id>"),
    },
    {
        $set: {
            'name' : "<nuevo_valor_string>",
        }
    }
);
```
Ejemplo:
```
db.books.updateMany(
    {
        '_id': ObjectId("5f8f0bdc42c01e633df9a043"),
    },
    {
        $set: {
            'name' : "Nuevo nombre del documento",
        }
    }
);
```

* Actualizar solo 1 coincidencia (updateOne)

```
db.collection.updateOne(
    {
        '_id': ObjectId("<hash_id>"),
    },
    {
        $set: {
            'name' : "<nuevo_valor_string>",
        }
    }
);
```
Ejemplo:
```
db.books.updateOne(
    {
        '_id': ObjectId("5f8f0bdc42c01e633df9a043"),
    },
    {
        $set: {
            'name' : "Nuevo nombre del documento",
        }
    }
);
```

* Agregar campos al documento

```
db.collection.updateOne(
    {
        '_id': ObjectId("<hash_id>"),
    },
    {
        $set: {
            'name' : "<nuevo_valor_string>",
            '<new_column>' : <info_column>
        }
    }
);
```
Ejemplo:
```
db.books.updateOne(
    {
        '_id': ObjectId("5f8f0bdc42c01e633df9a043"),
    },
    {
        $set: {
            'name' : "Nuevo nombre del documento",
            'age' : 2017,
        }
    }
);
```
### Eliminar documento - Método Delete

* Eliminar solo 1 documento que cumpla con el filtro

```
db.collection.deleteOne({
    '<key_value>': "<value>",
});
```
Ejemplo:
```
db.books.deleteOne({
    '_id': ObjectId("5f8f0bdc42c01e633df9a043"),
});
``` 
* Eliminar todos los documentos que cumplan con el filtro


```
db.collection.deleteMany({
    '<key_value>': "<value>",
});
```
Ejemplo:
```
db.books.deleteMany({
    '_id': ObjectId("5f8f0bdc42c01e633df9a043"),
});
```

### Operadores lógicos y de comparación

* Consulta con condicionales AND

```
db.inventory.find(
    {
        $and : [
            {
                qty: {$gt: 25}
            },
            {
                qty: {$lt: 50}
            }
        ]
    }
).pretty()
```

* Consulta con condicional IN (devuelve todos los documentos que tengas status "A" o "D")

```
db.inventory.find({status: {$in: ["A","D"]}})
```

### Eliminar base de datos

```
1. use <nombre_db_a_eliminar>
2. db.dropDatabase()
```
### Desinstalar mongo DB


1. Detenemos servicio de mongo DB

```
sudo service mongod stop
```

2. Removemos los paquetes agregados durante el proceso de instalación de mongo db

```
sudo apt-get purge mongodb-org*
```

3. Eliminar base dedatos y archivos logs de MongoDB

```
sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongodb
```

