<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogSearchController extends Controller
{
    public function blogSearch(Request $request)
    {
        // dd($request->all());
        $key = $request->search;
        // dd($key);

        $blogs = Blog::query()
            ->where('title', 'like', "%{$key}%")
            ->orWhere('description', 'like', "%{$key}%")
            ->with('images')
            ->get();

        // dd($blogs);
        return response()->json(['data' => $blogs]);
    }
}
