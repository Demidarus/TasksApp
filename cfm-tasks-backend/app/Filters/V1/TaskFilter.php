<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class TaskFilter extends ApiFilter {
    protected $safeParms = [
        'id' => ['eq'],
        'developerId' => ['eq'],
        'title' => ['eq'],
        'description' => ['eq'],
        'storyPoints' => ['eq', 'gt', 'lt', 'lte', 'gte'],
        'status' => ['eq'],
        'startDate' => ['eq'],
        'doneDate' => ['eq'],
        'createdAt' => ['eq'],
        'updatedAt' => ['eq'],
    ];

    protected $columnMap = [
        'startDate' => 'start_dated',
        'doneDate' => 'done_dated',
        'createdAt' => 'created_at',
        'updatedAt' => 'updated_ate',
        'storyPoints' => 'story_points',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>='
    ];
}