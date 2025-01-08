<?php

namespace App\Http\Controllers;

use App\Models\GaleriAlbum;
use App\Models\GaleriFoto;
use Inertia\Response;

class GaleriController extends Controller
{
    public function index(): Response
    {
        // Get all albums with their latest photo
        $album = GaleriAlbum::with(['fotos' => function($query) {
            $query->latest('created_at')->limit(1);
        }])->get();

        // Get photos without album, paginated
        $foto = GaleriFoto::whereNull('galeri_album_id')
            ->latest()
            ->paginate(10);

        $props = [
            'album' => $album,
            'foto' => $foto,
        ];

        //TODO: return inertia
        dd($props);
    }

    public function showAlbum(GaleriAlbum $album): Response
    {
        // Get all photos in the album
        $foto = $album->fotos()->latest()->paginate(10);

        $props = [
            'album' => $album,
            'foto' => $foto,
        ];

        //TODO: return inertia
        dd($props);
    }
}
