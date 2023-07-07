<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Blog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request)
    {
        // dd($request->all());
        $user = Auth::user();

        $blogs = Blog::where('user_id', $user->id)->with('images')->get();

        return response()->json([
            'data' => $blogs,
            'message' => 'Blogs retrieved successfully',
        ], 200);
        // return response()->json([
        //     $blogs,
        // ], 200);
    }

    // public function show($id)

    // }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'description' => 'required',

        ]);

        $validatedData['user_id'] = Auth::id();

        try {
            $blog = Blog::create($validatedData);
            if ($blog) {
                return response()->json([
                    'data' => $blog,
                    // 'message' => 'Blog created successfully', //
                ], 201);
            } else {
                return response()->json([
                    'message' => 'Failed to create blog',
                ], 500);
            }
        } catch (QueryException $err) {
            return response()->json([
                'message' => 'Failed to create blog',
                'error' => $err->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // old logic
        // $blog = Blog::findOrFail($id);

        // new logic
        $user = Auth::user();
        $blogs = Blog::where('user_id', $user->id)->with('images')->get();

        return response()->json([
            'data' => $blogs,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'imgs' => 'required',
        ]);

        $blog = Blog::findOrFail($id);
        $blog->update($validatedData);

        return response()->json([
            'data' => $blog,
            'message' => 'Blog updated successfully',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);
        $blog->delete();

        return response()->json([
            'message' => 'Blog deleted successfully',
        ]);
    }
    // public function destroy($id)
    // {
    //     $user = Auth::user();
    //     $blog = Blog::findOrFail($id);

    //     $imagePath = public_path('images') . $user->image; 
    //     if (file_exists($imagePath)) {
    //         unlink($imagePath);
    //     }

    //     $blog->delete();

    //     return response()->json([
    //         'message' => 'Blog deleted successfully',
    //     ]);
    // }
}