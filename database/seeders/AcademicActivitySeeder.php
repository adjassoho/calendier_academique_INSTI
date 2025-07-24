<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AcademicActivity;

class AcademicActivitySeeder extends Seeder
{
    public function run(): void
    {
        $activities = [
            [
                'year' => '1ère année',
                'semester' => 'Semestre 1',
                'activity' => 'Rentrée académique',
                'start_date' => '2025-01-15',
                'end_date' => '2025-01-15'
            ],
            [
                'year' => '1ère année',
                'semester' => 'Semestre 1',
                'activity' => 'Harmonisation des emplois du temps',
                'start_date' => '2025-01-16',
                'end_date' => '2025-01-16'
            ],
            [
                'year' => '1ère année',
                'semester' => 'Semestre 1',
                'activity' => 'Début des cours',
                'start_date' => '2025-01-20',
                'end_date' => '2025-01-20'
            ],
            [
                'year' => '1ère année',
                'semester' => 'Semestre 1',
                'activity' => 'Évaluations continues',
                'start_date' => '2025-03-01',
                'end_date' => '2025-03-15'
            ],
            [
                'year' => '1ère année',
                'semester' => 'Semestre 1',
                'activity' => 'Examens de fin de semestre',
                'start_date' => '2025-05-15',
                'end_date' => '2025-05-30'
            ],
            [
                'year' => '1ère année',
                'semester' => 'Semestre 2',
                'activity' => 'Début des cours',
                'start_date' => '2025-06-15',
                'end_date' => '2025-06-15'
            ],
            [
                'year' => '2e année',
                'semester' => 'Semestre 3',
                'activity' => 'Rentrée académique',
                'start_date' => '2025-01-15',
                'end_date' => '2025-01-15'
            ],
            [
                'year' => '2e année',
                'semester' => 'Semestre 3',
                'activity' => 'Début des stages',
                'start_date' => '2025-03-01',
                'end_date' => '2025-04-30'
            ],
            [
                'year' => '3e année',
                'semester' => 'Semestre 5',
                'activity' => 'Soutenance de mémoire',
                'start_date' => '2025-06-01',
                'end_date' => '2025-06-15'
            ],
        ];

        foreach ($activities as $activity) {
            AcademicActivity::create($activity);
        }
    }
}
