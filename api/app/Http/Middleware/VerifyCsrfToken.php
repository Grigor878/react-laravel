<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        'http://react-laravel.loc/api/register',
        'http://react-laravel.loc/api/login',
        'http://react-laravel.loc/api/uploadImg',
        'http://react-laravel.loc/api/deleteImg',
        'http://react-laravel.loc/api/logout',
        'http://react-laravel.loc/api/blog',
        'http://react-laravel.loc/api/blog/*',
        'http://react-laravel.loc/api/uploadBlogImgs',
        'http://react-laravel.loc/api/blogSearch',
    ];
}
