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
            return $berita;
        });
        $sorotan = $sorotan[0];

        //TODO: implement teratas
        $teratas = Berita::factory(5)->create()->map(function ($berita) {
            $berita->isi = Str::limit($berita->isi, 255);
            return $berita;
        });

        $terbaru = Berita::query()->orderBy('id', 'desc')->paginate(5);
        $terbaru->getCollection()->transform(function ($berita) {
            $berita->isi = Str::limit($berita->isi, 255);
            return $berita;
        });

        $props = [
            'sorotan' => $sorotan,
            'teratas' => $teratas,
            'terbaru' => $terbaru,
        ];

        return inertia("News/index", $props);
    }

    /**
     * Display the specified resource.
     */
    public function show(Berita $berita): Response
    {
        $props = [
            'berita' => $berita,
        ];

        return inertia("News/NewsDetail", $props);
    }

    public function create(): Response
    {
        // Authorization already handled by middleware

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

    public function edit(Berita $berita): Response
    {
        // Authorization already handled by middleware

        $berita->gambar_path = Storage::disk('public')->url($berita->gambar_path);

        $props = [
            'berita' => $berita,
        ];

        //TODO: return inertia
        dd($props);
    }

    public function update(BeritaCreateRequest $request, Berita $berita): RedirectResponse
    {
        $request = $request->validated();

        $gambar_path = null;
        if ($request->hasFile('gambar')) {
            $gambar_path = $request->file('gambar')->store('berita/images', 'public');
        }

        $berita->slug = Str::slug($request['judul']);
        $berita->judul = $request['judul'];
        $berita->isi = $request['isi'];
        $berita->gambar_path = $gambar_path;
        $berita->save();

        //TODO: redirect to the correct route
        return redirect()->route('berita.edit', $berita)->with('message', 'Berita berhasil diubah');
    }

    public function destroy(Berita $berita): RedirectResponse
    {
        // Authorization already handled by middleware

        $berita->delete();

        //TODO: redirect to the correct route
        return redirect()->route('berita.index')->with('message', 'Berita berhasil dihapus');
    }
}
