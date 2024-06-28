<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();
        $profile = UserProfile::where('users_id', $user->id)->first();

        // Mendapatkan email dari user menggunakan Auth::user()
        $email = Auth::user()->email;

        // Menambahkan email ke dalam data profil
        $profile->email = $email;

        return response()->json($profile);
    }

    public function update(Request $request)
    {
        $user = $request->user();
        $profile = UserProfile::where('users_id', $user->id)->first();

        // Validasi data yang diterima dari request
        $request->validate([
            'phone' => 'nullable|string|max:20',
            // Tambahkan validasi untuk field lainnya sesuai kebutuhan
        ]);

        // Perbarui data profil
        $profile->update($request->all());

        return response()->json($profile);
    }
}
