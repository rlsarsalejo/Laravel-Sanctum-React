<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ApiAuthentication extends Controller
{
    /**
     * Handle user login and return an authentication token.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function Login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Attempt to authenticate the user
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login credentials',
            ], 401);
        }

        $user = $request->user();
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
        ], 200);
    }

    /**
     * Handle user logout by deleting the current access token.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request)
    {
         // Get the current access token
         $accessToken = $request->bearerToken();

         if ($accessToken) {
             // Find and delete the token from the database
             $token = PersonalAccessToken::findToken($accessToken);
             if ($token) {
                 $token->delete();
             }
         }
 
       
 
         return response()->json([
             'message' => 'Logout successful',
         ], 200);
    }
}
