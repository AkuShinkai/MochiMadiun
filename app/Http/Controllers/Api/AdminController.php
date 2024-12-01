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
    // Menambahkan admin baru
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'roles' => 'required|in:admin,super admin', // Validasi roles
        ]);

        $admin = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'roles' => $request->roles, // Mengambil roles dari request
        ]);

        return response()->json($admin, 201);
    }

    // Memperbarui admin
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'roles' => 'sometimes|required|in:admin,super admin', // Validasi roles jika ada perubahan
        ]);

        $admin = User::findOrFail($id);

        // Hanya update kolom yang ada di request
        $admin->update($request->only(['name', 'email', 'roles']));

        // Hash password jika ada
        if ($request->has('password') && $request->password) {
            $admin->update(['password' => bcrypt($request->password)]);
        }

        return response()->json($admin);
    }


    // Menghapus admin
    public function destroy($id)
    {
        $admin = User::findOrFail($id);
        $admin->delete();

        return response()->json(null, 204);
    }
}
