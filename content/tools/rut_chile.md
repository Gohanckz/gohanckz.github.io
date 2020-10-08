---
title: "Generador de Ruts chilenos"
date: 2020-10-07T22:46:29-03:00
draft: false
---



```
#------------------------------------------------------------
# ----            GENERADOR DE DÍGITOS RUT CHILENOS     ----|
# ----            Gohanckz                              ----|
# ----            Contact : gohanckz@gmail.cl           ----|
# ----            Version : 2.0                         ----|
#------------------------------------------------------------
```

Genera diccionarios de ruts chilenos con y sin digito verificador para realizar fuerza bruta en tus proyectos de pentesting de manera ética.

#### Descarga

```
git clone https://github.com/Gohanckz/rutchile.git
```

#### Instalación

```
pip install -r requirements.txt

```

#### Uso

1. Generar diccionarios sin dígito verificador con **RUTS** desde 11111111 a 22222222

```
python3 rutchile.py -l 
```

2. Generar diccionario con dígito verificador con **RUTS** desde 11111111 a 22222222

```
python3 rutchile.py -d 
```

3. Generar diccionario con dígito verificador con **RUTS** desde 11111111 a 22222222 y guardar salida en un archivo

```
python3 rutchile.py -d -o <ruta/archivo.txt>
```
