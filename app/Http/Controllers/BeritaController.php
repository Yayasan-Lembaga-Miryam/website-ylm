<?php

namespace App\Http\Controllers;

use App\Http\Requests\BeritaCreateRequest;
use App\Models\Berita;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Response;

class BeritaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        //TODO: implement sorotan
        $sorotan = Berita::factory(1)->create()->map(function ($berita) {
            $berita->isi = Str::limit($berita->isi, 255);
            $berita->gambar_path = Storage::disk('public')->url($berita->gambar_path);
            return $berita;
        });

        //TODO: implement teratas
        $teratas = Berita::factory(3)->create()->map(function ($berita) {
            $berita->isi = Str::limit($berita->isi, 255);
            $berita->gambar_path = Storage::disk('public')->url($berita->gambar_path);
            return $berita;
        });

        $terbaru = Berita::query()->orderBy('id', 'desc')->paginate(5);
        $terbaru->getCollection()->transform(function ($berita) {
            $berita->isi = Str::limit($berita->isi, 255);
            $berita->gambar_path = Storage::disk('public')->url($berita->gambar_path);
            return $berita;
        });

        $props = [
            'sorotan' => $sorotan,
            'teratas' => $teratas,
            'terbaru' => $terbaru,
        ];

        //TODO: return inertia
        dd($props);
    }

    /**
     * Display the specified resource.
     */
    public function show(Berita $berita): Response
    {
        $berita->gambar_path = Storage::disk('public')->url($berita->gambar_path);

        $props = [
            'berita' => $berita,
        ];

        //TODO: return inertia
        dd($props);
    }

    public function create(): Response
    {
        // if user is not admin, show forbidden page

        //TODO: return inertia
        dd('not implemented');
    }

    public function store(BeritaCreateRequest $request): RedirectResponse
    {
        $request = $request->validated();

        $gambar_path = null;
        if ($request->hasFile('gambar')) {
            $gambar_path = $request->file('gambar')->store('berita/images', 'public');
        }

        $berita = new Berita();
        $berita->slug = Str::slug($request['judul']);
        $berita->judul = $request['judul'];
        $berita->isi = $request['isi'];
        $berita->gambar_path = $gambar_path;
        $berita->save();

        //TODO: redirect to the correct route
        return redirect()->route('berita.create')->with('message', 'Berita berhasil ditambahkan');
    }
}
