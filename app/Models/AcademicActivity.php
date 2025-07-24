<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AcademicActivity extends Model
{
    use HasFactory;

    protected $table = 'academic_activities';
    
    protected $fillable = [
        'year',
        'name',
        'semester',
        'start_date',
        'end_date',
        'status'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date'
    ];
}
