<?php



/**
 * Función makeMessages
 *
 * Devuelve un array asociativo con mensajes personalizados para las reglas de validación.
 *
 * @return array
 */
function makeMessages()
{
    $messages = [
        'email.required' => 'El email es requerido',
        'email.email' => 'El email debe ser un email valido',
        'email.unique' => 'El email ya existe',
        'firstName.required' => 'El nombre es requerido',
        'lastName.required' => 'El apellido es requerido',
        'idNumber.required' => 'El numero de identificacion es requerido',
        'idNumber.unique' => 'El numero de identificacion ya existe',
        'points.required' => 'Los puntos son requeridos',
        'points.integer' => 'Los puntos deben ser un numero entero',
        'points.min' => 'Los puntos deben ser mayores a 0',
        'points.max' => 'Los puntos deben ser menores a 1000000',
        'password.required' => 'La contraseña es requerida',
        'password.min' => 'La contraseña debe tener al menos 8 caracteres',
        'user.required' => 'El usuario es requerido',

    ];
    return $messages;
}
