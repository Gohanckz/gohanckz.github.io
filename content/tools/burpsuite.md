---
title: "Burpsuite"
date: 2020-10-21T23:49:08-03:00
---

Burp Suite ofrece una amplia gama de utilidades cuando realizamos pentesting de aplicaciones web. Aquí hay una descripción general rápida.

|Componente|Descripción|
|:--------|:---------|
|Proxy|permite canalizar el tráfico a través de Burp Suite para un análisis más detallado.|
|Target|cómo establecemos el alcance de nuestro proyecto. También podemos usar esto para crear de manera efectiva un sitemap de la aplicación que estamos probando.|
|Intruder|herramienta increíblemente poderosa para todo, desde el campo fuzzing hasta el relleno de credenciales y más.|
|Repeater|nos permite 'repetir' solicitudes que se han realizado previamente con o sin modificación. A menudo se utiliza en un paso previo al fuzzing con el intruso mencionado anteriormente.|
|Sequencer|analiza la 'aleatoriedad' presente en partes de la aplicación web que están destinadas a ser impredecibles. Esto se usa comúnmente para probar las cookies de sesión.|
|Decoder|omo su nombre indica, Decoder es una herramienta que nos permite realizar varias transformaciones en piezas de datos. Estas transformaciones varían desde la decodificación / codificación hasta varias bases o codificación de URL.|
|Comparer|Comparer, como habrá adivinado, es una herramienta que podemos usar para comparar diferentes respuestas u otros datos, como mapas del sitio o historiales de proxy (increíble para las pruebas de problemas de control de acceso). Esto es muy similar a la herramienta diff de Linux.|
|Extender|similar a agregar mods a un juego como Minecraft, Extender nos permite agregar componentes como integraciones de herramientas, definiciones de escaneo adicionales y más.|
|Scanner|scáner de vulnerabilidades web automatizado que puede resaltar áreas de la aplicación para una mayor investigación manual o una posible explotación con otra sección de Burp. Esta función, aunque no está en la edición comunitaria de Burp Suite, sigue siendo una faceta clave para realizar una prueba de aplicación web.|

#### Cambiar modo oscuro

Para cambiar Burpsuite al modo oscuro debemos seguir la siguiente ruta para seleccionar el tema de interés.
```
User otions > Display > Look and fell : Darcula.
```