vged-table
============

Para la utilización del módulo en diferentes modos se han preparado diversos scripts, cuyo funcionamiento se detalla a continuación:

----------

Scripts
-------------

- "build": Compila y copia el resultado y los archivos estáticos en la carpeta dist.
- "ci:patch": Ejecuta tests, compila, sube la versión patch del proyecto y sube a nexus
- "ci:minor": Ejecuta tests, compila, sube la versión minor del proyecto y sube a nexus
- "ci:major": Ejecuta tests, compila, sube la versión major del proyecto y sube a nexus
- "clean:dist": Elimina la carpeta de empaquetado
- "clean:install": Elimina node_modules y las carpetas generadas y vuelve a instalar los módulos limpiando la caché de npm
- "compodoc": Genera documentación técnica asociada a la aplicación en la carpeta "docs"
- "compodoc:serve": Genera documentación técnica asociada a la aplicación en la carpeta "docs" y arranca un servidor web para consultarla
- "lint": Comprueba la calidad del código con tslint
- "test": Lanza el linter y los tests unitarios

> **Nota:**

> Para arrancar cualquiera de estos scripts bastará con utilizar "npm run nombre_script". Por ejemplo: npm run ci:patch

> **Importante:**

> Los módulos están pensados para ser usados en una aplicación, por lo que deben seguirse unas guías para que funcione correctamente:
> - Utilizar templates inline. No usar archivos html ya que estos archivos no se vuelcan en el compilado
> - No usar recursos estáticos (imágenes, css, etc), por la misma razón que con los html
> - Si se quiere dotar a un componente de funcionamiento con un archivo estático, debe proveerse una propiedad para que se bindee el recurso estático en la aplicación

