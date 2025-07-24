import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Link,
    Divider,
    IconButton,
    useTheme,
} from '@mui/material';
import { Facebook, YouTube, School } from '@mui/icons-material';

const Footer = () => {
    const theme = useTheme();
    const currentYear = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'primary.main',
                color: 'white',
                py: 6,
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)',
                    pointerEvents: 'none',
                }
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Logo et informations de contact */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <img 
                                src="/images/logo.png" 
                                alt="INSTI Logo" 
                                style={{ 
                                    width: 60, 
                                    height: 60, 
                                    marginRight: '1rem',
                                    background: 'white',
                                    borderRadius: '50%',
                                    padding: '5px'
                                }} 
                            />
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    INSTI
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    Lokossa, Agnivedji
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
                            (+229) 22 41 13 66
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                            instilokossa@gmail.com
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: 'italic', opacity: 0.8 }}>
                            "Science et technologie au service de l'homme"
                        </Typography>
                    </Grid>

                    {/* Nos Ressources */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            NOS RESSOURCES
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {[
                                'Incubateur de startups',
                                'Unité d\'application de l\'INSTI',
                                'Plateforme E-learning',
                                'Blog officiel de l\'INSTI'
                            ].map((item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    sx={{
                                        color: 'white',
                                        opacity: 0.8,
                                        textDecoration: 'none',
                                        '&:hover': {
                                            opacity: 1,
                                            textDecoration: 'underline'
                                        }
                                    }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </Box>
                    </Grid>

                    {/* Liens Utiles */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            LIENS UTILES
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {[
                                'Ministère de l\'Enseignement Supérieur et de la Recherche Scientifique',
                                'Université Nationale des Sciences, Technologies, Ingénieurie et Mathématiques',
                                'Institut National Supérieur de Technologie Industrielle'
                            ].map((item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    sx={{
                                        color: 'white',
                                        opacity: 0.8,
                                        textDecoration: 'none',
                                        '&:hover': {
                                            opacity: 1,
                                            textDecoration: 'underline'
                                        }
                                    }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        INSTI, UNSTIM {currentYear} - Réalisé par le groupe (OLOUKPEDE, BOSSA, TANGNI, GBECHI, ADE)
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton 
                            href="#" 
                            sx={{ 
                                color: 'white',
                                '&:hover': { 
                                    bgcolor: 'rgba(255,255,255,0.1)' 
                                }
                            }}
                        >
                            <Facebook />
                        </IconButton>
                        <IconButton 
                            href="#" 
                            sx={{ 
                                color: 'white',
                                '&:hover': { 
                                    bgcolor: 'rgba(255,255,255,0.1)' 
                                }
                            }}
                        >
                            <YouTube />
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
