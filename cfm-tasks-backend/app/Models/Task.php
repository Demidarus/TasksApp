<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'developer_id',
        'title',
        'description',
        'story_points',
        'status',
    ];
    // One to Many Relationship with Developer
    public function developer() {
        return $this->belongsTo(Developer::class);
    }
}