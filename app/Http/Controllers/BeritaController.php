<?php

namespace App\Http\Controllers;

use App\Models\Berita;
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
}
