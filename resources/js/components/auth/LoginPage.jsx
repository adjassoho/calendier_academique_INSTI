import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Container,
    Alert,
    IconButton,
    InputAdornment,
    CircularProgress,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Lock as LockIcon,
} from '@mui/icons-material';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authService.login(formData);
            navigate('/admin');
        } catch (err) {
            setError(err.message || 'Une erreur est survenue lors de la connexion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                backgroundImage: 'linear-gradient(rgba(0, 74, 173, 0.1), rgba(0, 74, 173, 0.1))',
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/* Logo et Titre */}
                    <Box sx={{ mb: 3, textAlign: 'center' }}>
                        <img
                            src="/images/unstim-logo.png"
                            alt="INSTI Logo"
                            style={{ height: '80px', marginBottom: '16px' }}
                        />
                        <Typography component="h1" variant="h5" fontWeight="bold" color="primary">
                            Administration INSTI
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Connectez-vous pour accéder à votre espace
                        </Typography>
                    </Box>

                    {/* Formulaire */}
                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Adresse email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            disabled={loading}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 3 }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LockIcon />}
                            sx={{
                                py: 1.5,
                                backgroundColor: '#004AAD',
                                '&:hover': {
                                    backgroundColor: '#003380',
                                },
                            }}
                        >
                            {loading ? 'Connexion en cours...' : 'Se connecter'}
                        </Button>
                    </Box>
                </Paper>

                {/* Copyright */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ mt: 3 }}
                >
                    &copy; INSTI, UNSTIM {new Date().getFullYear()}
                </Typography>
            </Container>
        </Box>
    );
};

export default LoginPage;
