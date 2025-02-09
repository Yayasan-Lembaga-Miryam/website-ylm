<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PengurusCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // non admin super can only create kepala, guru, tenaga-kependidikan
        if (!auth()->user()->isAdminSuper() && !in_array($this->category, ['kepala', 'guru', 'tenaga-kependidikan'])) {
            return false;
        }

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'unit_id' => 'nullable|exists:unit,id',
            'category' => 'nullable|string|in:kepala,guru,tenaga-kependidikan,kepegawaian,keuangan,akademik,hukum',
            'nama' => 'required|string|max:50',
            'jabatan' => 'required|string|max:50',
            'keterangan_jabatan' => 'nullable|string|max:50',
            'foto' => 'required|image|max:2048',
            'prioritas' => 'required|integer',
        ];
    }

    protected function prepareForValidation()
    {
        if ($this->unit_id === '') {
            $this->merge([
                'unit_id' => null
            ]);
        }
    }
}
