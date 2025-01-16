<?php

namespace App\Http\Controllers;

use App\Http\Requests\KurikulumCreateRequest;
use App\Models\Kurikulum;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class KurikulumController extends Controller
{
    public function index(): Response
    {
        $kurikulum = Kurikulum::all();

        $props = [
            'kurikulum' => $kurikulum,
        ];

        return inertia("Curriculum/index", $props);
    }

    public function store(KurikulumCreateRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Kurikulum::create($validated);

        return redirect()->back()->with('message', 'Kurikulum berhasil ditambahkan');
    }

    public function update(KurikulumCreateRequest $request, Kurikulum $kurikulum): RedirectResponse
    {
        $validated = $request->validated();

        $kurikulum->update($validated);

        return redirect()->back()->with('message', 'Kurikulum berhasil diubah');
    }
}
