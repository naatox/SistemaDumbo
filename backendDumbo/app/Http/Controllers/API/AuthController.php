<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\Client;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Crea una nueva instancia del controlador.
     *
     * Se aplica el middleware 'auth:api' a todos los métodos, excepto 'login'.
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

     /**
     * Maneja la autenticación del usuario y genera un token JWT.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        try{
            $messages = makeMessages();
        $this->validate($request,[
            'user' => ['required', 'string'],
            'password' => ['required', 'string'],
        ], $messages);
        $credentials = $request->only('user', 'password');
        $token = Auth::attempt($credentials);

        if (!$token) {
            return response()->json([
                'message' => 'Usuario o contraseña incorrectos',
            ], 401);
        }

        $user = Auth::user();
        $usersData = Client::where('id', $user->client_id)->first();
        return response()->json([
            'user' => $user,
            'usersData' => $usersData,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);

        }catch(\Exception $e){
            return response()->json([
                'message' => 'Error al iniciar sesión'
            ], 500);
        }

    }


    /**
     * Desconecta al usuario y revoca el token JWT.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        Auth::logout();
        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

    /**
     * Renueva el token JWT del usuario autenticado.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return response()->json([
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
}
