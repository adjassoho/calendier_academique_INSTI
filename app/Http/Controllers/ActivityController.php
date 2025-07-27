<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ActivityController extends Controller
{
    public function index()
    {
        $activities = Activity::orderBy('start_date', 'asc')->get();
        return response()->json($activities);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'year' => 'required|string',
            'name' => 'required|string',
            'semester' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:à venir,en cours,terminé',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $activity = Activity::create($request->all());
        return response()->json($activity, 201);
    }

    public function show($id)
    {
        $activity = Activity::findOrFail($id);
        return response()->json($activity);
    }

    public function update(Request $request, $id)
    {
        $activity = Activity::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'year' => 'required|string',
            'name' => 'required|string',
            'semester' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:à venir,en cours,terminé',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $activity->update($request->all());
        return response()->json($activity);
    }

    public function destroy($id)
    {
        $activity = Activity::findOrFail($id);
        $activity->delete();
        return response()->json(null, 204);
    }

    public function stats()
    {
        $total = Activity::count();
        $upcoming = Activity::where('start_date', '>', now())->count();
        $years = Activity::distinct('year')->count('year');
        $completed = Activity::where('status', 'terminé')->count();
        $completion = $total > 0 ? round(($completed / $total) * 100) : 0;

        return response()->json([
            'total' => $total,
            'upcoming' => $upcoming,
            'years' => $years,
            'completion' => $completion
        ]);
    }
}
