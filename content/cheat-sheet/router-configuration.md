---
title: "Router/Switch Configuration"
date: 2020-10-06T18:41:20-03:00
draft: false
---

#### ASIGNAR NOMBRE  A SWITCH 

1. Activar modo de configuracion de swicth [Modo privilegiado]

```
enable
```

2. Habilitar modo de configuracion del swicth 
``` 
configure terminal
```
3. Asignar nombre  a swicth
```
hostname nombre_switch
```
4. Salir de modo configuracion y modo privilegiado
``` 
exit
exit
```

#### PROPORCIONAR ACCESO SEGURO A SWITCH

1. Activar modo de configuracion de swicth [Modo privilegiado]
```
enable
```

2. Habilitar modo de configuracion del swicth
```
configure terminal
```

3. Entrar al modo config-line
```
line console 0
```

4. Asignar contraseña al swicth

```
password contraseña_deseada
```

5. Habilitar login para peticion de contraseña al swicth
```
login
```

6. Salir de modo de configuracion y modo privilegiado
```
exit
exit
```

#### ACCESO SEGURO AL MODO PRIVILEGIADO

1. Activar modo de configuracion de swicth
```
enable
```
2. Habilitar modo de configuracion de swicth [Modo privilegiado]
```
configure terminal
```

3. Establecer contraseña para modo privilegiado seguro [solo elegir uno de los dos comandos] -> Enabled secrect = Encriptada
```
enable password contraseña_deseada
enable secret  contraseña_deseada  
```

4. Salir de modo privilegiado y/o configuracion
```
exit
```

#### PROTEGER ACCESO REMOTO

1. Activar el modo de configuracion
```
enable
```

2. Entrar al modo de configuracion del swicth
```
configure terminal
```

3. Entrar al modo de line-vty
```
 line vty 0 15
```

4. Asignar ontraseña remota
```
password contraseña_deseada
```

5. Habilitar login para peticion de contraseña
```
login
```

6. Salir de modo privilegiado y/o configuracion
```
exit
```

#### VERIFICAR SI SE AGREGARON LAS CONTRASEÑAS

1. Mostrar configuracion
```
show running-config
```

#### ENCRIPTAR LAS CONTRASEÑAS DE CONSOLA Y ENABLE

1. Activar modo privilegiado
```
enable
```
2. Entrar en modo de configuracion del swicth
```
confure terminal
```

3. Encriptar contraseña_deseada
```
service password-encryption
```

4. Salir de modo privilegiado y/o configuracion
```
exit
```

#### CONFIGURAR AVISO O MENSAJE EN SWITCH

1. Activar modo privilegiado
```
enable
```

2. Entrar en modo configuracion del swicth
```
configure terminal
```

3. Agregar mensaje o aviso en swicth
```
banner motd "Mensaje deseado"
```

4. Salir de modo de configuracon o privilegiado
```
exit
```

#### GUARDAR LOS ARCHIVOS DE CONFIGURACION EN LA NVRAM

1. Activar modo privilegiado
```
enable
```

2. Guardar los archivos en nvram
```
copy running-config startup-config
```

3. Confirmar
```
[ENTER]
```
4. Salir de modo privilegiado o de configuracion
```
exit
```

#### CONFIGURAR DIRECCIÓN IP

1. Activar modo privilegiado
```
enable
```

2. Entrar en modo de configuracion del terminal
```
configure terminal
```

3. Entramos al interface vlan 1
```
interface vlan 1
```

4. Asignamos IP junto a su máscara
```
ip address direccion_ip mascara_correspondiente
```
5. Mencionamos que no se reinicie el switch
```
no shutdown
```