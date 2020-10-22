---
title: "Virtualenv"
date: 2020-10-21T21:29:09-03:00
---

* Instalar virtualenv
```
pip install virtualenv
sudo pip3 install virtualenv
```

* Crear entorno virtual
```
python2 : virtualenv <nombre_entorno_virtual>
python3 : virtualenv <nombre_entorno_virtual> -p python3
```

* Activar entorno virtual
```
source bin/activate
```

* Desactivar entorno virtual
```
deactivate
```

* Eliminar entorno virtual

No existe un comando otorgado por virtualenv para poder eliminar un entorno virtual, sin embargo si nos encontramos en Gnu/Linux podemos eliminar el entorno virtual utilizando la siguiente sentencia.
```
rm -rf <nombre_entorno_virtual>
```
