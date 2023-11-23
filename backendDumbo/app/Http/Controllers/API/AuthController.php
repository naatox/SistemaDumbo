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
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login(Request $request)
    {
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
    }



    public function logout()
    {
        Auth::logout();
        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

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
