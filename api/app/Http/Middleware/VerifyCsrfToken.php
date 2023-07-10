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
        'http://blog-api.loc/api/register',
        'http://blog-api.loc/api/login',
        'http://blog-api.loc/api/uploadImg',
        'http://blog-api.loc/api/deleteImg',
        'http://blog-api.loc/api/logout',
        'http://blog-api.loc/api/blog',
        'http://blog-api.loc/api/blog/*',
        // 'http://blog-api.loc/api/blog/{blog}',
        'http://blog-api.loc/api/uploadBlogImgs',
    ];
}