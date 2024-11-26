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
        $admins = User::where('roles', 'admin')->get(['id', 'name', 'email', 'status']);
        return response()->json($admins);
    }

    // Menambahkan admin baru
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $admin = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password), // Hash password
            'roles' => 'admin',
        ]);

        return response()->json($admin, 201);
    }

    // Memperbarui admin
    public function update(Request $request, $id)
    {
        $admin = User::findOrFail($id);

        $admin->update($request->only(['name', 'email']));

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
