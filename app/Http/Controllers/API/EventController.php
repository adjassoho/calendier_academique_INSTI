<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $query = Event::with(['category', 'department', 'creator']);

        // Filtrage par catégorie
        if ($request->has('categories')) {
            $categories = explode(',', $request->categories);
            $query->whereIn('category_id', $categories);
        }

        // Filtrage par département
        if ($request->has('department')) {
            $query->where('department_id', $request->department);
        }

        // Filtrage par date
        if ($request->has('start') && $request->has('end')) {
            $query->whereBetween('start_date', [$request->start, $request->end]);
        }

        $events = $query->get();

        return response()->json($events);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'category_id' => 'required|exists:event_categories,id',
            'department_id' => 'nullable|exists:departments,id',
            'location' => 'nullable|string|max:255',
            'is_online' => 'boolean',
            'meeting_link' => 'nullable|url|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $event = Event::create(array_merge(
            $request->all(),
            ['created_by' => Auth::id()]
        ));

        return response()->json($event, 201);
    }

    public function show(Event $event)
    {
        $event->load(['category', 'department', 'creator']);
        return response()->json($event);
    }

    public function update(Request $request, Event $event)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'sometimes|required|date|after_or_equal:start_date',
            'category_id' => 'sometimes|required|exists:event_categories,id',
            'department_id' => 'nullable|exists:departments,id',
            'location' => 'nullable|string|max:255',
            'is_online' => 'boolean',
            'meeting_link' => 'nullable|url|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $event->update($request->all());

        return response()->json($event);
    }

    public function destroy(Event $event)
    {
        $event->delete();
        return response()->json(null, 204);
    }

    public function statistics()
    {
        $now = now();
        $weekEnd = $now->copy()->endOfWeek();
        $monthEnd = $now->copy()->endOfMonth();

        $stats = [
            'upcoming_events' => Event::whereBetween('start_date', [$now, $weekEnd])->count(),
            'exams_this_month' => Event::where('category_id', 2) // ID pour la catégorie Examens
                ->whereBetween('start_date', [$now, $monthEnd])
                ->count(),
            'online_courses_today' => Event::where('is_online', true)
                ->whereDate('start_date', $now)
                ->count(),
        ];

        return response()->json($stats);
    }

    public function getPublicEvents(Request $request)
    {
        $query = Event::with(['eventType', 'studyLevels']);

        // Filtrage par période
        $period = $request->get('period', 'all');
        $now = now();

        switch ($period) {
            case 'day':
                $query->whereDate('start_date', $now->format('Y-m-d'));
                break;
            case 'week':
                $query->whereBetween('start_date', [
                    $now->startOfWeek()->format('Y-m-d'),
                    $now->endOfWeek()->format('Y-m-d')
                ]);
                break;
            case 'month':
                $query->whereYear('start_date', $now->year)
                    ->whereMonth('start_date', $now->month);
                break;
        }

        $events = $query->orderBy('start_date', 'desc')
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'titre' => $event->title,
                    'date' => $event->start_date,
                    'type' => $event->eventType ? $event->eventType->name : 'Non défini',
                    'statut' => $this->getEventStatus($event),
                    'description' => $event->description,
                    'niveaux_etude' => $event->studyLevels->pluck('name')->toArray()
                ];
            });

        return response()->json($events);
    }

    private function getEventStatus($event)
    {
        $now = now();
        $startDate = Carbon::parse($event->start_date);
        $endDate = Carbon::parse($event->end_date);

        if ($event->is_cancelled) {
            return 'cancelled';
        } elseif ($endDate->isPast()) {
            return 'completed';
        } elseif ($startDate->isFuture()) {
            return 'upcoming';
        } else {
            return 'in_progress';
        }
    }
}
