import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Calendar from './Calendar';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';

const App = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');

    const theme = createTheme({
        palette: {
            primary: {
                main: '#004AAD', // Couleur bleue INSTI
                light: '#3373BC',
                dark: '#003380',
            },
            secondary: {
                main: '#FF9800',
                light: '#FFB74D',
                dark: '#F57C00',
            },
            background: {
                default: '#F5F5F5',
                paper: '#FFFFFF',
            },
        },
        typography: {
            fontFamily: '"Roboto", "Arial", sans-serif',
            h1: { fontWeight: 700 },
            h2: { fontWeight: 600 },
            h3: { fontWeight: 600 },
            h4: { fontWeight: 600 },
            h5: { fontWeight: 600 },
            h6: { fontWeight: 600 },
        },
        shape: {
            borderRadius: 8,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        fontWeight: 500,
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                    },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        width: 280,
                        backgroundColor: '#FFFFFF',
                        borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                    },
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <CssBaseline />
                <Header />
                <Box 
                    sx={{ 
                        display: 'flex', 
                        flexGrow: 1,
                        pt: '64px', // Hauteur du header
                        backgroundColor: theme.palette.background.default,
                    }}
                >
                    <Sidebar 
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        selectedDepartment={selectedDepartment}
                        setSelectedDepartment={setSelectedDepartment}
                    />
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            p: 3,
                            width: { sm: `calc(100% - 280px)` },
                            ml: { sm: '280px' },
                            overflow: 'auto',
                        }}
                    >
                        <HomePage />
                    </Box>
                </Box>
                <Footer />
            </Box>
        </ThemeProvider>
    );
};

export default App;
