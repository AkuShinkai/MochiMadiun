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
            // Ensure that image URLs are returned as an array
            $product->image_urls = $product->getMedia('product_images')->map->getUrl()->toArray();
            return response()->json($product);
        } else {
            return response()->json(['message' => 'Product not found'], 404);
        }
    }


    public function update(Request $request, $id)
    {
        // Temukan produk berdasarkan ID
        $product = Product::findOrFail($id);

        // Validasi input dari request (jika diperlukan)
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'images.*' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Mengupdate produk dengan data yang diterima dari request
        $product->update($request->all());

        // Jika ada gambar baru yang di-upload
        if ($request->hasFile('images')) {
            // Hapus gambar lama sebelum menambahkan yang baru
            $product->clearMediaCollection('product_images');

            // Menambahkan gambar baru ke koleksi 'product_images'
            foreach ($request->file('images') as $image) {
                $product->addMedia($image)
                    ->usingFileName($image->getClientOriginalName())
                    ->toMediaCollection('product_images');
            }
        }

        // Mengembalikan respons JSON dengan data produk yang diperbarui
        return response()->json(['product' => $product]);
    }

    public function destroy($id)
    {
        // Temukan produk berdasarkan ID
        $product = Product::find($id);

        // Jika produk tidak ditemukan, kembalikan respons error
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Cek apakah produk sedang digunakan dalam promo apa pun
        $isUsedInPromo = \App\Models\Promo::where('id_product', $id)->exists();

        if ($isUsedInPromo) {
            return response()->json([
                'message' => 'Product is currently used in a promo. Please remove the promo before deleting the product.'
            ], 400);
        }

        // Hapus semua gambar dari koleksi 'product_images'
        $product->clearMediaCollection('product_images');

        // Hapus produk dari database
        $product->delete();

        // Kembalikan respons sukses
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
