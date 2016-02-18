####Trabajo Final de Graduacion
####Universidad Mariano Galvez De Guatemala
####Ingenieria En Sistemas
####Elaborado Por Gabriela Alejandra Recinos Arévalo
#####Sistema de información de trámites y actividades para edificios administrativos y salones de clase en un campus central de una universidad del departamento de Guatemala, por medio de códigos QR y geolocalización.


```
Esta es la publicacion oficial del trabajo final de graduacion. 

Contiene el codigo fuente del sistema web, contiene los modulos 
y configuración de los servicios que se conectan a mongodb.

```

El sistema web se encuentra en la carpeta **app**
* app
⋅⋅* admin     
⋅⋅⋅ **Contiene la administración de la aplicación (mantenimientos)**
... Esta separado por modulos en cada carpeta.
... La carpeta **user** se puede agregar, modificar y eliminar a los usuarios administradores o profesores.
... La carpeta **building** se puede agregar edificios, modificarlos, eliminarlos y generar código QR
... al agregar un edificio nuevo se puede localizar en el mapa y colocar una marca que identifica la latitu y longitud.
⋅⋅* public    
⋅⋅⋅ **Contiene la búsqueda de la información**
