import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import Home from './components/pages/Home';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CalendarAdmin from '../views/wadmin/CalendarAdmin';

// Création du thème personnalisé
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
        },
        secondary: {
            main: '#9c27b0',
            light: '#ba68c8',
            dark: '#7b1fa2',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 600,
        },
        h3: {
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* Autres routes ici */}
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </ThemeProvider>
    );
};

// Montage de l'application principale
const appContainer = document.getElementById('app');
if (appContainer) {
    const root = createRoot(appContainer);
    root.render(<App />);
}

// Montage du composant CalendarAdmin (si l'élément existe)
const calendarAdminContainer = document.getElementById('calendar-admin');
if (calendarAdminContainer) {
    const root = createRoot(calendarAdminContainer);
    root.render(<CalendarAdmin />);
}