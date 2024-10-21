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
            // 'stock' => 'required|integer',
            'image' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048', // Ganti validator sesuai kebutuhan
            'price' => 'required|numeric',
            // 'category' => 'required|string'
        ]);

        // Simpan gambar ke dalam basis data sebagai BLOB
        $photoContents = file_get_contents($request->file('image'));

        $product = new Product();
        $product->name = $request->name;
        $product->description = $request->description;
        $product->image = $photoContents;
        $product->price = $request->price;
        $product->id_user = Auth::id(); // Mengisi id_user

        $product->save();

        return response()->json(['success' => 'product added successfully!']);
    }


    private function encodePhoto($product)
    {
        if ($product->image) {
            $product->image = base64_encode($product->image);
        }
        return $product;
    }

    public function index()
    {
        $products = Product::all();
        $products->map(function ($product) {
            return $this->encodePhoto($product);
        });
        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::find($id);
        return $this->encodePhoto($product);
        if ($product) {
            return response()->json($product);
        } else {
            return response()->json(['message' => 'product not found'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'price' => 'required|numeric',
        ]);

        // Find the product by ID
        $product = Product::where('id', $id);

        if (!$product) {
            return response()->json(['error' => 'product not found'], 404);
        }

        // Update product properties
        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;

        // Handle photo update if a new file is uploaded
        if ($request->hasFile('image')) {
            $photoContents = file_get_contents($request->file('image')->getRealPath());
            $base64Proof = base64_encode($photoContents);
            $product->image = $base64Proof;
        }

        // Save the updated product
        $product->save();

        // Return response with success message and encoded photo if needed
        return response()->json(['success' => 'product updated successfully!', 'product' => $this->encodePhoto($product)]);
    }
}
