<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'images.*' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Simpan produk
        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'id_user' => Auth::id(),
        ]);

        // Simpan gambar menggunakan Media Library
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                // Menyimpan gambar ke koleksi 'product_images'
                $product->addMedia($image)
                        ->usingFileName($image->getClientOriginalName()) // Menggunakan nama file asli
                        ->toMediaCollection('product_images');
            }
        }

        return response()->json(['success' => 'Product added successfully with images!']);
    }

    public function index()
    {
        $products = Product::all()->map(function ($product) {
            // Mengambil URL gambar dari koleksi 'product_images'
            $product->image_urls = $product->getMedia('product_images')->map->getUrl();
            return $product;
        });

        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::find($id);
        if ($product) {
            $product->image_urls = $product->getMedia('product_images')->map->getUrl();
            return response()->json($product);
        } else {
            return response()->json(['message' => 'Product not found'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'images.*' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Cari produk berdasarkan ID
        $product = Product::findOrFail($id);

        // Perbarui data produk
        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
        ]);

        // Perbarui gambar jika ada yang diunggah
        if ($request->hasFile('images')) {
            // Hapus gambar lama dari koleksi
            $product->clearMediaCollection('product_images');

            // Simpan gambar baru ke koleksi
            foreach ($request->file('images') as $image) {
                $product->addMedia($image)
                        ->usingFileName($image->getClientOriginalName()) // Menggunakan nama file asli
                        ->toMediaCollection('product_images');
            }
        }

        return response()->json(['success' => 'Product updated successfully!', 'product' => $product]);
    }
}
