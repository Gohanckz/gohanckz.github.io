---
title: "Django"
date: 2020-10-20
draft: false
---

* Instalar Virtualenv

```
pip install virtualenv
```

* Crear un entorno virtual

```
virtualenv <nombre_virtualenv>
```
Ejemplo:

```
virtualenv denv
```

* Activar entorno virtual
```
source bin/activate
```

* Instalar Django en entorno virtual (se debe tener el entorno virtual activado)
```
pip install Django
````
* Instalar conector para mongo db
```
python3 -m pip install djongo
```
* Crear proyecto Django

```
django-admin startproyect <nombre_proyecto>
```
Ejemplo:
```
django-admin startproject djangomongo
```

#### Configurar base de datos mongo db (djongo)

1. Instalar djongo
```
python3 -m pip install djongo
```

2. Dentro del fichero settings.py de tu proyecto, agregar:

```
DATABASES = {
    'default': {
        'ENGINE': '<conector_db>',
        'NAME': '<nombre_db>',
    }
}
```
Ejemplo:
```
DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': 'djongomongo_db',
    }
}
```

#### Crear aplicación DJango

```
python3 manage.py startapp <nombre_app>
```
Ejemplo:

```
python3 manage.py startapp book
```

Luego de crear la aplicación, ir a settings.py, INSTALLED_APPS y agregar la aplicación a la lista.
```
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'book', <-- aplicacion agregada
]
```

* Ejecutar servidor Django

```
python3 manage.py runserver
```

#### Migrar aplicaciones DJango 

```
python3 manage.py makemigrations
python3 manage.py migrate
```

#### Crear usuario SuperAdmin

```
python3 manage.py createsuperuser
```

#### Crear modelo

1. Dentro de la carpeta creada por la apliacioón "book", nos dirigimos al fichero models.py quedando de la sigueinte forma

```
from django.db import models

# Create your models here.
class Book(models.Model):
    name = models.CharField(max_length=255)
    content = models.TextField()
```

2. Migramos la aplicación

```
1. python3 manage.py makemigrate
2. python3 manage.py migrate
```

3. Visualizamos la colección que se crea en mondo db

```
1. mongo
2. show dbs
3. use djongomongo_db
4. show collections

```

#### Emplear modelo base de Djongo

1. Dentro de la carpeta creada por la apliacioón "book", nos dirigimos al fichero models.py quedando de la sigueinte forma

```
from djongo import models

# Create your models here.
class Book(models.Model):
_   id = models.ObjectIdField()
    name = models.CharField(max_length=255)
    content = models.TextField()
```
2. Migramos la aplicación

```
1. python3 manage.py makemigrate
2. python3 manage.py migrate
```

