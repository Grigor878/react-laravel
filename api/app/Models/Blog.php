<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'user_id',
        'title',
        'description',
        'imgs'
    ];

    public function user()
    {
        return $this->hasOne(Blog::class);
    }

    // public function user()
    // {
    //     return $this->belongsTo(User::class, 'user_id');
    // }
}
