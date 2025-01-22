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
            'nama' => 'nullable|string|max:50',
            'alamat_singkat' => 'nullable|string|max:60',
            'visi' => 'nullable|string|max:500',
            'misi' => 'nullable|string|max:2000',
            'profil' => 'nullable|string|max:500',
            'profil_pembuka' => 'nullable|string',
            'profil_isi' => 'nullable|string',
            'alamat_lengkap' => 'nullable|string|max:200',
            'email' => 'nullable|email|max:320',
            'instagram' => 'nullable|string|max:31',
            'nomor_telepon' => 'nullable|string|max:20',
            'peta_url' => 'nullable|string|max:2000',
            'thumbnail' => 'nullable|image|max:2048',
            'banner' => 'nullable|image|max:2048',
        ];
    }
}
