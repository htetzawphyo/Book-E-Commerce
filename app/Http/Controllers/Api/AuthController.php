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

        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);
        $user = new User();
        $user->name = $fields['name'];
        $user->email = $fields['email'];
        $user->password = Hash::make($fields['password']);
        $user->save();

        $token = $user->createToken('authtoken')->plainTextToken;
        return response()->json([
            'status' => 200,
            'message' => 'Successfully registered',
            'token' => $token
        ]);
    }

    public function login(Request $request) {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            $token = $user->createToken('authtoken');
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

    public function logout(Request $request) {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged out',
        ];
    }
}
