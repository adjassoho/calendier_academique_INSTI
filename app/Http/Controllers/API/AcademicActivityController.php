<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\AcademicActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AcademicActivityController extends Controller
{
    public function index()
    {
        try {
            $activities = AcademicActivity::orderBy('created_at', 'desc')->get();
            return response()->json(['data' => $activities]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des activités : ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la récupération des activités'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'year' => 'required|string|max:255',
                'name' => 'required|string|max:255',
                'semester' => 'required|in:Semestre 1,Semestre 2',
                'start_date' => 'required|date',
                'end_date' => 'required|date|after_or_equal:start_date',
                'status' => 'required|in:à venir,en cours,terminé'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'error' => 'Validation échouée',
                    'messages' => $validator->errors()
                ], 422);
            }

            $activity = AcademicActivity::create($request->all());
            return response()->json(['data' => $activity], 201);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la création : ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la création de l\'activité'], 500);
        }
    }

    public function show($id)
    {
        try {
            $activity = AcademicActivity::findOrFail($id);
            return response()->json(['data' => $activity]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération : ' . $e->getMessage());
            return response()->json(['error' => 'Activité non trouvée'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $activity = AcademicActivity::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'year' => 'sometimes|required|string|max:255',
                'name' => 'sometimes|required|string|max:255',
                'semester' => 'sometimes|required|in:Semestre 1,Semestre 2',
                'start_date' => 'sometimes|required|date',
                'end_date' => 'sometimes|required|date|after_or_equal:start_date',
                'status' => 'sometimes|required|in:à venir,en cours,terminé'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'error' => 'Validation échouée',
                    'messages' => $validator->errors()
                ], 422);
            }

            $activity->update($request->all());
            return response()->json(['data' => $activity]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la mise à jour : ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la mise à jour'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $activity = AcademicActivity::findOrFail($id);
            $activity->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la suppression : ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la suppression'], 500);
        }
    }

    public function stats()
    {
        try {
            $stats = [
                'total' => AcademicActivity::count(),
                'upcoming' => AcademicActivity::where('start_date', '>', now())->count(),
                'years' => AcademicActivity::distinct('year')->count('year'),
                'completion' => AcademicActivity::where('status', 'terminé')->count()
            ];

            return response()->json(['data' => $stats]);
        } catch (\Exception $e) {
            Log::error('Erreur lors du calcul des stats : ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors du calcul des statistiques'], 500);
        }
    }
}
