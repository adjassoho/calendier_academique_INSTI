<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::orderBy('date', 'desc')->get();
        
        return response()->json([
            'status' => 'success',
            'data' => $events->map(function ($event) {
                // Convertir les statuts de la base de données en statuts attendus par le frontend
                $statusMapping = [
                    'draft' => 'draft',
                    'completed' => 'completed',
                    'cancelled' => 'cancelled',
                    'upcoming' => 'upcoming',
                    // Ajoutez d'autres mappings si nécessaire
                ];

                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'description' => $event->description,
                    'date' => $event->date->format('Y-m-d'),
                    'event_type' => $event->event_type,
                    'status' => $statusMapping[$event->status] ?? $event->status,
                    'study_levels' => $event->study_levels,
                    'created_at' => $event->created_at,
                    'updated_at' => $event->updated_at
                ];
            })
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'status' => 'required|in:pending,in_progress,completed'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $event = Event::create($request->all());
        return response()->json($event, 201);
    }

    public function update(Request $request, Event $event)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'status' => 'required|in:pending,in_progress,completed'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $event->update($request->all());
        return response()->json($event);
    }

    public function destroy(Event $event)
    {
        $event->delete();
        return response()->json(null, 204);
    }

    public function getPublicEvents()
    {
        try {
            $events = Event::orderBy('date', 'desc')->get();
            
            return response()->json([
                'status' => 'success',
                'data' => $events->map(function ($event) {
                    return [
                        'id' => $event->id,
                        'title' => $event->title,
                        'description' => $event->description,
                        'date' => $event->date,
                        'event_type' => $event->event_type,
                        'status' => $event->status,
                        'study_levels' => $event->study_levels,
                        'created_at' => $event->created_at,
                        'updated_at' => $event->updated_at
                    ];
                })
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors de la récupération des événements',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}