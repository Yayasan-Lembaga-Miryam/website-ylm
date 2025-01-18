<?php

namespace App\Http\Controllers;

use App\Helpers\FileStorage;
use App\Http\Requests\PengurusUnitCreateRequest;
use App\Http\Requests\UnitUpdateRequest;
use App\Models\PengurusUnit;
use App\Models\Unit;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Response;

class UnitController extends Controller
{
    public function index(): Response
    {
        $units = Unit::select('id', 'nama', 'slug', 'alamat_singkat', 'thumbnail_path')->get()->toArray();

        $props = [
            'units' => $units,
        ];

        return inertia("Unit/index", $props);
    }

    public function show(Unit $unit): Response
    {
        $props = [
            'unit' => $unit->toArray(),
            'kepala' => PengurusUnit::where('unit_id', $unit->id)
                ->where('category', 'kepala')
                ->orderBy('prioritas')
                ->orderBy('nama')
                ->get(),
            'guru' => PengurusUnit::where('unit_id', $unit->id)
                ->where('category', 'guru')
                ->orderBy('prioritas')
                ->orderBy('nama')
                ->paginate(4),
            'tenaga-kependidikan' => PengurusUnit::where('unit_id', $unit->id)
                ->where('category', 'tenaga-kependidikan')
                ->orderBy('prioritas')
                ->orderBy('nama')
                ->paginate(4),
        ];

        //TODO: return inertia
        dd($props);
    }

    public function update(UnitUpdateRequest $request, Unit $unit): RedirectResponse
    {
        $attributes = $request->validated();

        $newSlug = isset($attributes['nama'])
            ? Str::slug($attributes['nama'])
            : $unit->slug;
        $attributes['slug'] = $newSlug;

        // Handle file uploads
        if ($request->hasFile('thumbnail')) {
            $attributes['thumbnail_path'] = FileStorage::uploadWithName(
                $request->file('thumbnail'),
                "unit/images/$newSlug",
                'thumbnail',
                $unit->thumbnail_path
            );
        }

        if ($request->hasFile('banner')) {
            $attributes['banner_path'] = FileStorage::uploadWithName(
                $request->file('banner'),
                "unit/images/$newSlug",
                'banner',
                $unit->banner_path
            );
        }

        $unit->update($attributes);

        return redirect()->back()->with('message', 'Unit berhasil diubah');
    }

    public function storePengurus(PengurusUnitCreateRequest $request, Unit $unit): RedirectResponse
    {
        $attributes = $request->validated();
        $attributes['unit_id'] = $unit->id;

        // Handle file uploads
        $attributes['foto_path'] = FileStorage::upload(
            $request->file('foto'),
            "pengurus-unit/images",
            null
        );

        PengurusUnit::create($attributes);

        return redirect()->back()->with('message', 'Pengurus berhasil ditambahkan');
    }

    public function updatePengurus(PengurusUnitCreateRequest $request, PengurusUnit $pengurus): RedirectResponse
    {
        $attributes = $request->validated();

        // Handle file uploads
        if ($request->hasFile('foto')) {
            $attributes['foto_path'] = FileStorage::upload(
                $request->file('foto'),
                "pengurus-unit/images",
                $pengurus->foto_path
            );
        }

        $pengurus->update($attributes);

        return redirect()->back()->with('message', 'Pengurus berhasil diubah');
    }

    public function destroyPengurus(PengurusUnit $pengurus): RedirectResponse
    {
        if (!auth()->user()->isAdminSuper() && auth()->user()->getAdminUnit() !== $pengurus->unit->slug) {
            abort(403);
        }

        FileStorage::deleteIfExists($pengurus->foto_path);

        $pengurus->delete();

        return redirect()->back()->with('message', 'Pengurus berhasil dihapus');
    }
}
