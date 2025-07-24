<?php

namespace App\Http\Controllers;

use App\Models\AcademicActivity;
use Illuminate\Http\Request;

class AcademicActivityController extends Controller
{
    public function index()
    {
        return response()->json(AcademicActivity::orderBy('start_date')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'year' => 'required|string',
            'semester' => 'required|string',
            'activity' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date'
        ]);

        $activity = AcademicActivity::create($validated);
        return response()->json($activity, 201);
    }

    public function update(Request $request, AcademicActivity $activity)
    {
        $validated = $request->validate([
            'year' => 'required|string',
            'semester' => 'required|string',
            'activity' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date'
        ]);

        $activity->update($validated);
        return response()->json($activity);
    }

    public function destroy(AcademicActivity $activity)
    {
        $activity->delete();
        return response()->json(null, 204);
    }
}
