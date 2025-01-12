<?php

namespace App\Http\Controllers;

use App\Http\Requests\PengurusUpdateRequest;
use App\Models\Pengurus;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class PengurusController extends Controller
{
    public function getAllProps(): array
    {
        $props = [
            'pengurus' => Pengurus::all()->toArray(),
        ];

        return $props;
    }

    public function index(): Response
    {
        //TODO: return inertia
        // dd($this->getAllProps());
        return inertia("Structure/index", [
            'pengurus' => Pengurus::all()->toArray(),
        ]);
    
    }

    public function adminIndex(): Response
    {
        if (!auth()->user()->isAdminSuper()) {
            abort(403);
        }

        //TODO: return inertia
        dd($this->getAllProps());
    }

    public function update(PengurusUpdateRequest $request, Pengurus $pengurus): RedirectResponse
    {
        $validated = $request->validated();

        $pengurus->update($validated);

        if ($request->hasFile('foto')) {
            // save file, replace the foto_path with the new path, and delete the old file
            $newFotoPath = $request->file('foto')->store('pengurus/images', 'public');

            if ($pengurus->foto_path) {
                Storage::disk('public')->delete($pengurus->foto_path);
            }

            $pengurus->foto_path = $newFotoPath;
            $pengurus->save();
        }

        return redirect()->back()->with('message', 'Pengurus berhasil diubah');
    }
}
