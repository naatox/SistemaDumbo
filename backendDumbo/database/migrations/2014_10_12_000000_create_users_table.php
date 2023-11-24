<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Ejecuta la migración para crear la tabla 'users'.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Columna de clave primaria autoincremental
            $table->string('user')->default; // Columna para almacenar el nombre de usuario, con valor por defecto
            $table->string('password')->default(null); // Columna para almacenar la contraseña, con valor por defecto nulo
            $table->foreignId('client_id')->constrained('clients'); // Columna para la clave foránea relacionada con la tabla 'clients'
            $table->timestamps(); // Columnas para almacenar las marcas de tiempo de creación y actualización
        });
    }

    /**
     * Revierte la migración para eliminar la tabla 'users'.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
