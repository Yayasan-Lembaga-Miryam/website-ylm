<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\GaleriFoto;
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

        $galleryPhotos = GaleriFoto::query()
            ->latest()
            ->limit(10)
            ->get();

        $props = [
            'berita' => $berita,
            'galleryPhotos' => $galleryPhotos,
        ];

        return inertia("Home/index", $props);
    }
}
