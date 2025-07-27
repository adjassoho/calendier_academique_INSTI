<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\EventCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = EventCategory::withCount('events')->get();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:event_categories,name',
            'color' => 'required|string|size:7|regex:/^#[0-9A-F]{6}$/i',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $category = EventCategory::create($request->all());
        return response()->json($category, 201);
    }

    public function show(EventCategory $category)
    {
        $category->load('events');
        return response()->json($category);
    }

    public function update(Request $request, EventCategory $category)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255|unique:event_categories,name,' . $category->id,
            'color' => 'sometimes|required|string|size:7|regex:/^#[0-9A-F]{6}$/i',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $category->update($request->all());
        return response()->json($category);
    }

    public function destroy(EventCategory $category)
    {
        // Vérifier si la catégorie a des événements
        if ($category->events()->count() > 0) {
            return response()->json([
                'message' => 'Impossible de supprimer cette catégorie car elle contient des événements'
            ], 409);
        }

        $category->delete();
        return response()->json(null, 204);
    }
}
