# SistemaDumbo
Taller 2 - Introducción Desarrollo Web/Móvil


Tecnologías Utilizadas
================================================================================================================
Base de Datos:
- MySQL Workbench
  
Backend:
- Laravel 10
  
Frontend:
- Angular 16.2

Descarga del proyecto
================================================================================================================

- Clona este repositorio en tu máquina local: 

		git clone https://github.com/naatox/Desarrollo-Web-Movil


## Programas a instalar
Instala [PHP](https://www.php.net/manual/es/install.php).

Instala [Composer](https://getcomposer.org/download/).

Instala [Nodejs](https://nodejs.org/en).
`

## Backend
Selecciona tus preferencias en el archivo .ENV, especialemente:
- Puerto (Por defecto 3306).
- Contraseña.

```bash
cd Practica_02/backend-practica02

composer install

npm install

composer dump-autoload

php artisan migrate

php artisan db:seed

php artisan serve
```

## Frontend

```bash
cd Practica_02/frontend-practica02

npm install -g @angular/cli

npm install 

ng serve
```
Para ingresar a la aplicación web debes de ingresar al link generado en la terminal.
