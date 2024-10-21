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
            'images.*' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validasi multiple images
        ]);

        // Simpan produk terlebih dahulu
        $product = new Product();
        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->id_user = Auth::id(); // Mengisi id_user

        // Simpan gambar
        if ($request->hasFile('images')) {
            $imagePaths = []; // Array untuk menyimpan path gambar
            foreach ($request->file('images') as $image) {
                $path = $image->store('product_images', 'public'); // Simpan di storage
                $imagePaths[] = $path; // Tambahkan path ke array
            }
            $product->image = json_encode($imagePaths); // Encode array ke JSON
        }

        $product->save(); // Simpan produk

        return response()->json(['success' => 'Product added successfully with images!']);
    }

    public function index()
    {
        $products = Product::all();
        $products->map(function ($product) {
            // Hanya decode jika perlu
            $product->image = json_decode($product->image); // Decode JSON ke array
            return $product; // Kembalikan objek produk
        });
        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::find($id);
        if ($product) {
            $product->image = json_decode($product->image); // Decode JSON ke array
            return response()->json($product);
        } else {
            return response()->json(['message' => 'product not found'], 404);
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
            $imagePaths = []; // Array untuk menyimpan path gambar
            foreach ($request->file('images') as $image) {
                $path = $image->store('product_images', 'public'); // Simpan di storage
                $imagePaths[] = $path; // Tambahkan path ke array
            }
            $product->image = json_encode($imagePaths); // Encode array ke JSON
        }

        // Save the updated product
        $product->save();

        return response()->json(['success' => 'Product updated successfully!', 'product' => $product]);
    }
}
