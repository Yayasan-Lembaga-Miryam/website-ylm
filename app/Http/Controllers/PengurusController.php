<?php

namespace App\Http\Controllers;

use App\Helpers\FileStorage;
use App\Http\Requests\PengurusCreateRequest;
use App\Http\Requests\PengurusUpdateRequest;
use App\Models\Pengurus;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class PengurusController extends Controller
{
    public function getNonUnitProps(): array
    {
        // Get all Pengurus where unit_id is null, ordered by prioritas and nama
        $pengurus = Pengurus::whereNull('unit_id')
            ->orderBy('prioritas')
            ->orderBy('nama')
            ->get();

        // Populate the $props array with filtered data based on category
        $props = [
            'tree' => $pengurus->whereNull('category')->sortBy('id')->values(),
            'kepegawaian' => $pengurus->where('category', 'kepegawaian')->values(),
            'keuangan' => $pengurus->where('category', 'keuangan')->values(),
            'akademik' => $pengurus->where('category', 'akademik')->values(),
            'hukum' => $pengurus->where('category', 'hukum')->values(),
        ];

        return $props;
    }

    public function index(): Response
    {
        return inertia("Structure/index", $this->getNonUnitProps());
    }

    public function adminIndex(): Response
    {
        if (!auth()->user()->isAdminSuper()) {
            abort(403);
        }

        return inertia("Admin/Staff", $this->getNonUnitProps());
    }

    public function store(PengurusCreateRequest $request): RedirectResponse
    {
        $attributes = $request->validated();

        $attributes['foto_path'] = FileStorage::upload(
            $request->file('foto'),
            "pengurus/images",
            null,
        );

        Pengurus::create($attributes);

        return redirect()->back()->with('message', 'Pengurus berhasil ditambahkan');
    }

    public function update(PengurusUpdateRequest $request, Pengurus $pengurus): RedirectResponse
    {
        $attributes = $request->validated();

        if ($request->hasFile('foto')) {
            $attributes['foto_path'] = FileStorage::upload(
                $request->file('foto'),
                "pengurus/images",
                $pengurus->foto_path
            );
        }

        $pengurus->update($attributes);

        return redirect()->back()->with('message', 'Pengurus berhasil diubah');
    }

    public function destroy(Pengurus $pengurus): RedirectResponse
    {
        if (!auth()->user()->isAdminSuper() && auth()->user()->getAdminUnit() !== $pengurus->unit->slug) {
            abort(403);
        }

        if ($pengurus->unit_id === null && $pengurus->category === null) {
            abort(403);
        }

        FileStorage::deleteIfExists($pengurus->foto_path);

        $pengurus->delete();

        return redirect()->back()->with('message', 'Pengurus berhasil dihapus');
    }
}
