<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use Inertia\Response;

class UnitController extends Controller
{
    public function index(): Response
    {
        $units = Unit::select('id', 'nama', 'slug', 'alamat_singkat', 'thumbnail_path')->get()->toArray();

        $props = [
            'units' => $units,
        ];

        //TODO: return inertia
        dd($props);
    }

    public function show(Unit $unit): Response
    {
        $props = [
            'unit' => $unit->toArray(),
        ];

        //TODO: return inertia
        dd($props);
    }
}
