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
        if (! BotDetector::isBot() && !(auth()->check() && auth()->user()->isAdmin())) {
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

    public function adminIndex(): Response
    {

        $isAdminSuper = auth()->user()->isAdminSuper();

        $berita = Berita::query()
            ->leftJoin('berita_sorotan', 'berita.id', '=', 'berita_sorotan.berita_id')
            ->select([
                'berita.id',
                'berita.slug',
                'berita.judul',
                'berita.isi',
                'berita.gambar_path',
                'berita.pembuat_id',
                'berita_sorotan.berita_id as sorotan_id'
            ])
            ->orderBy('berita_sorotan.created_at', 'desc')
            ->orderBy('berita.id', 'desc')
            ->paginate(15)
            ->through(function ($item) use ($isAdminSuper) {
                return [
                    'id' => $item->id,
                    'slug' => $item->slug,
                    'gambar_url' => $item->gambar_path ? asset('storage/' . $item->gambar_path) : null,
                    'judul' => $item->judul,
                    'isi' => $item->isi,
                    'is_sorotan' => !is_null($item->sorotan_id),
                    'is_modifiable' => $isAdminSuper || $item->pembuat_id === auth()->id(),
                ];
            });

            $props = [
                'berita' => $berita,
                'auth_user_status' => [
                    'is_superadmin' => auth()->user()->isAdminSuper(),
                    'is_adminunit' => auth()->user()->isAdminUnit(),
                ],
            ];

        return inertia('Admin/News', $props);
    }

    public function adminShow(Berita $berita): Response
    {
        // isAdmin check already done in middleware

        $berita->is_modifiable = auth()->user()->isAdminSuper() || $berita->pembuat_id === auth()->id();

        $props = [
            'berita' => $berita,
        ];

        //TODO: return inertia
        dd($props);
    }

    public function store(BeritaCreateRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $slug = Str::slug($validated['judul']);

        $gambar_path = null;
        if (isset($validated['gambar'])) {
            $extension = $validated['gambar']->getClientOriginalExtension();
            $gambar_path = $validated['gambar']->storeAs(
                'berita/images',
                $slug . '.' . $extension,
                'public'
            );
        }

        $berita = new Berita();
        $berita->slug = $slug;
        $berita->judul = $validated['judul'];
        $berita->isi = $validated['isi'];
        $berita->gambar_path = $gambar_path;
        $berita->pembuat_id = auth()->id();
        $berita->save();

        return redirect()->route('admin.berita.index')->with('message', 'Berita berhasil ditambahkan');
    }

    public function update(BeritaCreateRequest $request, Berita $berita): RedirectResponse
    {
        if (! auth()->user()->isAdminSuper() && $berita->pembuat_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validated();
        $newSlug = Str::slug($validated['judul']);

        if ($request->hasFile('gambar')) {
            // Delete old image if exists
            if ($berita->gambar_path && Storage::disk('public')->exists($berita->gambar_path)) {
                Storage::disk('public')->delete($berita->gambar_path);
            }

            // Store new image with slug name
            $extension = $request->file('gambar')->getClientOriginalExtension();
            $gambar_path = $request->file('gambar')->storeAs(
                'berita/images',
                $newSlug . '.' . $extension,
                'public'
            );
        } else {
            // If slug changed but image exists, rename the existing image
            if ($berita->gambar_path && $berita->slug !== $newSlug) {
                $oldPath = $berita->gambar_path;
                $extension = pathinfo($oldPath, PATHINFO_EXTENSION);
                $newPath = 'berita/images/' . $newSlug . '.' . $extension;

                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->move($oldPath, $newPath);
                    $gambar_path = $newPath;
                } else {
                    $gambar_path = $berita->gambar_path;
                }
            } else {
                $gambar_path = $berita->gambar_path;
            }
        }

        $berita->update([
            'slug' => $newSlug,
            'judul' => $validated['judul'],
            'isi' => $validated['isi'],
            'gambar_path' => $gambar_path,
        ]);

        return redirect()
            ->route('admin.berita.index')
            ->with('message', 'Berita berhasil diubah');
    }

    public function destroy(Berita $berita): RedirectResponse
    {
        if (! auth()->user()->isAdminSuper() && $berita->pembuat_id !== auth()->id()) {
            abort(403);
        }

        // Delete associated image if exists
        if ($berita->gambar_path && Storage::disk('public')->exists($berita->gambar_path)) {
            Storage::disk('public')->delete($berita->gambar_path);
        }

        $berita->delete();

        return redirect()
            ->route('admin.berita.index')
            ->with('message', 'Berita berhasil dihapus');
    }

    public function addSorotan(Berita $berita): RedirectResponse
    {
        if (! auth()->user()->isAdminSuper()) {
            abort(403);
        }

        if (BeritaSorotan::find($berita->id)) {
            return redirect()->back()->with('message', 'Berita sudah ada di sorotan');
        }

        DB::transaction(function () use ($berita) {
            BeritaSorotan::deleteOldestIfAtLimit();
            BeritaSorotan::create(['berita_id' => $berita->id]);
        });

        return redirect()->back()->with('message', 'Berita berhasil ditambahkan ke sorotan');
    }

    public function removeSorotan(Berita $berita): RedirectResponse
    {
        if (! auth()->user()->isAdminSuper()) {
            abort(403);
        }

        $sorotan = BeritaSorotan::find($berita->id);
        if (!$sorotan) {
            return redirect()->back()->with('message', 'Berita tidak ada di sorotan');
        }

        $sorotan->delete();

        return redirect()->back()->with('message', 'Berita berhasil dihapus dari sorotan');
    }
}
