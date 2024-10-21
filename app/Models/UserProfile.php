<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    protected $table = 'users';

    protected $fillable = [
        // 'name',
        // 'birth_date',
        // 'address',
        // 'profile_picture',
        // 'gender',
        // 'phone',
        'roles',
        'id',
    ];

    // public function user()
    // {
    //     return $this->belongsTo(User::class, 'users_id');
    // }
}
