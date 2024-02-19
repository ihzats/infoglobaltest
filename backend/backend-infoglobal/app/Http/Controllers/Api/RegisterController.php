<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function Register(Request $request)
    {
        $validator = Validator::make($request->all(),
        [
            'name'=>'required',
            'email'=>'required|email|unique:users',
            'password'=>'required|min:8'
        ]);
        
        //validator fails
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        
        //create user
        $user=User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'email_verified_at'=>now(),
            'role_id' =>2,
            'password'=>bcrypt($request->password),
            'remember_token'=>null
        ]);
        
        // return response JSON user is created
        if($user)
        {
            return response()->json(
                [
                    'success'=>true,
                    'user'=>$user,
                ], 201);
        }
        
        //retun JSON process inserd failed
        return response()->json([
            'success'=>false,
        ],410);
    }
}