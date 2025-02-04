<?php

namespace App\Http\Controllers;

use App\Helpers\FileStorage;
use App\Http\Requests\UnitUpdateRequest;
use App\Models\Pengurus;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
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

    public function adminKepegawaian(Unit $unit, Request $request): Response | RedirectResponse
    {
        if (auth()->user()->isAdminUnit() && auth()->user()->getAdminUnit() !== $unit->slug) {
            return redirect()->route('admin.unit.kepegawaian', ['unit' => auth()->user()->getAdminUnit()]);
        }

        $category = $request->query('category', 'kepala');

        $pengurusUnit = Pengurus::where('unit_id', $unit->id)
            ->where('category', $category)
            ->orderBy('prioritas')
            ->orderBy('nama')
            ->get();

        $allUnits = auth()->user()->isAdminSuper()
            ? Unit::select('id', 'slug', 'nama')->get()
            : null;


        $props = [
            'pengurus_unit' => $pengurusUnit,
            'allUnits' => $allUnits,
            'auth' => [
                'user' => [
                    'role' => auth()->user()->role
                ]
            ],
            'unit' => $unit->only('id', 'slug', 'nama'),
        ];



        return inertia("Admin/Unit/kepegawaian", $props);
    }

    public function adminProfil(Unit $unit): Response | RedirectResponse
    {
        if (auth()->user()->isAdminUnit() && auth()->user()->getAdminUnit() !== $unit->slug) {
            return redirect()->route('admin.unit.profil', ['unit' => auth()->user()->getAdminUnit()]);
        }

        $unitData = Unit::select('id', 'slug', 'nama', 'thumbnail_path', 'banner_path', 'profil_pembuka', 'profil_isi')
            ->where('slug', $unit->slug)
            ->first();

        $allUnits = auth()->user()->isAdminSuper()
            ? Unit::select('id', 'slug', 'nama')->get()
            : null;

        $props = [
            'unit' => $unitData,
            'allUnits' => $allUnits,
            'auth' => [
                'user' => [
                    'role' => auth()->user()->role
                ]
            ]
        ];

        return inertia("Admin/Unit/profil", $props);
    }

    public function adminVisiMisi(Unit $unit): Response | RedirectResponse
    {
        if (auth()->user()->isAdminUnit() && auth()->user()->getAdminUnit() !== $unit->slug) {
            return redirect()->route('admin.unit.visi-misi', ['unit' => auth()->user()->getAdminUnit()]);
        }

        $unitData = Unit::select('id', 'slug', 'nama', 'visi', 'misi')
            ->where('slug', $unit->slug)
            ->first();

        $allUnits = auth()->user()->isAdminSuper()
            ? Unit::select('id', 'slug', 'nama')->get()
            : null;

        $props = [
            'unit' => $unitData,
            'allUnits' => $allUnits,
            'auth' => [
                'user' => [
                    'role' => auth()->user()->role
                ]
            ]
        ];

        return inertia("Admin/Unit/visiMisi", $props);
    }

    public function adminAlamat(Unit $unit): Response | RedirectResponse
    {
        if (auth()->user()->isAdminUnit() && auth()->user()->getAdminUnit() !== $unit->slug) {
            return redirect()->route('admin.unit.alamat', ['unit' => auth()->user()->getAdminUnit()]);
        }

        $unitData = Unit::select('id', 'slug', 'nama', 'alamat_singkat', 'alamat_lengkap', 'email', 'nomor_telepon', 'peta_url', 'instagram')
            ->where('slug', $unit->slug)
            ->first();

        $allUnits = auth()->user()->isAdminSuper()
            ? Unit::select('id', 'slug', 'nama')->get()
            : null;

        $props = [
            'unit' => $unitData,
            'allUnits' => $allUnits,
            'auth' => [
                'user' => [
                    'role' => auth()->user()->role
                ]
            ]
        ];

        return inertia("Admin/Unit/alamat", $props);
    }

    public function adminIndex(): Response
    {
        return inertia("Admin/Unit/index");
    }

    public function show(Unit $unit): Response
    {
        $props = [
            'unit' => $unit->toArray(),
            'kepala' => Pengurus::where('unit_id', $unit->id)
                ->where('category', 'kepala')
                ->orderBy('prioritas')
                ->orderBy('nama')
                ->get(),
            'guru' => Pengurus::where('unit_id', $unit->id)
                ->where('category', 'guru')
                ->orderBy('prioritas')
                ->orderBy('nama')
                ->paginate(4),
            'tenaga-kependidikan' => Pengurus::where('unit_id', $unit->id)
                ->where('category', 'tenaga-kependidikan')
                ->orderBy('prioritas')
                ->orderBy('nama')
                ->paginate(4),
        ];

        return inertia("DetailUnit/index", $props);
    }

    public function getStaff(Unit $unit, string $category)
    {
        $staff = Pengurus::where('unit_id', $unit->id)
            ->where('category', $category)
            ->orderBy('prioritas')
            ->orderBy('nama')
            ->paginate(4);

        return response()->json($staff);
    }

    public function update(UnitUpdateRequest $request, Unit $unit): RedirectResponse
    {
        $attributes = array_filter($request->validated(), function ($value) {
            return $value !== null && $value !== '';
        });

        if ($request->hasFile('thumbnail')) {
            $attributes['thumbnail_path'] = FileStorage::uploadWithName(
                $request->file('thumbnail'),
                "unit/images/{$unit->slug}",
                'thumbnail',
                $unit->thumbnail_path
            );
        }

        if ($request->hasFile('banner')) {
            $attributes['banner_path'] = FileStorage::uploadWithName(
                $request->file('banner'),
                "unit/images/{$unit->slug}",
                'banner',
                $unit->banner_path
            );
        }

        $unit->update($attributes);

        return redirect()->back()->with('message', 'Unit berhasil diubah');
    }
}
