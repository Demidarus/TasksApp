<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreDeveloperRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'role' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:developers,email'],
            'city' => ['required', 'string'],
            'phone' => ['required', 'string'],
            'isExtern' => ['required', 'boolean'],
            'company' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'is_extern' => $this->isExtern
        ]);
    }
}