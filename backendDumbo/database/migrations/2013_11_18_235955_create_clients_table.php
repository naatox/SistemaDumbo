<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Ejecuta la migración para crear la tabla 'clients'.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id(); // Columna de clave primaria autoincremental
            $table->string('firstName'); // Columna para almacenar el primer nombre del cliente
            $table->string('lastName'); // Columna para almacenar el apellido del cliente
            $table->string('idNumber')->unique(); // Columna para almacenar el número de identificación único del cliente
            $table->string('email')->unique(); // Columna para almacenar el correo electrónico único del cliente
            $table->integer('points'); // Columna para almacenar la cantidad de puntos del cliente (entero)
            $table->string('role')->default('client'); // Columna para almacenar el rol del cliente (por defecto 'client')
            $table->timestamps(); // Columnas para almacenar las marcas de tiempo de creación y actualización
        });
    }

    /**
     * Revierte la migración para eliminar la tabla 'clients'.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
