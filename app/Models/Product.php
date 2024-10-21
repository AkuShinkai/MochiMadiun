<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'status',
        'price',
        'id_user',
        'image'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    // public function images()
    // {
    //     return $this->hasMany(Image::class);
    // }
}
