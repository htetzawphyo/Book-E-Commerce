<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        $user->save();
        $token = $user->createToken('admin');
        return response()->json([
            'status' => 200,
            'message' => 'Successfully registered',
            'token' => $token->plainTextToken
        ]);
    }

    public function login(Request $request) {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            $token = $user->createToken('admin');
            return response()->json([
                'status' => 200,
                'message' => 'Successfully login',
                'token' => $token->plainTextToken
            ]);
        }
    }

    public function profile(Request $request) {
        return 'success';
    } 
}
