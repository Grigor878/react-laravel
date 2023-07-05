<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Create User
     * @param Request $request
     * @return User 
     */
    public function createUser(Request $request)
    {
        try {
            //Validated
            $validateUser = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'email' => 'required|email|unique:users,email',
                    'password' => 'required'
                ]
            );

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            return response()->json([
                'status' => true,
                'message' => 'User Created Successfully',
                'remember_token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Login The User
     * @param Request $request
     * @return User
     */
    public function login(Request $request)
    {
        try {
            $validateUser = Validator::make(
                $request->all(),
                [
                    'email' => 'required|email',
                    'password' => 'required'
                ]
            );

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $credentials = $request->only(['email', 'password']);
            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $accessToken = $user->createToken('API TOKEN')->plainTextToken;
                return response()->json([
                    'status' => true,
                    'data' => [
                        'user' => Auth::user(),
                        'access_token' => $accessToken,
                        'message' => 'User Logged In Successfully',
                    ]

                ], 200);
            }

            return response()->json([
                'status' => false,
                'message' => 'Email & Password does not match with our record.',
            ], 401);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    // public function logout(Request $request)
    // {
    //     dd($request->user()->currentAccessToken());
    //     $request->user()->currentAccessToken()->delete();
    //     return response(['message' => 'Successfully Logging out']);
    // }

    // public function logout(Request $request)
    // {
    //     // $accessToken = auth()->user()->token();
    //     $accessToken = $request->user()->currentAccessToken()->delete();
    //     $token = $request->user()->tokens->find($accessToken);
    //     $token->revoke();

    //     return response([
    //         'message' => 'You have been successfully logged out.',
    //     ], 200);
    // }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response([
            'message' => 'You have been successfully logged out.',
        ], 200);
    }
}
