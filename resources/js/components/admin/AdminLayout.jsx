import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import Dashboard from './Dashboard';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            
            {/* Barre de navigation */}
            <AdminNavbar onToggleSidebar={toggleSidebar} />
            
            {/* Barre latérale */}
            <AdminSidebar open={sidebarOpen} />
            
            {/* Contenu principal */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${sidebarOpen ? 240 : 64}px)` },
                    ml: { sm: `${sidebarOpen ? 240 : 64}px` },
                    mt: '64px', // Hauteur de la barre de navigation
                    transition: 'margin-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
                    backgroundColor: (theme) => theme.palette.background.default,
                }}
            >
                <Dashboard />
            </Box>
        </Box>
    );
};

export default AdminLayout;
