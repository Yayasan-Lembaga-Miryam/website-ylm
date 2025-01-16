<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PengurusUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()?->isAdminSuper() ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama' => ['required', 'string', 'max:50'],
            'jabatan' => ['required', 'string', 'max:50'],
            'keterangan_jabatan' => ['nullable', 'string', 'max:50'],
            'foto' => ['nullable', 'image', 'max:2048'],
        ];
    }
}
