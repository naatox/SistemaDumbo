<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getUsers(){
        try{
            $users = Client::all();
            return response()->json([
                'users' => $users,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'message' => 'Error',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function registerUser(Request $request)
    {
        try{
            $request->validate([
                'firstName' => 'required|string|max:255',
                'lastName' => 'required|string|max:255',
                'idNumber' => 'required|string|max:255|unique:clients',
                'email' => 'required|string|email|max:255|unique:clients',
                'points' => 'required|integer|max:255',
            ]);
            if($request->points < 0){
                return response()->json([
                    'message' => 'Points must be greater than 0',
                ], 404);
            }


            $user = Client::create([
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'idNumber' => $request->idNumber,
                'email' => $request->email,
                'points' => $request->points,
                'role' => 'client',
            ]);

            return response()->json([
                'message' => 'Client created successfully',
                'user' => $user
            ]);

        }catch(\Exception $e){
            return response()->json([
                'message' => 'Error',
                'error' => $e->getMessage(),
            ], 500);
        }

    }

    public function updateUser(Request $request){
        try{
            $request->validate([
                'firstName' => 'required|string|max:255',
                'lastName' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|max:255',
                'points' => 'required|integer|max:255',
            ]);
            $user = Client::where('id',$request->id)->update([
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'points' => $request->points,
                'role' => $request->role,
            ]);

            return response()->json([
                'message' => 'Client updated successfully',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'message' => 'Error',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function deleteUser(Request $request){
        try{
            $user = Client::find($request->id);
            if (!$user) {
                return response()->json([
                    'message' => 'Client not found',
                ], 404);
            }
            $user->delete();
            return response()->json([
                'message' => 'Client deleted successfully',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'message' => 'Error',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function searchUser(Request $request)
    {
        try{
            $request->validate([
                'idNumber' => 'string|max:255',
                'email' => 'string|email|max:255',
            ]);

            $user = Client::where('idNumber', $request->idNumber)->orWhere('email',$request->email)->first();
            if (!$user) {
                return response()->json([
                    'message' => 'Client not found',
                ], 404);
            }else{
                return response()->json([
                    'user' => $user,
                ]);
            }

        }catch(\Exception $e){
            return response()->json([
                'message' => 'Error',
                'error' => $e->getMessage(),
            ], 500);
        }

    }


}
