<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\V1\DeveloperController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Developer;

class AuthController extends Controller
{
    /**
     * Register a new user and return a token.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $token = $request->user()->createToken('authToken')->plainTextToken;
            $developer = Developer::where('email', $credentials['email'])->first();
            return response()->json(['token' => $token, 'developer' => $developer]);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:developers',
            'password' => 'required|string|min:8',
            'role' => 'required|string',
            'city' => 'required|string',
            'phone' => 'required|string',
            'isExtern' => 'required|boolean',
            'company' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        
       // Create the developer
       $developer = new Developer([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password),
        'role' => $request->role,
        'city' => $request->city,
        'phone' => $request->phone,
        'is_extern' => $request->isExtern,
        'company' => $request->company,
        ]);
        $developer->save();

        $token = $developer->createToken('authToken')->plainTextToken;

        return response()->json(['token' => $token, 'developer' => $developer], 201);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
}