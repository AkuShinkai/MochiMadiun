<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\SubmissionMember;
use App\Models\User;
use App\Models\UserApprentices;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email address or password is incorrect'
            ], 422);
        }

        // /** @var User $user */
        // $user = Auth::user();
        // $user->load('userProfile'); // Load user profile relationship

        // Membuat token berdasarkan peran user
        /** @var User $user */
        $user = Auth::user();
        // $user->load('userProfile'); // Load user profile relationship
        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user' => $user,
            'roles' => $user->roles, // Include roles in response
            'token' => $token
        ]);
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'email' => $data['email'],
            'name' => $data['name'],
            'password' => bcrypt($data['password']),
        ]);

        // Simpan data ke tabel user_profiles
        // $user->userProfile()->create([
        //     'name' => $data['name'],
        //     // tambahkan field lain yang diperlukan
        // ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(
            compact('user', 'token')
        );
    }


    public function logout(Request $request)
    {
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
