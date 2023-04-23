<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DeveloperResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'role' => $this->role,
            'email' => $this->email,
            'city' => $this->city,
            'phone' => str_replace([' ', '-', '.', '(', ')'], '', $this->phone),
            'isExtern' => $this->is_extern,
            'company' => $this->company,
            'tasks' => TaskResource::collection($this->whenLoaded('tasks'))
        ];
    }
}