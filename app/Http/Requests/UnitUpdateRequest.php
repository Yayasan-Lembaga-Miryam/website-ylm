<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UnitUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->isAdminSuper() || auth()->user()->getAdminUnit() === $this->unit->slug;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama' => 'required|string|max:50',
            'alamat_singkat' => 'required|string|max:60',
            'visi' => 'required|string|max:500',
            'misi' => 'required|string|max:2000',
            'profil' => 'required|string|max:500',
            'alamat_lengkap' => 'required|string|max:200',
            'email' => 'required|email|max:320',
            'nomor_telepon' => 'required|string|max:20',
            'peta_url' => 'required|string|max:2000',
            'thumbnail' => 'nullable|image|max:2048',
            'banner' => 'nullable|image|max:2048',
        ];
    }
}
