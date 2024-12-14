<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contents extends Model
{
    use HasFactory;

    protected $fillable = [
        'ig_links',
        'fb_links',
        'twitter_links',
        'tiktok_links',
        'headers',
        'header_decs',
        'abouts',
        'about_decs',
        'phones',
        'emails',
        'alamat'
    ];
}
