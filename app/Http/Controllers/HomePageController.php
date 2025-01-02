<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Inertia\Response;

class HomePageController extends Controller
{
    public function index(): Response
    {
        $berita = Berita::query()->orderBy('id', 'desc')->limit(12)->get();

        $props = [
            'berita' => $berita,
        ];

        return inertia("Home/index", $props);
    }
}
