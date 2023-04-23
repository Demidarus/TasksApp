<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Developer;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\StoreDeveloperRequest;
use App\Http\Requests\V1\UpdateDeveloperRequest;
use App\Http\Resources\V1\DeveloperResource;
use App\Http\Resources\V1\DeveloperCollection;
use App\Filters\V1\DeveloperFilter;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;


class DeveloperController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new DeveloperFilter();
        $filterItems = $filter->transform($request);

        $includeTasks = $request->query('includeTasks');

        $developers = Developer::where($filterItems);

        if($includeTasks) {
            $developers = $developers->with('tasks');
        }

        return new DeveloperCollection($developers->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDeveloperRequest $request)
    {
        $developer = Developer::create([
            'name' => $request->input('name'),
            'role' => $request->input('role'),
            'email' => $request->input('email'),
            'city' => $request->input('city'),
            'phone' => $request->input('phone'),
            'is_extern' => $request->input('isExtern'),
            'company' => $request->input('company'),
            'password' => Hash::make($request->input('password')),
        ]);

        return new DeveloperResource($developer);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $developer = Developer::findOrFail($id);
        $includeTasks = request()->query('includeTasks');

        if($includeTasks){
            return new DeveloperResource($developer->loadMissing('tasks'));
        }
        return new DeveloperResource($developer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDeveloperRequest $request,  $id)
    {
        $developer = Developer::find($id);
        $developer->update($request->all());
        return new DeveloperResource($developer);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Developer $developer)
    {
        $developer->delete();

        return response()->json(['message' => 'Developer deleted successfully']);
    }
}