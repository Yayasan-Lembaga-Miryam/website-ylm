<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class AddGuestToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->hasCookie('guest_token')) {
            $token = Str::uuid()->toString();
            return $next($request)->withCookie(cookie(
                'guest_token',
                $token,
                525960, // 1 year
                '/',
                null,
                true,
                true,
                false,
                'Strict'
            ));
        }

        return $next($request);
    }
}
