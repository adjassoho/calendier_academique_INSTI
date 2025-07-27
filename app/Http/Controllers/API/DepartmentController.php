<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::withCount(['users', 'events'])->get();
        return response()->json($departments);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:departments,name',
            'code' => 'required|string|max:10|unique:departments,code',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $department = Department::create($request->all());
        return response()->json($department, 201);
    }

    public function show(Department $department)
    {
        $department->load(['users', 'events']);
        return response()->json($department);
    }

    public function update(Request $request, Department $department)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255|unique:departments,name,' . $department->id,
            'code' => 'sometimes|required|string|max:10|unique:departments,code,' . $department->id,
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $department->update($request->all());
        return response()->json($department);
    }

    public function destroy(Department $department)
    {
        // Vérifier si le département a des utilisateurs ou des événements
        if ($department->users()->count() > 0 || $department->events()->count() > 0) {
            return response()->json([
                'message' => 'Impossible de supprimer ce département car il contient des utilisateurs ou des événements'
            ], 409);
        }

        $department->delete();
        return response()->json(null, 204);
    }

    public function events(Department $department)
    {
        $events = $department->events()
            ->with(['category', 'creator'])
            ->orderBy('start_date')
            ->get();
            
        return response()->json($events);
    }
}
