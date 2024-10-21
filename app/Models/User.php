<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'roles',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // protected static function boot()
    // {
    //     parent::boot();

    //     // Event untuk membuat profil pengguna setelah pengguna berhasil didaftarkan
    //     static::created(function ($user) {
    //         // Periksa apakah pengguna sudah memiliki profil
    //         if (!$user->userProfile) {

    //             $userProfile = new UserProfile();

    //             // Atur nama profil dengan nama dari SubmissionMember
    //             // $userProfile->name = $submissionMember->name;

    //             // Hubungkan profil pengguna dengan pengguna yang baru didaftarkan
    //             $userProfile->users_id = $user->id;

    //             // Simpan profil pengguna
    //             $userProfile->save();
    //         }
    //     });
    // }

    // public function userProfile()
    // {
    //     return $this->hasOne(UserProfile::class, 'users_id');
    // }
    public function Product()
    {
        return $this->hasOne(Product::class, 'id_user');
    }
}
