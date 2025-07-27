import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Button,
    Box,
} from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar 
            position="sticky" 
            elevation={0}
            sx={{
                backgroundColor: 'white',
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ height: 64 }}>
                    <RouterLink 
                        to="/" 
                        style={{ 
                            textDecoration: 'none',
                            color: 'inherit',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <CalendarMonth 
                            sx={{ 
                                display: 'flex',
                                mr: 1,
                                color: 'primary.main'
                            }} 
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                fontWeight: 700,
                                color: 'primary.main',
                                textDecoration: 'none',
                            }}
                        >
                            Calendrier Académique
                        </Typography>
                    </RouterLink>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            component={RouterLink}
                            to="/"
                            color="inherit"
                            sx={{ color: 'text.primary' }}
                        >
                            Accueil
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
