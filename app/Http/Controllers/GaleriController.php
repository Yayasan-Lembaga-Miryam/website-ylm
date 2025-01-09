<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGaleriFotoRequest;
use App\Http\Requests\UpdateGaleriAlbumRequest;
use App\Models\GaleriAlbum;
use App\Models\GaleriFoto;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class GaleriController extends Controller
{
    public function index(): Response
    {
        // Get all albums with their latest photo
        $album = GaleriAlbum::with(['fotos' => function($query) {
            $query->latest('id')->limit(1);
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

    public function showAlbumFoto(GaleriAlbum $album): Response
    {
        // Get all photos in the album
        $foto = $album->fotos()->latest('id')->paginate(10);

        $props = [
            'album' => $album,
            'foto' => $foto,
        ];

        //TODO: return inertia
        dd($props);
    }

    public function adminShowAlbums(): Response
    {
        $album = GaleriAlbum::latest('id')->paginate(20);

        $album->getCollection()->transform(function ($album) {
            $album->is_modifiable = $album->pembuat_id === auth()->id() || auth()->user()->isAdminSuper();
            return $album;
        });

        $props = [
            'album' => $album,
        ];

        //TODO: return inertia
        dd($props);
    }

    public function adminShowAlbumFoto(GaleriAlbum $album): Response
    {
        $album->is_modifiable = $album->pembuat_id === auth()->id() || auth()->user()->isAdminSuper();

        $foto = $album->fotos()->latest('id')->paginate(10);

        $props = [
            'album' => $album,
            'foto' => $foto,
        ];

        //TODO: return inertia
        dd($props);
    }

    public function adminShowFoto(): Response
    {
        $foto = GaleriFoto::latest('id')->paginate(10);

        $foto->getCollection()->transform(function ($foto) {
            $foto->is_modifiable = $foto->pembuat_id === auth()->id() || auth()->user()->isAdminSuper();
            return $foto;
        });

        $props = [
            'foto' => $foto,
        ];

        //TODO: return inertia
        dd($props);
    }

    public function storeFoto(StoreGaleriFotoRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        foreach ($validated['foto'] as $foto) {
            GaleriFoto::create([
                'galeri_album_id' => $validated['album_id'] ?? null,
                'path' => $foto->store('galeri/images', 'public'),
                'pembuat_id' => auth()->id(),
            ]);
        }

        return redirect()->back()->with('message', 'Foto berhasil ditambahkan');
    }

    public function storeAlbum(StoreGaleriFotoRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $album = GaleriAlbum::create([
            'nama' => $validated['nama'],
            'pembuat_id' => auth()->id(),
        ]);

        foreach ($validated['foto'] as $foto) {
            GaleriFoto::create([
                'galeri_album_id' => $album->id,
                'path' => $foto->store('galeri/images', 'public'),
                'pembuat_id' => auth()->id(),
            ]);
        }

        return redirect()->back()->with('message', 'Album berhasil ditambahkan');
    }

    public function updateAlbum(UpdateGaleriAlbumRequest $request, GaleriAlbum $album): RedirectResponse
    {
        if (! auth()->user()->isAdminSuper() && $album->pembuat_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validated();

        $album->nama = $validated['nama'];
        $album->save();

        return redirect()->back()->with('message', 'Album berhasil diubah');
    }


}
