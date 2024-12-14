<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contents;
use Illuminate\Http\Request;

class ContentController extends Controller
{
    // Menampilkan content yang ada (hanya 1 item)
    public function index()
    {
        $content = Contents::first(); // Mengambil konten pertama (karena hanya ada 1 konten)
        return response()->json($content); // Mengembalikan konten dalam format JSON
    }

    // Menyimpan atau mengupdate content
    public function store(Request $request)
    {
        $request->validate([
            'ig_links' => 'nullable|string',
            'fb_links' => 'nullable|string',
            'twitter_links' => 'nullable|string',
            'tiktok_links' => 'nullable|string',
            'headers' => 'nullable|string',
            'header_decs' => 'nullable|string',
            'abouts' => 'nullable|string',
            'about_decs' => 'nullable|string',
            'phones' => 'nullable|string',
            'emails' => 'nullable|email',
            'alamat' => 'nullable|email',
        ]);

        $content = Contents::first(); // Cek apakah sudah ada konten

        if ($content) {
            // Jika konten sudah ada, update
            $content->update($request->all());
        } else {
            // Jika belum ada, buat konten baru
            $content = Contents::create($request->all());
        }

        return response()->json($content, 201); // Mengembalikan hasil dalam format JSON
    }

    // Mengupdate konten (nilai kolom tertentu)
    public function update(Request $request, $column)
    {
        $request->validate([
            $column => 'nullable|string', // Validasi berdasarkan kolom yang diterima
        ]);

        $content = Contents::first(); // Mengambil konten pertama (karena hanya ada 1 konten)
        if (!$content) {
            return response()->json(['message' => 'Content not found'], 404);
        }

        // Update nilai kolom yang dipilih
        $content->$column = $request->input($column); // Menentukan kolom yang diupdate
        $content->save();

        return response()->json($content); // Mengembalikan konten yang telah diperbarui
    }

    // Menghapus kolom tertentu (misalnya menghapus nilai di kolom phones atau headers)
    public function deleteColumn(Request $request)
    {
        $content = Contents::first(); // Mengambil konten pertama

        if (!$content) {
            return response()->json(['message' => 'Content not found'], 404);
        }

        $column = $request->input('column');
        if (in_array($column, ['ig_links', 'fb_links', 'twitter_links', 'tiktok_links','headers', 'header_decs', 'abouts', 'about_decs', 'phones', 'emails', 'alamat'])) {
            // Set kolom yang dipilih menjadi null (menghapus nilainya)
            $content->$column = null;
            $content->save();
            return response()->json(['message' => ucfirst($column) . ' deleted successfully']);
        }

        return response()->json(['message' => 'Invalid column name'], 400);
    }
}
