import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './components/App';
import AdminLayout from './components/admin/AdminLayout';
import LoginPage from './components/auth/LoginPage';

const AppRoutes = () => {
    // Ici vous pourrez ajouter une logique pour vérifier si l'utilisateur est connecté
    const isAuthenticated = false; // À remplacer par votre logique d'authentification

    return (
        <BrowserRouter>
            <Routes>
                {/* Route publique */}
                <Route path="/" element={<App />} />
                
                {/* Route de connexion */}
                <Route path="/login" element={<LoginPage />} />

                {/* Routes protégées de l'administration */}
                <Route
                    path="/admin/*"
                    element={
                        isAuthenticated ? (
                            <AdminLayout />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
