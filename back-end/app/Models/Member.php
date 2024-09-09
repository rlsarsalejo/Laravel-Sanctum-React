<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
class Member extends Model
{
    use HasApiTokens,HasFactory;

    protected $fillable = [
        'name',
        'email',
        'address',
        'phoneNumber',
        'role',
        'password',
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($member) {
            $member->password = Hash::make($member->password);
        });
    }
}
