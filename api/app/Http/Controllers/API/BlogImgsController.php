<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Facade\Ignition\DumpRecorder\Dump;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogImgsController extends Controller
{
    public function uploadBlogImgs(Request $request)
    {
        $data = $request->all();
        dD($data);

        $file = $request->file('file');
        dd($file);

        if($request->hasFile('file'))
        {
            // foreach ($files as $file) {
            // }
        }

        dd('end');



        dump($data);
        dd($request->file('files'));
        if ($request->file) {
            $request->file->move(public_path('images'), $request->file->getClientOriginalName());
        }

        dd($request->file);



        // $blog = Blog::imgs();
        dd($blog);
        // dd($request->file);
        $blog->imgs = $request->file->getClientOriginalName();

        if ($blog->save()) {
            return response()->json([
                'message' => 'Imgs Uploaded',
                'data' => [
                    'img' => $blog->photo
                ],
            ]);
        }
    }
}


// public function uploadBlogImgs(Request $request, $user_id)
//     {
//         if ($request->file) {
//             $request->file->move(public_path('images'), $request->file->getClientOriginalName());
//         }

//         $blog = Blog::where('user_id', $user_id)->first();

//         if ($blog) {
//             $blog->imgs = $request->file->getClientOriginalName();

//             if ($blog->save()) {
//                 return response()->json([
//                     'message' => 'Images Uploaded',
//                     'data' => [
//                         'img' => $blog->imgs
//                     ],
//                 ]);
//             }
//         }

//         return response()->json([
//             'message' => 'Blog not found.',
//         ], 404);
//     }