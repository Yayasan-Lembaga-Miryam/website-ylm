<?php

namespace App\Http\Controllers;

use App\Helpers\FileUpload;
use App\Http\Requests\UnitUpdateRequest;
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

        //TODO: return inertia
        dd($props);
    }

    public function show(Unit $unit): Response
    {
        $props = [
            'unit' => $unit->toArray(),
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
            $attributes['thumbnail_path'] = FileUpload::handleFileUploadWithName(
                $request->file('thumbnail'),
                "unit/images/$newSlug",
                'thumbnail',
                $unit->thumbnail_path
            );
        }

        if ($request->hasFile('banner')) {
            $attributes['banner_path'] = FileUpload::handleFileUploadWithName(
                $request->file('banner'),
                "unit/images/$newSlug",
                'banner',
                $unit->banner_path
            );
        }

        $unit->update($attributes);

        return redirect()->back()->with('message', 'Unit berhasil diubah');
    }
}
