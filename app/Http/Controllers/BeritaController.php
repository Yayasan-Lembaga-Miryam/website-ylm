<?php

namespace App\Http\Controllers;

use App\Helpers\BotDetector;
use App\Http\Requests\BeritaCreateRequest;
use App\Models\Berita;
use App\Models\BeritaSorotan;
use App\Models\BeritaView;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
        $teratas = Berita::query()->orderBy('views', 'desc')->limit(5)->get();

        $terbaru = Berita::query()->orderBy('id', 'desc')->paginate(5);
        $terbaru->getCollection()->transform(function ($berita) {
            $berita->isi = str_replace("\\n", " ", Str::limit($berita->isi, 750));
            return $berita;
        });

        $sorotan = BeritaSorotan::getAll();
        if ($sorotan->isEmpty()) {
            $sorotan = collect([$terbaru->first()]);
        }

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
        if (! BotDetector::isBot()) {
            $guestToken = request()->cookie('guest_token');
            if ($guestToken) {
                DB::transaction(function () use ($berita, $guestToken) {
                    try {
                        $beritaView = new BeritaView();
                        $beritaView->berita_id = $berita->id;
                        $beritaView->guest_token = $guestToken;
                        $beritaView->save();

                        $berita->increment('views');
                    } catch (QueryException $e) {
                        if ($e->errorInfo[1] !== 1062) {
                            throw $e;
                        }
                    }
                });
            }

        }

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
        $berita->pembuat_id = auth()->id();
        $berita->save();

        //TODO: redirect to the correct route
        return redirect()->route('berita.create')->with('message', 'Berita berhasil ditambahkan');
    }

    public function edit(Berita $berita): Response
    {
        if (! auth()->user()->isAdminSuper() && $berita->pembuat_id !== auth()->id()) {
            abort(403);
        }

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

        if (! auth()->user()->isAdminSuper() && $berita->pembuat_id !== auth()->id()) {
            abort(403);
        }

        $gambar_path = null;
        if ($request->hasFile('gambar')) {
            $gambar_path = $request->file('gambar')->store('berita/images', 'public');
        }

        $berita->slug = Str::slug($request['judul']);
        $berita->judul = $request['judul'];
        $berita->isi = $request['isi'];
        $berita->gambar_path = $gambar_path;
        $berita->pembuat_id = auth()->id();
        $berita->save();

        //TODO: redirect to the correct route
        return redirect()->route('berita.edit', $berita)->with('message', 'Berita berhasil diubah');
    }

    public function destroy(Berita $berita): RedirectResponse
    {
        if (! auth()->user()->isAdminSuper() && $berita->pembuat_id !== auth()->id()) {
            abort(403);
        }

        $berita->delete();

        //TODO: redirect to the correct route
        return redirect()->route('berita.index')->with('message', 'Berita berhasil dihapus');
    }

    public function addSorotan(Berita $berita): RedirectResponse
    {
        if (! auth()->user()->isAdminSuper()) {
            abort(403);
        }

        try {
            if (BeritaSorotan::find($berita->id)) {
                return redirect()->back()->with('message', 'Berita sudah ada di sorotan');
            }

            DB::transaction(function () use ($berita) {
                BeritaSorotan::deleteOldestIfAtLimit();
                BeritaSorotan::create(['berita_id' => $berita->id]);
            });

            return redirect()->back()->with('message', 'Berita berhasil ditambahkan ke sorotan');
        } catch (QueryException $e) {
            Log::error("Failed to add berita to sorotan", [
                'exception' => $e,
                'berita_id' => $berita->id,
                'message' => $e->getMessage()
            ]);
            return redirect()->back()->with('message', 'Gagal menambahkan berita ke sorotan');
        }
    }

    public function removeSorotan(Berita $berita): RedirectResponse
    {
        if (! auth()->user()->isAdminSuper()) {
            abort(403);
        }

        try {
            $sorotan = BeritaSorotan::find($berita->id);
            if (!$sorotan) {
                return redirect()->back()->with('message', 'Berita tidak ada di sorotan');
            }

            DB::transaction(function () use ($sorotan) {
                $sorotan->delete();
            });

            return redirect()->back()->with('message', 'Berita berhasil dihapus dari sorotan');
        } catch (QueryException $e) {
            Log::error("Failed to remove berita to sorotan", [
                'exception' => $e,
                'berita_id' => $berita->id,
                'message' => $e->getMessage()
            ]);
            return redirect()->back()->with('message', 'Gagal menghapus berita dari sorotan');
        }
    }
}
