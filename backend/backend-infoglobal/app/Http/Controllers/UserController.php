<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
       $users = User::all(); 
          
       // Return Json Response
       return response()->json([
            'results' => $users
       ],200);
    }
}