---
title: "Google Hacking"
date: 2020-10-15T22:48:36-03:00
draft: false
---

Buscar por dominio

```
site:<example.cl>
```

Buscar por dominio omitiendo el sitio web principal
```
site:example.cl> -site:<www.example.cl>
```

Buscar en el título de la web
```
intitle:<string_here>
intitle:"index of/" site:.cl
```

Buscar en la url
```
inurl:<string_here>
inurl:"admin.php"
```

Buscar string que coincida en la url
```
allinurl:"<string_here>"
allinurl:"admin.php"
```

Buscar en el contenido de la página
```
[intex:<string>]
intext:"admin" intex:"password"
```

Buscar texto que se coincida con el string
```
allintex:"<string>"
allintext:"password"
```

Buscar por tipo de fichero
```
filetype:<extención>
filetype:<xls>
```

Buscar por extenciiones que terminen en un parámetro determinado
```
ext:<termino>
ext:pdf
```

Buscar con operador lógico and &&
```
inurl:admin && ext:sql
```

Buscar con operador lógico or ||
```
inurl:admin || ext:sql
```

Realizar busqueda literal por "strings"
```
"busco un ..."
```

Forzar que salga una palabra en la búsqueda ["string +palabra"]
```
busco +laptop
```

Filtrar o quitar palabras en búsqueda \[-<string_here>\]
```
compro +una laptop -desktop
```

Comodín de palabra
```
"Compro laptop nueva"
"* laptop nueva"
"compro * nueva"
"compro laptop *"
```

Comodín de carácter (reemplaza solo un carácter)
```
m.trix
```

Buscar por versiones de sevidor
```
intittle:index.of "server at"
```

Buscar por mensajes de error
```
filetype:xls user password
```

Buscar backup
```
intitle:index.of inurl:backup
```

Busqueda de archivos de respaldo
```
filetype:cfg #kickstart
```

Busqueda de cuentas  / VPN /SPOTIFU / MEGA / DROPBOX / SOFTWARE / ETC
```
inurl:pastebin.com <string>
```
