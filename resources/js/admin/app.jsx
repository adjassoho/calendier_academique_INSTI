import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AdminLayout from './components/layout/AdminLayout';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: [
            'Roboto',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                },
            },
        },
    },
});

function AdminApp() {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AdminLayout />
            </ThemeProvider>
        </Router>
    );
}

// Point d'entrée
const rootElement = document.getElementById('admin-root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <AdminApp />
        </React.StrictMode>
    );
}
