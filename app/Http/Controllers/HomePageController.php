<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Support\Str;
use Inertia\Response;

class HomePageController extends Controller
{
    public function index(): Response
    {
        $berita = Berita::query()->orderBy('id', 'desc')->limit(12)->get()
            ->transform(function ($berita) {
                $berita->isi = str_replace("\\n", " ", Str::limit($berita->isi, 110));
                return $berita;
            });

        $props = [
            'berita' => $berita,
        ];

        return inertia("Home/index", $props);
    }
}
