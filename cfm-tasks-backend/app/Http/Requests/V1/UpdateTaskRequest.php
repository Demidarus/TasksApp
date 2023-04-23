<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
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
                'developerId' => ['required'],
                'title' => ['required'],
                'description' => ['required'],
                'storyPoints' => ['required'],
                'status' => ['required'],
            ];
        }
        else {
            return [
                'developerId' => ['sometimes','required'],
                'title' => ['sometimes','required'],
                'description' => ['sometimes','required'],
                'storyPoints' => ['sometimes','required'],
                'status' => ['sometimes','required'],
                'startDate' => ['sometimes', 'required']
            ];
        }
    }

    protected function prepareForValidation()
    {
        if($this->developerId || $this->storyPoints){
            $this->merge([
                'developer_id' => $this->developerId,
                'story_points' => $this->storyPoints,
                'start_dated' => $this->startDate
            ]);
        }
    }
}