<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Blog;

class BlogImage extends Model
{
    use HasFactory;

    protected $collection = 'blog_images';
    protected $fillable = [
        'blog_id',
        'name'
    ];

    public function blog() {
        return $this->belongsTo(Blog::class);
    }
}
