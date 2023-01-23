<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Helper\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Resources\Auth\UserAuthResource;

class AuthController extends Controller
{
    public function users(Request $request) {
        $query = User::with('role');

        if($request->search) {
            $query->where('name', 'like', '%'. $request->search .'%');
        }

        $users = $query->paginate(10);

        return UserAuthResource::collection($users)->additional(['message' => 'success']);
    }

    public function register(UserRegisterRequest $request){
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role_id = 2;
        $user->save();

        $token = $user->createToken('register-token')->plainTextToken;
        return response()->json([
            'status' => 200,
            'role_id' => $user->role_id,
            'message' => 'Successfully registered',
            'token' => $token
        ]);
    }

    public function login(LoginRequest $request) {        
        $validated = $request->validated();
        
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            $token = $user->createToken('login-token')->plainTextToken;
            return response()->json([
                'status' => 200,
                'role_id' => $user->role_id,
                'message' => 'Successfully login',
                'token' => $token,
            ]);
        }
        
        if($validated->fails()){
            return ResponseHelper::fail($request->errors());
        }
    }

    public function profile(Request $request) {
        $user = Auth::user();
        return ResponseHelper::success(new UserAuthResource($user));
    } 

    public function logout(Request $request) {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged out',
        ];
    }
}
