<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    /**
     * La table associée au modèle.
     *
     * @var string
     */
    protected $table = 'evenements';

    /**
     * Les attributs qui sont mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'title',
        'date',
        'event_type',
        'status',
        'description',
        'study_levels'
    ];

    /**
     * Les attributs qui doivent être convertis.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date' => 'date',
        'study_levels' => 'json'
    ];

    /**
     * Les règles de validation pour le modèle.
     *
     * @var array<string, string>
     */
    public static $rules = [
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'date' => 'required|date',
        'status' => 'required|in:pending,in_progress,completed',
        'event_type' => 'required|string',
        'study_levels' => 'required|array'
    ];
}