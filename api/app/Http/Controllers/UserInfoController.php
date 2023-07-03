<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserInfoController extends Controller
{
    public function uploadImg(Request $request)
    {
        $data = $request->all();
        if($request->file){
            $request->file->move(public_path('images'), $request->file->getClientOriginalName());
        }
        dd($data, Auth::user());
    }
}
