<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class DeveloperFilter extends ApiFilter {
    protected $safeParms = [
        'id' => ['eq'],
        'name' => ['eq'],
        'role' => ['eq'],
        'email' => ['eq'],
        'city' => ['eq'],
        'phone' => ['eq'],
        'isExtern' => ['eq'],
        'company' => ['eq']
    ];

    protected $columnMap = [
        'isExtern' => 'is_extern'
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',
    ];
}