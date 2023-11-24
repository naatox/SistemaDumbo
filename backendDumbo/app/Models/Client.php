<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;
    /**
     * Los atributos que son asignables masivamente.
     *
     * Estos son los campos que se pueden llenar mediante la asignación masiva usando el método create() o update().
     *
     * @var array
     */
    protected $fillable = [
        'firstName', // Primer nombre del cliente
        'lastName',  // Apellido del cliente
        'idNumber',  // Número de identificación del cliente
        'points',    // Puntos del cliente
        'email',     // Correo electrónico del cliente
        'role'       // Rol del cliente
    ];
}
