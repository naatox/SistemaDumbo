<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

     /**
     * Los atributos que son asignables masivamente.
     *
     * Estos son los campos que se pueden llenar mediante la asignación masiva usando el método create() o update().
     *
     * @var array
     */
    protected $fillable = [
        'user',      // Nombre de usuario
        'password',  // Contraseña
        'client_id', // Clave foránea relacionada con la tabla 'clients'
    ];

    /**
     * Los atributos que deben ocultarse para la serialización.
     *
     * Oculta ciertos atributos cuando se serializa el modelo, como al convertirlo a formato JSON.
     *
     * @var array
     */
    protected $hidden = [
        'password',  // Oculta la contraseña en las respuestas serializadas
    ];

   /**
     * Obtiene el identificador que se almacenará en el claim 'sub' del JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();  // Devuelve la clave primaria del usuario
    }

    /**
     * Devuelve un array clave-valor con cualquier reclamo personalizado que se agregará al JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];  // No se añaden reclamos personalizados en este caso
    }
}
