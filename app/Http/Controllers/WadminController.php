<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;

class WadminController extends Controller
{
    /**
     * Affiche la page d'accueil de l'admin
     */
    public function index()
    {
        if (View::exists('wadmin.index')) {
            return view('wadmin.index');
        }
        return view('wadmin.dashboard'); // Fallback si index n'existe pas
    }

    /**
     * Affiche le tableau de bord
     */
    public function dashboard()
    {
        if (View::exists('wadmin.dashboard')) {
            return view('wadmin.dashboard');
        }
        return view('wadmin.index'); // Fallback si dashboard n'existe pas
    }
}
