<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Evenement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class EvenementController extends Controller
{
    // Types d'événements valides
    const TYPES_EVENEMENT = [
        'academique',
        'examen',
        'reunion',
        'autre'
    ];

    /**
     * Récupérer tous les événements
     */
    public function index()
    {
        try {
            $evenements = Evenement::orderBy('date', 'asc')->get();
            return response()->json($evenements);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des événements', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['message' => 'Erreur lors de la récupération des événements'], 500);
        }
    }

    /**
     * Créer un nouvel événement
     */
    public function store(Request $request)
    {
        Log::info('Tentative de création d\'un événement', [
            'données_reçues' => $request->all()
        ]);

        try {
            DB::beginTransaction();

            // Validation des données
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'date' => 'required|date',
                'event_type' => 'required|string|in:' . implode(',', self::TYPES_EVENEMENT),
                'status' => 'required|string|in:draft,upcoming,completed,cancelled',
                'description' => 'nullable|string',
                'study_levels' => 'required|array',
                'study_levels.*' => 'required|string|in:licence1,licence2,licence3,master1,master2'
            ]);

            if ($validator->fails()) {
                Log::warning('Validation échouée', [
                    'errors' => $validator->errors()->toArray(),
                    'données_reçues' => $request->all()
                ]);

                return response()->json([
                    'message' => 'Erreur de validation',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Création de l'événement
            $evenement = Evenement::create([
                'title' => $request->title,
                'date' => $request->date,
                'event_type' => $request->event_type,
                'status' => $request->status,
                'description' => $request->description,
                'study_levels' => $request->study_levels
            ]);

            DB::commit();

            Log::info('Événement créé avec succès', [
                'id' => $evenement->id,
                'données' => $evenement->toArray()
            ]);

            return response()->json($evenement, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Erreur lors de la création de l\'événement', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'données_reçues' => $request->all()
            ]);

            return response()->json([
                'message' => 'Erreur lors de la création de l\'événement',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Afficher un événement spécifique
     */
    public function show(Evenement $evenement)
    {
        return response()->json($evenement);
    }

    /**
     * Mettre à jour un événement
     */
    public function update(Request $request, Evenement $evenement)
    {
        Log::info('Tentative de mise à jour d\'un événement', [
            'id' => $evenement->id,
            'données_reçues' => $request->all()
        ]);

        try {
            DB::beginTransaction();

            // Validation des données
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'date' => 'required|date',
                'event_type' => 'required|string|in:' . implode(',', self::TYPES_EVENEMENT),
                'status' => 'required|string|in:draft,upcoming,completed,cancelled',
                'description' => 'nullable|string',
                'study_levels' => 'required|array',
                'study_levels.*' => 'required|string|in:licence1,licence2,licence3,master1,master2'
            ]);

            if ($validator->fails()) {
                Log::warning('Validation échouée pour la mise à jour', [
                    'errors' => $validator->errors()->toArray(),
                    'données_reçues' => $request->all()
                ]);

                return response()->json([
                    'message' => 'Erreur de validation',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Mise à jour de l'événement
            $evenement->update([
                'title' => $request->title,
                'date' => $request->date,
                'event_type' => $request->event_type,
                'status' => $request->status,
                'description' => $request->description,
                'study_levels' => $request->study_levels
            ]);

            DB::commit();

            Log::info('Événement mis à jour avec succès', [
                'id' => $evenement->id,
                'données' => $evenement->fresh()->toArray()
            ]);

            return response()->json($evenement);

        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Erreur lors de la mise à jour de l\'événement', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'données_reçues' => $request->all()
            ]);

            return response()->json([
                'message' => 'Erreur lors de la mise à jour de l\'événement',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer un événement
     */
    public function destroy(Evenement $evenement)
    {
        try {
            DB::beginTransaction();

            $id = $evenement->id;
            $evenement->delete();

            DB::commit();

            Log::info('Événement supprimé avec succès', ['id' => $id]);

            return response()->json(null, 204);

        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Erreur lors de la suppression de l\'événement', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'id' => $evenement->id
            ]);

            return response()->json([
                'message' => 'Erreur lors de la suppression de l\'événement',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
