---
title: "Guía cvss"
date: 2020-10-07T14:07:49-03:00
draft: false
toc: false
images:
tags:
  - cvss

---

### Common Vulnerability Sciring System v3.1: Guía de usuario

El common vulnerability Scoring System (CVSS) es un framework abierto para comunicar las características y la gravedad de las vulnerabilidades del software. CVSS consta de tres grupos:

 - Base: Represneta las cualidades intrínsecas de una vulnerabilidad que son constantes a lo largo del tiempo y en todos los entornos de usuario.

 - Temporal: Refleja las características de una vulnerabilidad que cambian con el tiempo.

 - Ambiental: Representa las características de una vulnerabilidad que son exclusivas de un usuario.

 ### Métricas de explotación

 #### Vector de ataque

 Esta métrica refleja el contexto en el que es posible la explotación de vulnerabilidades. Este valor de métrica (y, en consecuencia, la puntuación base) será mayor cuanto más remoto (lógica y físicamente) pueda ser un atacante para explotar el componente vulnerable. La suposición es que la cantidad de atacantes potenciales para una vulnerabilidad que podría explotarse a través de una red es mayor que la cantidad de atacantes potenciales que podrían aprovechar una vulnerabilidad que requiera acceso físico a un dispositivo y, por lo tanto, garantiza una puntuación base mayor. 


 ### Guía de puntuación

 #### Puntuación CVSS en el ciclo de vida del exploit

 Al comprender cuando puntuar el impacto de las vulnerabilidades, los analistas deben limitar los impactos a un impacto final razonable que estén seguros de que un atacante puede lograr. La capacidad para causar este impacto debe estar respaldada por su subpuntaje de Explotabilidad como mínimo, pero también puede incluir detalles de la descripción de la vulnerabilidad. Por ejemplo, considere las siguientes dos vulnerabilidades.
 

 #### Vulnerabilidad 1 {Solicitud servidor web}

 Un atacante remoto no autenticado puede enviar una solicitud trivial y elaborada a un serbidor web que hace que el servidor web revele la contraseña del texto sin formato de la cuenta raíz (administrador). El analista solo sabe a partir de las métricas de la puntuación secundaria de explotabilidad y la descripción de la vulnerabilidad que el atacante tiene acceso apara enviar una solicitud elaborada al servidor web para aprovechar la vulnerabilidad.
 
El impacto debería detenerse allí, Si bien un atacante puede usar estas credenciales para ejecutar código posteriormente como administrador, no se sabe si el atacante tiene acceso a un indicador de inicio de sesión o método para ejecutar comandos con esas credenciales. Obtener acceso a esta contraseñá representa una pérdida directa y grave de confidencialidad únicamente:


   
#### Detalle

|Indicador| Descripción |
|----|---|
|Vector de ataque (AV)  |Network (N), Explotación remota (a través de uno o mas routers.)|
|Complejidad de ataque (AC)|Low (L), No existen condiciones de acceso especializadas o circuntancias atenuantes. Un atacante puede esperar un éxito repetible contral el componente vulnerable|
|Privilegios requeridos (PR)|None (N), El atacante no está autorizado antes del ataque y, por lo tanto, no requiere ningún acceso a la configuración de los archivos para llevar a cabo un ataque.|
|Interacción de usuario (UI)|None (N), El sistema vulnerable puede explotarse sin la interacción de ningún usuario.|
|Alcance (s)| Unchanged(U), Una vulnerabilidad explotada solo puede afectar a los recursos administrados por la misma autoridad de seguridad. (El componente vulnerable y el componente afectado son el mismo) |
|Confidencialidad (C)| Low (L), Hay cierta pérdida de confidencialidad.|
|Integridad (I)| None (N), No hay pérdida de integridad dentro del componente afectado.|
|Disponibilidad (A) | None (N), No hay perdida de disponibilidad dentro del componente afectado.|

 ```
 Nota: 5.3 (Medio) | 3.1 / AV: N / AC: L / PR: N / UI: N / S: U / C: H / I: N / A: N
 ```

 
 #### Vulnerabilidad 2 {BoF de Adobe Acrobat (CVE-2009-0658)}

Adobe Acrobat y Reader versión 9.0 y anteriores son vulnerables a un desbordamiento del búfer, causado por una verificación de límites incorrecta al analizar un flujo de imágenes JBIG2 con formato incorrecto incrustado en un documento PDF. Al persuadir a una víctima para que abra un archivo PDF malicioso, un atacante remoto podría desbordar un búfer y ejecutar código arbitrario en el sistema con los privilegios de la víctima o hacer que la aplicación se bloquee. 

La vulnerabilidad se aprovecha convenciendo a la víctima de que abra un documento malicioso en un sistema que utiliza una versión vulnerable de Adobe Acrobat o Reader. Un atacante debe entregar un documento malicioso a la víctima y confía en que el usuario lo abra. Entonces, la ejecución del código lograda por el atacante depende del nivel de privilegios del usuario en el sistema y podría tener como resultado un alto impacto en la confidencialidad, la integridad y la disponibilidad.

|Indicador| Descripción |
|----|---|
|Vector de ataque (AV) | Local (L), Una falla en el software de documentos local que se desencadena al abrir un documento con el formato incorrecto|
|Complejidad de ataque (AC)|Low (L), No existen condiciones de acceso especializadas o circuntancias atenuantes. Un atacante puede esperar un éxito repetible contral el componente vulnerable|
|Privilegios requeridos (PR)|None (N), El atacante no está autorizado antes del ataque y, por lo tanto, no requiere ningún acceso a la configuración de los archivos para llevar a cabo un ataque.|
|Interacción de usuario (UI)|Required (R), La victima necesita abrir el documento con formato incorrecto|
|Interacción de usuario (UI)|None (N), El sistema vulnerable puede explotarse sin la interacción de ningún usuario.|
|Confidencialidad (C)| High (H),Suponiendo un impacto en el peor de los casos de que la víctima tenga privilegios altos en el sistema afectado.|
|Integridad (I)|  High (H), Suponiendo un impacto en el peor de los casos de que la víctima tenga privilegios altos en el sistema afectado.|
|Disponibilidad (A) |  High (H), Suponiendo un impacto en el peor de los casos de que la víctima tenga privilegios altos en el sistema afectado.|

```
Nota: 7.8 (Alto) | CVSS:3.1/AV:L/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H
```