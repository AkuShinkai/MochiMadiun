<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Promo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PromoController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name_promo' => 'required|string|max:255',
            'description_promo' => 'nullable|string',
            'start_promo' => 'required|date',
            'end_promo' => 'required|date',
            'status' => 'required|in:available,not available',
            'discount' => 'required|numeric',
            'id_product' => 'required|exists:products,id', // ID produk yang valid
            'image_promo' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Simpan promo
        $promo = Promo::create([
            'name_promo' => $request->name_promo,
            'description_promo' => $request->description_promo,
            'start_promo' => $request->start_promo,
            'end_promo' => $request->end_promo,
            'status' => $request->status,
            'discount' => $request->discount,
            'id_user' => Auth::id(),
            'id_product' => $request->id_product,
        ]);

        // Simpan gambar promo menggunakan Media Library
        if ($request->hasFile('image_promo')) {
            $image = $request->file('image_promo');
            // Menyimpan gambar ke koleksi 'promo_images'
            $promo->addMedia($image)
                ->usingFileName($image->getClientOriginalName()) // Menggunakan nama file asli
                ->toMediaCollection('promo_images');
        }

        return response()->json(['success' => 'Promo added successfully with image!']);
    }

    public function index()
    {
        // Mengambil semua promo dan produk terkait (eager loading)
        $promos = Promo::with('product')->get()->map(function ($promo) {
            // Menambahkan URL gambar dari koleksi 'promo_images'
            $promo->image_urls = $promo->getMedia('promo_images')->map->getUrl();

            // Menyertakan nama produk dan harga produk sebelum diskon
            $promo->product_name = $promo->product ? $promo->product->name : 'N/A';
            $promo->price_before_discount = $promo->product ? $promo->product->price : 0;

            return $promo;
        });

        return response()->json($promos);
    }


    public function show($id)
    {
        $promo = Promo::find($id);
        if ($promo) {
            $promo->image_urls = $promo->getMedia('promo_images')->map->getUrl();
            return response()->json($promo);
        } else {
            return response()->json(['message' => 'Promo not found'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        // Temukan promo berdasarkan ID
        $promo = Promo::findOrFail($id);
        // Validasi input
        $validated = $request->validate([
            'name_promo' => 'required|string|max:255',
            'description_promo' => 'nullable|string',
            'start_promo' => 'required|date',
            'status' => 'required|in:available,not available',
            'end_promo' => 'required|date',
            'discount' => 'required|numeric',
            'id_product' => 'required|exists:products,id', // ID produk yang valid
            'images.*' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:2048', // Untuk multiple images
        ]);

        // Perbarui data promo
        $promo->update($request->all());

        // Jika ada gambar baru yang diunggah
        if ($request->hasFile('images')) {
            // Hapus semua gambar lama
            $promo->clearMediaCollection('promo_images');

            // Tambahkan gambar baru ke koleksi
            foreach ($request->file('images') as $image) {
                $promo->addMedia($image)
                    ->usingFileName($image->getClientOriginalName()) // Gunakan nama file asli
                    ->toMediaCollection('promo_images');
            }
        }

        return response()->json(['success' => 'Promo updated successfully!', 'promo' => $promo]);
    }

    public function destroy($id)
    {
        $promo = Promo::findOrFail($id);

        // Hapus media yang terkait dengan promo
        $promo->clearMediaCollection('promo_images');

        // Hapus promo dari database
        $promo->delete();

        return response()->json(['success' => 'Promo deleted successfully!']);
    }
}
