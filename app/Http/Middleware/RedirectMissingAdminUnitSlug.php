<?php

namespace App\Http\Middleware;

use App\Models\Unit;
use Closure;
use Illuminate\Http\Request;

class RedirectMissingAdminUnitSlug
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if (!$request->route('unit')) {
            $path = $request->path();
            $baseRoute = preg_replace('/^admin\/unit\/([^\/]+)(?:\/.*)?$/', '$1', $path);

            $adminUnitSlug = auth()->user()->getAdminUnit();

            // If user is admin unit and has a valid unit slug, redirect to their unit
            if (auth()->user()->isAdminUnit() && !empty($adminUnitSlug)) {
                return redirect()->route("admin.unit.{$baseRoute}", ['unit' => $adminUnitSlug]);
            }

            // Fallback to first unit if admin unit is not set or empty
            $firstUnit = Unit::first();
            if (!$firstUnit) {
                return redirect()->route('dashboard'); // or your fallback route
            }

            return redirect()->route("admin.unit.{$baseRoute}", ['unit' => $firstUnit->slug]);
        }

        return $next($request);
    }
}
