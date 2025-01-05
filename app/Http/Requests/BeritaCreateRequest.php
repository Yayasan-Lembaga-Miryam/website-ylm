<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class BeritaCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // already checked in RequireAdminMiddleware
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {

        $isUpdate = $this->isMethod('PUT') || $this->isMethod('PATCH');


        return [
            'judul' => ['required', 'string', 'max:100'],
            'isi' => ['required', 'string'],
            'gambar' => $isUpdate
            ? ['nullable', 'image', 'max:2048']
            : ['required', 'image', 'max:2048'],
        ];
    }
}
