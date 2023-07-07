<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BlogImage;
use Facade\Ignition\DumpRecorder\Dump;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogImgsController extends Controller
{
    public function uploadBlogImgs(Request $request)
    {
        $datas = $request->all();
        $photoName = [];
        $blogId = $datas['blog_id'];
        
        foreach ($datas as $key => $data) {
            if ($key != 'blog_id') {
                $fileName = round(microtime(true) * 1000) . '.' . $data->extension();
                $data->move(public_path('images'), $fileName);

                $photoName[] = $fileName;
            }
        }

        $blogImg = new BlogImage();
        $blogImg->name = json_encode($photoName);
        $blogImg->blog_id = $blogId;
        $blogImg->save();

        //
        if ($blogImg->save()) {
            return response()->json([
                'message' => 'Blog created successfully', //
            ], 201);
        }
    }
}