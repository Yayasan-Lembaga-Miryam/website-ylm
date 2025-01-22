<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PengurusUnitUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $pengurus = $this->route('pengurus');
        return auth()->user()->isAdminSuper() || 
               auth()->user()->getAdminUnit() === $pengurus->unit->slug;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category' => 'required|string|in:kepala,guru,tenaga-kependidikan',
            'nama' => 'required|string|max:50',
            'jabatan' => 'required|string|max:50',
            'foto' => 'nullable|image|max:2048',
            'prioritas' => 'required|integer',
        ];
    }
}
