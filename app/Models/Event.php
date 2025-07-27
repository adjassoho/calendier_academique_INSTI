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
<<<<<<< HEAD
    protected $table = 'events';
=======
    protected $table = 'evenements';
>>>>>>> 4c5c8e56df12f646868f88773aff6d1548a2e97b

    /**
     * Les attributs qui sont mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'title',
<<<<<<< HEAD
        'description',
        'date',
        'status',
        'event_type',
=======
        'date',
        'event_type',
        'status',
        'description',
>>>>>>> 4c5c8e56df12f646868f88773aff6d1548a2e97b
        'study_levels'
    ];

    /**
     * Les attributs qui doivent être convertis.
     *
     * @var array<string, string>
     */
    protected $casts = [
<<<<<<< HEAD
        'date' => 'datetime:Y-m-d',
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
        'study_levels' => 'array'
=======
        'date' => 'date',
        'study_levels' => 'json'
>>>>>>> 4c5c8e56df12f646868f88773aff6d1548a2e97b
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