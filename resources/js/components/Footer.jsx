import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Link,
    IconButton,
    useTheme,
} from '@mui/material';
import { Facebook, YouTube } from '@mui/icons-material';

const Footer = () => {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#004AAD',
                color: 'white',
                py: 4,
                mt: 'auto',
            }}
        >
            <Container maxWidth="xl">
                <Grid container spacing={4}>
                    {/* Section Logo et Informations */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
                            <img 
                                src="/images/unstim-logo.png" 
                                alt="UNSTIM Logo" 
                                style={{ 
                                    width: '120px',
                                    marginBottom: '16px'
                                }}
                            />
                            <Typography>Lokossa, Agnivedji</Typography>
                            <Typography>(+229) 22 41 13 66</Typography>
                            <Typography sx={{ fontStyle: 'italic', my: 1 }}>
                                "Science et technologie au service de l'homme"
                            </Typography>
                            <Typography>instilokossa@gmail.com</Typography>
                            
                            {/* Réseaux sociaux */}
                            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                <IconButton 
                                    href="#" 
                                    aria-label="Facebook"
                                    sx={{ 
                                        color: 'white',
                                        '&:hover': { 
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        },
                                    }}
                                >
                                    <Facebook />
                                </IconButton>
                                <IconButton 
                                    href="#" 
                                    aria-label="YouTube"
                                    sx={{ 
                                        color: 'white',
                                        '&:hover': { 
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        },
                                    }}
                                >
                                    <YouTube />
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Section Ressources */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            NOS RESSOURCES
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                • Incubateur de startups
                            </Link>
                            <Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                • Unité d'application de l'INSTI
                            </Link>
                            <Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                • Plateforme E-learning
                            </Link>
                            <Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                • Blog officiel de l'INSTI
                            </Link>
                        </Box>
                    </Grid>

                    {/* Section Liens Utiles */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            LIENS UTILES
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                • Ministère de l'Enseignement Supérieur et de la Recherche Scientifique
                            </Link>
                            <Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                • Université Nationale des Sciences, Technologies, Ingénieurie et Mathématiques
                            </Link>
                            <Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                • Institut National Supérieur de Technologie Industrielle
                            </Link>
                        </Box>
                    </Grid>
                </Grid>

                {/* Copyright */}
                <Typography 
                    variant="body2" 
                    align="center"
                    sx={{ 
                        mt: 4,
                        pt: 2,
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        opacity: 0.8,
                    }}
                >
                    &copy; INSTI, UNSTIM 2024 - Réalisé par le groupe (OLOUKPEDE, BOSSA, TANGNI, GBECHI, ADE)
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
