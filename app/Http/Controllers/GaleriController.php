<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGaleriAlbumRequest;
use App\Http\Requests\StoreGaleriFotoRequest;
use App\Http\Requests\UpdateGaleriAlbumRequest;
use App\Models\GaleriAlbum;
use App\Models\GaleriFoto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;
use Illuminate\Support\Str;

class GaleriController extends Controller
{
    public function index(): Response
    {
        $albumThumbnails = GaleriAlbum::select('id', 'judul', 'slug', 'created_at')
            ->with(['fotos' => function ($query) {
                $query->latest('id')->limit(1);
            }])->get();

        $foto = GaleriFoto::whereNull('galeri_album_id')
            ->latest()
            ->paginate(8);

        $props = [
            'album' => $albumThumbnails,
            'foto' => $foto,
        ];

        return inertia("Gallery/index", $props);
    }

    public function showAlbumFoto(GaleriAlbum $album, Request $request): JsonResponse
    {
        $page = $request->input('page', 1);
        $foto = $album->fotos()->latest('id')->paginate(1, ['*'], 'page', $page);

        return response()->json([
            'album' => [
                'id' => $album->id,
                'judul' => $album->judul,
                'created_at' => $album->created_at,
                'fotos' => $foto,
                'total_photos' => $album->fotos()->count(),
                'current_page' => $foto->currentPage(),
                'last_page' => $foto->lastPage()
            ]
        ]);
    }

    public function adminShowAlbums(): Response
    {
        $album = GaleriAlbum::select('id', 'judul', 'slug', 'pembuat_id', 'created_at', 'updated_at')
            ->latest('id')
            ->paginate(10);

        $album->getCollection()->transform(function ($album) {
            $album->is_modifiable = $album->pembuat_id === auth()->id() || auth()->user()->isAdminSuper();
            return $album;
        });

        return inertia("Admin/Gallery", [
            'album' => $album
        ]);
    }

    public function adminShowAlbumFoto(GaleriAlbum $album, Request $request): JsonResponse
    {
        if (!auth()->user()->isAdminSuper() && $album->pembuat_id !== auth()->id()) {
            abort(403);
        }

        $page = $request->input('page', 1);
        $album->is_modifiable = $album->pembuat_id === auth()->id() || auth()->user()->isAdminSuper();

        $foto = $album->fotos()->latest('id')->paginate(1, ['*'], 'page', $page);

        return response()->json([
            'album' => [
                'id' => $album->id,
                'judul' => $album->judul,
                'slug' => $album->slug,
                'created_at' => $album->created_at,
                'is_modifiable' => $album->is_modifiable,
                'fotos' => $foto,
                'total_photos' => $album->fotos()->count(),
                'current_page' => $foto->currentPage(),
                'last_page' => $foto->lastPage()
            ]
        ]);
    }

    public function adminShowAlbumDetail(GaleriAlbum $album): JsonResponse
    {
        if (!auth()->user()->isAdminSuper() && $album->pembuat_id !== auth()->id()) {
            abort(403);
        }

        $album->is_modifiable = $album->pembuat_id === auth()->id() || auth()->user()->isAdminSuper();
        $foto = $album->fotos()->latest('id')->get();

        return response()->json([
            'album' => [
                'id' => $album->id,
                'judul' => $album->judul,
                'slug' => $album->slug,
                'created_at' => $album->created_at,
                'is_modifiable' => $album->is_modifiable
            ],
            'foto' => [
                'data' => $foto
            ]
        ]);
    }

    public function adminShowFoto(): Response
    {
        $isMobile = request()->header('X-Is-Mobile') === 'true';
        $perPage = $isMobile ? 2 : 10;

        $foto = GaleriFoto::whereNull('galeri_album_id')
            ->latest()
            ->paginate($perPage);

        $foto->getCollection()->transform(function ($foto) {
            $foto->is_modifiable = $foto->pembuat_id === auth()->id() || auth()->user()->isAdminSuper();
            return $foto;
        });

        $props = [
            'foto' => $foto,
        ];

        return inertia("Admin/Gallery", $props);
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

    public function storeAlbum(StoreGaleriAlbumRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $album = GaleriAlbum::create([
            'judul' => $validated['judul'],
            'pembuat_id' => auth()->id(),
            'slug' => Str::slug($validated['judul']),
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
