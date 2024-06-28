<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Purchase;
use App\Models\UserProfile;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'items_id' => 'required|exists:items,id',
            'quantity' => 'required|integer|min:1',
            'status' => 'required|in:pending,process,success,declined',
            'payment' => 'required|in:shopepay,bri,bca',
            'proof' => 'required|file|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validasi untuk proof
        ]);

        // Mendapatkan pengguna yang sedang login
        $user = Auth::user();
        // Mendapatkan profil pengguna
        $userProfile = UserProfile::where('users_id', $user->id)->first();

        if (!$userProfile) {
            return response()->json(['error' => 'User profile not found'], 404);
        }

        // Mengatur ID purchase berdasarkan kategori item
        $item = Item::find($request->items_id);
        $prefix = '';
        switch ($item->category) {
            case 'accessories':
                $prefix = 'AC';
                break;
            case 'gadget':
                $prefix = 'GG';
                break;
            case 'laptop':
                $prefix = 'LT';
                break;
            case 'electronic':
                $prefix = 'ET';
                break;
        }
        $latestPurchase = Purchase::where('id', 'like', "$prefix%")->orderBy('id', 'desc')->first();
        $newIdNumber = $latestPurchase ? intval(substr($latestPurchase->id, 2)) + 1 : 1;
        $purchaseId = $prefix . str_pad($newIdNumber, 6, '0', STR_PAD_LEFT);

        // Simpan file gambar ke dalam kolom 'proof' yang merupakan BLOB di database
        $proofContent = file_get_contents($request->file('proof'));

        // Encode binary data to base64
        $base64Proof = base64_encode($proofContent);

        $purchase = new Purchase();
        $purchase->id = $purchaseId;
        $purchase->items_id = $request->items_id;
        $purchase->quantity = $request->quantity;
        $purchase->proof = $base64Proof; // Simpan base64-encoded binary data ke dalam database
        $purchase->status = $request->status;
        $purchase->payment = $request->payment;
        $purchase->user_profiles_id = $userProfile->id;
        $purchase->save();

        return response()->json($purchase, 201);
    }
}
