<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\BlogImage;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        // 'imgs'
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'user_id');
    }

    public function images()
    {
        return $this->hasOne(BlogImage::class); //hasMany
    }

    // public function user()
    // {
    //     return $this->belongsTo(User::class, 'user_id');
    // }
}