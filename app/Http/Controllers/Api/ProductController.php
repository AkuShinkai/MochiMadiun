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
                // Menyimpan gambar dengan nama asli ke media collection
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

        // Find the product by ID
        $product = Product::findOrFail($id);

        // Update product properties
        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;

        // Handle photo update if a new file is uploaded
        if ($request->hasFile('images')) {
            $product->clearMediaCollection('product_images'); // Hapus gambar lama jika perlu
            foreach ($request->file('images') as $image) {
                $product->addMedia($image)
                    ->usingFileName($image->getClientOriginalName()) // Menggunakan nama file asli
                    ->toMediaCollection('product_images');
            }
        }

        // Save the updated product
        $product->save();

        return response()->json(['success' => 'Product updated successfully!', 'product' => $product]);
    }
}
