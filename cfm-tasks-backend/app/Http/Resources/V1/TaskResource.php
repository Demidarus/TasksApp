<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
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
            'developerId' => $this->developer_id,
            'title' => $this->title,
            'description' => $this->description,
            'storyPoints' => $this->story_points,
            'status' => $this->status,
            'startDate' => $this->start_dated,
            'doneDate' => $this->done_dated,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}