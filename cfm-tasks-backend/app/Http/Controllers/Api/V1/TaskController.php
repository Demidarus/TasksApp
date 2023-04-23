<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Task;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\StoreTaskRequest;
use App\Http\Requests\V1\UpdateTaskRequest;
use App\Http\Resources\V1\TaskResource;
use App\Http\Resources\V1\TaskCollection;
use App\Filters\V1\TaskFilter;

use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new TaskFilter();
        $queryItems = $filter->transform($request);

        if(count($queryItems) == 0) {
            return new TaskCollection(Task::paginate()); 
        }
        else {
            $tasks = Task::where($queryItems)->paginate();
            return new TaskCollection($tasks->appends($request->query()));
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $task = new Task();
        $task->status = 'To Do';
        $task->fill($request->all())->save();
        return new TaskResource($task);
    }

    /**
 * Display the specified resource.
 */
    public function show($id)
    {
        $task = Task::findOrFail($id);
        return new TaskResource($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->fill($request->validated());

        if ($task->status === 'In Progress' && is_null($task->start_dated)) {
            $task->start_dated = now();
            $task->done_dated = null;
        }
        else if($task->status === 'Done' && is_null($task->done_dated)) {
            $task->done_dated = now();
            if(is_null($task->start_dated)){
                $task->start_dated = now();
            }
        }
        else if($task->status === 'To Do'){
            $task->start_dated = null;
            $task->done_dated = null;
        }

        if($request->storyPoints) {
            $task->story_points = $request->storyPoints;
        }
        if ($request->developerId) {
            $task->developer_id = $request->developerId;
        }

        $task->save();

        return new TaskResource($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();
        
        return response()->json([
            'message' => 'Task deleted successfully'
        ]);
    }

    /**
     * Search for a title
     */
    public function search($title)
    {
        return Task::where('title', 'like', '%'.$title.'%')->get();
    }

    /**
     * Search for a title and filter by developer ID
     */
    public function searchByDeveloperId($title, $developerId)
    {
        return Task::where('title', 'like', '%' . $title . '%')
            ->where('developer_id', $developerId)
            ->get();
    }
}