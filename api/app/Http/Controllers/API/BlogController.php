<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Blog;
use App\Models\BlogImage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    // custom get without pagination
    // public function index(Request $request)
    // {
    //     // dd($request->all());
    //     $user = Auth::user();

    //     $blogs = Blog::where('user_id', $user->id)->with('images')->get();

    //     return response()->json([
    //         'data' => $blogs,
    //         'message' => 'Blogs retrieved successfully',
    //     ], 200);
    //     // return response()->json([
    //     //     $blogs,
    //     // ], 200);
    // }

    // with pagination
    public function index()
    {
        $user = Auth::user();

        $blogs = Blog::where('user_id', $user->id)->with('images')->paginate(4);

        return response()->json([
            'data' => $blogs,
            'message' => 'Blogs retrieved successfully',
        ], 200);
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
            'title' => 'required|string',
            'description' => 'required|string',

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
    // public function show($id)
    // {
    //     // old logic
    //     // $blog = Blog::findOrFail($id);

    //     // new logic
    //     $user = Auth::user();
    //     $blogs = Blog::where('user_id', $user->id)->with('images')->get();

    //     return response()->json([
    //         'data' => $blogs,
    //     ]);
    // }

    public function show($id)
    {
        $user = Auth::user();
        $blogs = Blog::where('user_id', $user->id)
            ->where('id', $id)
            ->with('images')
            ->get();

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
        ]);

        $blog = Blog::findOrFail($id);
        $blog->update($validatedData);

        return response()->json([
            // 'data' => $blog,
            'status' => true,
            'message' => 'Blog updated successfully',
        ], 200);
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
        $blogImgData = BlogImage::findOrFail($id);

        $blogImgNames = json_decode($blogImgData->name, true);

        foreach ($blogImgNames as $blogImgName) {
            $imagePath = public_path('images/') . $blogImgName;

            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }

        $blog->delete();
        $blogImgData->delete();

        return response()->json([
            'status' => true,
            'message' => 'Blog deleted successfully'
        ], 200);
    }
}
