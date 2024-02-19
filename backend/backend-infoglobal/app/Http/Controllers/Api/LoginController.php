<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function Login(Request $request)
    {
        //$credentials = $request->only('email', 'password');

        
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        // validator fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('auth-token')->plainTextToken;
            $role = $user->role;
            
            return response()->json([
                'success' => true,
                'message'=>"You has been Login",
                'user' => $user,
                // 'role'=>$role,
                'token' => $token,
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials',
        ], 401);
    }
}