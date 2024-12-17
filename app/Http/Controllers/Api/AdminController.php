<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    // Menampilkan daftar admin
    public function index()
    {
        $admins = User::get(['id', 'name', 'email', 'status', 'roles']);
        return response()->json($admins);
    }

    // Menambahkan admin baru
    public function store(Request $request)
    {
        // Periksa apakah pengguna yang login adalah "super admin"
        if (auth()->user()->roles !== 'super admin') {
            return response()->json([
                'message' => 'Anda tidak memiliki izin untuk menambahkan user.'
            ], 403);
        }

        // Validasi input
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'status' => 'required|in:active,nonactive',
            'roles' => 'required|in:admin,super admin', // Validasi roles
        ]);

        // Buat user baru
        $admin = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'status' => $request->status,
            'roles' => $request->roles, // Mengambil roles dari request
        ]);

        return response()->json($admin, 201);
    }

    // Memperbarui admin
    public function update(Request $request, $id)
    {
        // Periksa apakah pengguna yang login adalah "super admin"
        if (auth()->user()->roles !== 'super admin') {
            return response()->json([
                'message' => 'Anda tidak memiliki izin untuk memperbarui data user.'
            ], 403);
        }

        // Validasi input
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'status' => 'required|in:active,nonactive',
            'roles' => 'sometimes|required|in:admin,super admin',
        ]);

        // Temukan user berdasarkan ID
        $admin = User::findOrFail($id);

        // Update kolom yang ada di request
        $admin->update($request->only(['name', 'email', 'roles', 'status']));

        // Jika ada password baru
        if ($request->has('password') && $request->password) {
            $admin->update(['password' => bcrypt($request->password)]);
        }

        return response()->json($admin);
    }

    // Menampilkan data pengguna yang sedang login
    public function showAuthenticatedUser()
    {
        $user = auth()->user();
        return response()->json($user);
    }

    // Menghapus admin
    public function destroy($id)
    {
        // Periksa apakah pengguna yang login adalah "super admin"
        if (auth()->user()->roles !== 'super admin') {
            return response()->json([
                'message' => 'Anda tidak memiliki izin untuk menghapus user.'
            ], 403);
        }

        // Temukan user berdasarkan ID dan hapus
        $admin = User::findOrFail($id);
        $admin->delete();

        return response()->json([
            'message' => 'User berhasil dihapus.'
        ], 204);
    }
}
