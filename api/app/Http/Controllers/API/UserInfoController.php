<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UserInfoController extends Controller
{
    public function uploadImg(Request $request)
    {
        if($request->file){
            $request->file->move(public_path('images'), $request->file->getClientOriginalName());
        }
        $user = Auth::user();
        // dd($request->file);
        $user->photo = $request->file->getClientOriginalName();

        
        if($user->save()){
            return response()->json([
                'success' => 'Img Uploaded',
                'data' => [
                    'avatar' => $user->photo
                ],
            ]);
        }
    }
}
