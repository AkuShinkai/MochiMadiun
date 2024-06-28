<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    protected $table = 'purchases';

    protected $fillable = [
        'id',
        'quantity',
        'status',
        'items_id',
        'user_profiles_id',
        'promos_id',
        'proof',
        'payment'
    ];
}
