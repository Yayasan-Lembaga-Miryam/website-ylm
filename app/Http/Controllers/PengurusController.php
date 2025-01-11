<?php

namespace App\Http\Controllers;

use App\Models\Pengurus;
use Inertia\Response;

class PengurusController extends Controller
{
    public function index(): Response
    {
        $props = [
            'pengurus' => Pengurus::all()->toArray(),
        ];

        //TODO: return inertia
        dd($props);
    }
}
