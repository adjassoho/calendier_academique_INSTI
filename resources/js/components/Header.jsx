import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    IconButton,
    useTheme,
    Container,
} from '@mui/material';
import {
    Person as PersonIcon,
    Notifications as NotificationsIcon,
    Assessment as AssessmentIcon,
    Email as EmailIcon,
} from '@mui/icons-material';

const Header = () => {
    const theme = useTheme();

    return (
        <AppBar 
            position="fixed" 
            sx={{ 
                zIndex: theme.zIndex.drawer + 1,
                backgroundColor: '#004AAD', // Couleur bleue INSTI
                boxShadow: 'none',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ minHeight: '64px' }}>
                    {/* Logo et Titre */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <img 
                            src="/images/unstim-logo.png" 
                            alt="UNSTIM Logo" 
                            style={{ 
                                height: '40px',
                                marginRight: '16px'
                            }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            Institut National Supérieur de Technologie Industrielle de Lokossa
                        </Typography>
                    </Box>

                    {/* Boutons de droite */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            startIcon={<PersonIcon />}
                            sx={{
                                color: 'white',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            Accès rapide
                        </Button>

                        <Button
                            startIcon={<AssessmentIcon />}
                            sx={{
                                color: 'white',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            Observatoire
                        </Button>

                        <Button
                            startIcon={<EmailIcon />}
                            sx={{
                                color: 'white',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            Nous écrire
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
