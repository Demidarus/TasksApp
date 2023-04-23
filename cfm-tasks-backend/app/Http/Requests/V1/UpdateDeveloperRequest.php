<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDeveloperRequest extends FormRequest
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
        $method = $this->method();

        if($method == 'PUT'){
            return [
                'name' => ['required'],
                'role' => ['required'],
                'email' => ['required', 'email'],
                'city' => ['required'],
                'phone' => ['required'],
                'isExtern' => ['required'],
                'company' => ['required'],
            ];
        }
        else {
            return [
                'name' => ['sometimes','required'],
                'role' => ['sometimes','required'],
                'email' => ['sometimes','required', 'email'],
                'city' => ['sometimes','required'],
                'phone' => ['sometimes','required'],
                'isExtern' => ['sometimes','required'],
                'company' => ['sometimes','required'],
            ];
        }
    }

    protected function prepareForValidation()
    {
        if($this->isExtern){
            $this->merge([
                'is_extern' => $this->isExtern
            ]);
        }
    }
}