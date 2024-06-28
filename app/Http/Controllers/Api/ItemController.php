<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ItemController extends Controller
{
    /**
     * Store a newly created item in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'stock' => 'required|integer',
            'photo' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048', // Ganti validator sesuai kebutuhan
            'price' => 'required|numeric',
            'category' => 'required|string'
        ]);

        // Simpan gambar ke dalam basis data sebagai BLOB
        $photoContents = file_get_contents($request->file('photo'));

        $item = new Item();
        $item->name = $request->name;
        $item->description = $request->description;
        $item->stock = $request->stock;
        $item->photo = $photoContents;
        $item->price = $request->price;
        $item->category = $request->category;
        $item->save();

        return response()->json(['success' => 'Item added successfully!']);
    }


    private function encodePhoto($item)
    {
        if ($item->photo) {
            $item->photo = base64_encode($item->photo);
        }
        return $item;
    }

    public function index()
    {
        $items = Item::all();
        $items->map(function ($item) {
            return $this->encodePhoto($item);
        });
        return response()->json($items);
    }

    public function show($id)
    {
        $item = Item::find($id);
        return $this->encodePhoto($item);
        if ($item) {
            return response()->json($item);
        } else {
            return response()->json(['message' => 'Item not found'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'stock' => 'required|integer',
            'photo' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'price' => 'required|numeric',
            'category' => 'required|string'
        ]);

        // Find the item by ID
        $item = Item::where('id', $id);

        if (!$item) {
            return response()->json(['error' => 'Item not found'], 404);
        }

        // Update item properties
        $item->name = $request->name;
        $item->description = $request->description;
        $item->stock = $request->stock;
        $item->price = $request->price;
        $item->category = $request->category;

        // Handle photo update if a new file is uploaded
        if ($request->hasFile('photo')) {
            $photoContents = file_get_contents($request->file('photo')->getRealPath());
            $base64Proof = base64_encode($photoContents);
            $item->photo = $base64Proof;
        }

        // Save the updated item
        $item->save();

        // Return response with success message and encoded photo if needed
        return response()->json(['success' => 'Item updated successfully!', 'item' => $this->encodePhoto($item)]);
    }
}
