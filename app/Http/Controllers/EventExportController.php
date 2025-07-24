<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use TCPDF;

class EventExportController extends Controller
{
    public function exportPDF(Request $request)
    {
        $events = $request->input('events');

        // Création du PDF
        $pdf = new TCPDF('L', 'mm', 'A4', true, 'UTF-8');
        
        // Configuration du document
        $pdf->SetCreator('Insti Calendar');
        $pdf->SetAuthor('Insti Calendar');
        $pdf->SetTitle('Calendrier Académique');

        // Suppression des en-têtes et pieds de page par défaut
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);

        // Ajout d'une page
        $pdf->AddPage();

        // Configuration de la police
        $pdf->SetFont('helvetica', '', 10);

        // En-tête du document
        $pdf->SetFont('helvetica', 'B', 16);
        $pdf->Cell(0, 10, 'Calendrier Académique', 0, 1, 'C');
        $pdf->SetFont('helvetica', '', 10);
        $pdf->Ln(5);

        // En-têtes des colonnes
        $headers = ['Titre', 'Type', 'Date', 'Description', 'Niveaux d\'études', 'Statut'];
        $widths = [50, 30, 25, 70, 50, 30]; // Largeurs des colonnes

        // Style pour les en-têtes
        $pdf->SetFillColor(25, 118, 210); // Couleur de fond #1976d2
        $pdf->SetTextColor(255, 255, 255); // Texte blanc
        $pdf->SetFont('helvetica', 'B', 10);

        // Dessiner les en-têtes
        foreach ($headers as $index => $header) {
            $pdf->Cell($widths[$index], 10, $header, 1, 0, 'C', true);
        }
        $pdf->Ln();

        // Style pour les données
        $pdf->SetFillColor(255, 255, 255);
        $pdf->SetTextColor(0, 0, 0);
        $pdf->SetFont('helvetica', '', 9);

        // Données
        foreach ($events as $event) {
            // Calcul de la hauteur maximale nécessaire pour cette ligne
            $heights = [];
            
            // Description (peut être longue)
            $heights[] = $pdf->getStringHeight($widths[3], $event['description']);
            
            // Niveaux d'études
            $studyLevels = is_array($event['study_levels']) 
                ? implode(', ', $event['study_levels'])
                : (is_object($event['study_levels']) 
                    ? implode(', ', (array)$event['study_levels'])
                    : $event['study_levels']);
            $heights[] = $pdf->getStringHeight($widths[4], $studyLevels);
            
            // Hauteur maximale pour cette ligne
            $maxHeight = max(max($heights), 8); // minimum 8mm

            // Position Y avant d'écrire la ligne
            $startY = $pdf->GetY();

            // Vérifier si on a besoin d'une nouvelle page
            if ($startY + $maxHeight > $pdf->getPageHeight() - 20) {
                $pdf->AddPage();
                $startY = $pdf->GetY();
            }

            // Écriture des cellules avec la même hauteur
            $pdf->MultiCell($widths[0], $maxHeight, $event['title'], 1, 'L', false, 0);
            $pdf->MultiCell($widths[1], $maxHeight, $event['event_type'], 1, 'L', false, 0);
            $pdf->MultiCell($widths[2], $maxHeight, date('d/m/Y', strtotime($event['date'])), 1, 'C', false, 0);
            $pdf->MultiCell($widths[3], $maxHeight, $event['description'], 1, 'L', false, 0);
            $pdf->MultiCell($widths[4], $maxHeight, $studyLevels, 1, 'L', false, 0);
            $pdf->MultiCell($widths[5], $maxHeight, $this->getStatusLabel($event['status']), 1, 'C', false, 1);
        }

        // Envoi du PDF
        return response($pdf->Output('', 'S'), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="calendrier_academique_' . date('d-m-Y') . '.pdf"',
        ]);
    }

    private function getStatusLabel($status)
    {
        $labels = [
            'draft' => 'Brouillon',
            'completed' => 'Terminé',
            'cancelled' => 'Annulé',
            'upcoming' => 'À venir',
        ];

        return $labels[strtolower($status)] ?? $status;
    }
} 