<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Helpers\MyHelper;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getUsers(){
        try{
            $users = Client::where('role','client')->get();
            return response()->json($users);
        }catch(\Exception $e){
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    public function registerUser(Request $request)
    {
        try{
            $messages = makeMessages();
            $this->validate($request,[
                'firstName' => ['required', 'string', 'max:255'],
                'lastName' => ['required', 'string', 'max:255'],
                'idNumber' => ['required', 'string', 'max:255', 'unique:clients'],
                'email' => ['required', 'string','email', 'max:255', 'unique:clients'],
                'points' => ['required', 'integer', 'max:255', 'min:0'],
            ],$messages);



            $user = Client::create([
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'idNumber' => $request->idNumber,
                'email' => $request->email,
                'points' => $request->points,
                'role' => 'client',
            ]);

            return response()->json([
                'message' => 'Cliente creado exitosamente!',
                'user' => $user
            ]);

        }catch(\Exception $e){
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }

    }

    public function updateUser(Request $request){
        try{
            $messages = makeMessages();
            $oldEmail = Client::where('id',$request->id)->first()->email;

            if($oldEmail != $request->email){
                $this->validate($request,[
                    'firstName' => ['required', 'string', 'max:255'],
                    'lastName' => ['required', 'string', 'max:255'],
                    'email' => ['required', 'string','email', 'max:255', 'unique:clients'],
                    'points' => ['required', 'integer', 'max:255', 'min:0'],
                ],$messages);
            }else{
                $this->validate($request,[
                    'firstName' => ['required', 'string', 'max:255'],
                    'lastName' => ['required', 'string', 'max:255'],
                    'email' => ['required', 'string','email', 'max:255'],
                    'points' => ['required', 'integer', 'max:255', 'min:0'],
                ],$messages);
                $user = Client::where('id',$request->id)->update([
                    'firstName' => $request->firstName,
                    'lastName' => $request->lastName,
                    'email' => $request->email,
                    'points' => $request->points
                ]);

                return response()->json([
                    'message' => 'Client updated successfully',
                ]);

            }



        }catch(\Exception $e){
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }


    public function deleteUser(Request $request){
        try{
            $user = Client::find($request->id);
            if (!$user) {
                return response()->json([
                    'message' => 'Cliente no encontrado',
                ], 404);
            }
            $user->delete();
            return response()->json([
                'message' => 'Client eliminado exitosamente!',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'message' => $e->getMessage(),
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
                'message' => $e->getMessage(),
            ], 500);
        }

    }


}
