<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
//
use Illuminate\Support\Facades\File;

class UserInfoController extends Controller
{
    public function uploadImg(Request $request)
    {
        if ($request->file) {
            $request->file->move(public_path('images'), $request->file->getClientOriginalName());
        }
        $user = Auth::user();
        $user->photo = $request->file->getClientOriginalName();


        if ($user->save()) {
            return response()->json([
                'success' => 'Img Uploaded',
                'data' => [
                    'avatar' => $user->photo
                ],
            ]);
        }
    }

    //
    // public function deleteImg()
    // {
    //     // dd($id);
    //     // dd($request->all());
    //     $user = Auth::user();
    //     dd($user);
    //     $imagePath = public_path('images/') . $user->photo;

    //     if (File::exists($imagePath)) {
    //         File::delete($imagePath);
    //         $user->photo = null;

    //         if ($user->save()) {
    //             return response()->json([
    //                 'success' => 'Img Deleted',
    //             ]);
    //         }
    //     }

    //     return response()->json([
    //         'error' => 'Img not found',
    //     ], 404);
    // }
}
