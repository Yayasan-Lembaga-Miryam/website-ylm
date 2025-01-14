<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGaleriFotoRequest;
use App\Http\Requests\UpdateGaleriAlbumRequest;
use App\Models\GaleriAlbum;
use App\Models\GaleriFoto;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class GaleriController extends Controller
{
    public function index(): Response
    {
        // Get all albums with their latest photo
        $albumThumbnails = GaleriAlbum::with(['fotos' => function ($query) {
            $query->latest('id')->limit(1);
        }])->get();

        $albumComplete = GaleriAlbum::with('fotos')->get();

        // Get photos without album, paginated
        $foto = GaleriFoto::whereNull('galeri_album_id')
            ->latest()
            ->paginate(8);

            $props = [
                'album' => $albumThumbnails,
                'albumComplete' => $albumComplete ,
                'foto' => $foto,
            ];

        //TODO: return inertia
        // dd($props);
        return inertia("Gallery/index", $props);
    }

    public function showAlbumFoto(GaleriAlbum $album): Response
    {
        // Get all photos in the album
        $foto = $album->fotos()->latest('id')->paginate(1);

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
        // dd($props);
        return inertia("Admin/Gallery", $props);
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
            'judul' => $validated['judul'],
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

        $album->judul = $validated['judul'];
        $album->save();

        return redirect()->back()->with('message', 'Album berhasil diubah');
    }

    public function destroyAlbum(GaleriAlbum $album): RedirectResponse
    {
        if (! auth()->user()->isAdminSuper() && $album->pembuat_id !== auth()->id()) {
            abort(403);
        }

        foreach ($album->fotos as $foto) {
            if (Storage::disk('public')->exists($foto->path)) {
                Storage::disk('public')->delete($foto->path);
            }
        }

        $album->delete(); // This will cascade delete the photos

        return redirect()->back()->with('message', 'Album berhasil dihapus');
    }

    public function destroyFoto(GaleriFoto $foto): RedirectResponse
    {
        if (! auth()->user()->isAdminSuper() && $foto->pembuat_id !== auth()->id()) {
            abort(403);
        }

        if (Storage::disk('public')->exists($foto->path)) {
            Storage::disk('public')->delete($foto->path);
        }

        $foto->delete();

        return redirect()->back()->with('message', 'Foto berhasil dihapus');
    }
}
