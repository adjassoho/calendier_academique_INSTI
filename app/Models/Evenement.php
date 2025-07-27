<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evenement extends Model
{
    protected $fillable = [
        'title',
        'date',
        'event_type',
        'status',
        'description',
        'study_levels',
    ];

    protected $casts = [
        'date' => 'date',
        'study_levels' => 'array',
    ];

    // Les statuts possibles
    const STATUTS = [
        'draft' => 'Brouillon',
        'upcoming' => 'À venir',
        'completed' => 'Terminé',
        'cancelled' => 'Annulé',
    ];

    // Les niveaux d'étude possibles
    const NIVEAUX_ETUDE = [
        'licence1' => 'Licence 1',
        'licence2' => 'Licence 2',
        'licence3' => 'Licence 3',
        'master1' => 'Master 1',
        'master2' => 'Master 2',
    ];
}
