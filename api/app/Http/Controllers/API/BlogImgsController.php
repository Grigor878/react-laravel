<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogImgsController extends Controller
{
    public function uploadBlogImgs(Request $request)
    {
        // $data = $request->all();
        if ($request->file) {
            $request->file->move(public_path('images'), $request->file->getClientOriginalName());
        }
        $user = Auth::user();
        dd($user);
        // dd($request->file);
        $user->photo = $request->file->getClientOriginalName();

        if ($user->save()) {
            return response()->json([
                'message' => 'Imgs Uploaded',
                'data' => [
                    'img' => $user->photo
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