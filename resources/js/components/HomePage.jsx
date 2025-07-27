import React from 'react';
import { 
    Container, 
    Grid, 
    Paper, 
    Typography, 
    Box, 
    Button,
    Card,
    CardContent,
    IconButton,
    Fade,
    useTheme
} from '@mui/material';
import { 
    CalendarMonth,
    School,
    OnlinePrediction,
    Add as AddIcon,
    FileDownload,
    Sync,
    FilterList
} from '@mui/icons-material';
import Calendar from './Calendar';

const StatCard = ({ icon, title, value, subtitle, color }) => {
    const theme = useTheme();
    
    return (
        <Card 
            sx={{ 
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[8],
                },
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    backgroundColor: color,
                    opacity: 0.1,
                }}
            />
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton
                        sx={{
                            backgroundColor: color,
                            color: 'white',
                            '&:hover': { backgroundColor: color },
                            mr: 2
                        }}
                    >
                        {icon}
                    </IconButton>
                    <Typography variant="h6" color="text.secondary">
                        {title}
                    </Typography>
                </Box>
                <Typography variant="h3" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {value}
                </Typography>
                <Typography color="text.secondary">
                    {subtitle}
                </Typography>
            </CardContent>
        </Card>
    );
};

const ActionButton = ({ icon, label, variant = "contained", color = "primary", onClick }) => (
    <Button
        variant={variant}
        color={color}
        startIcon={icon}
        onClick={onClick}
        sx={{
            borderRadius: 2,
            py: 1.5,
            px: 3,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: variant === 'contained' ? 4 : 0,
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: variant === 'contained' ? 6 : 1,
            },
            transition: 'transform 0.2s, box-shadow 0.2s',
        }}
    >
        {label}
    </Button>
);

const FilterChip = ({ label, color = "primary", onClick, active }) => (
    <Button
        variant={active ? "contained" : "outlined"}
        color={color}
        onClick={onClick}
        sx={{
            borderRadius: 5,
            px: 3,
            py: 1,
            textTransform: 'none',
            fontWeight: 500,
            transition: 'all 0.2s',
            '&:hover': {
                transform: 'translateY(-2px)',
            },
        }}
    >
        {label}
    </Button>
);

const HomePage = () => {
    const theme = useTheme();

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Fade in timeout={1000}>
                <Grid container spacing={3}>
                    {/* En-tête de la page */}
                    <Grid item xs={12}>
                        <Paper
                            sx={{
                                p: 4,
                                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                color: 'white',
                                borderRadius: 3,
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    width: '30%',
                                    height: '100%',
                                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1))',
                                }}
                            />
                            <Typography variant="h3" gutterBottom fontWeight="bold">
                                Calendrier Académique INSTI
                            </Typography>
                            <Typography variant="h6" sx={{ opacity: 0.9 }}>
                                Gérez et consultez tous les événements académiques de l'Institut
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Statistiques */}
                    <Grid item xs={12} md={4}>
                        <StatCard
                            icon={<CalendarMonth />}
                            title="Événements à venir"
                            value="24"
                            subtitle="Cette semaine"
                            color={theme.palette.primary.main}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StatCard
                            icon={<School />}
                            title="Examens"
                            value="12"
                            subtitle="Ce mois"
                            color={theme.palette.error.main}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StatCard
                            icon={<OnlinePrediction />}
                            title="Cours en ligne"
                            value="8"
                            subtitle="Aujourd'hui"
                            color={theme.palette.success.main}
                        />
                    </Grid>

                    {/* Calendrier principal */}
                    <Grid item xs={12}>
                        <Paper 
                            sx={{ 
                                p: 3, 
                                borderRadius: 3,
                                boxShadow: theme.shadows[3],
                                '&:hover': {
                                    boxShadow: theme.shadows[6],
                                },
                                transition: 'box-shadow 0.3s'
                            }}
                        >
                            <Calendar />
                        </Paper>
                    </Grid>

                    {/* Actions rapides */}
                    <Grid item xs={12} md={6}>
                        <Paper 
                            sx={{ 
                                p: 3, 
                                borderRadius: 3,
                                background: theme.palette.background.paper,
                            }}
                        >
                            <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
                                Actions rapides
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <ActionButton 
                                    icon={<AddIcon />} 
                                    label="Nouvel événement" 
                                    color="primary"
                                />
                                <ActionButton 
                                    icon={<FileDownload />} 
                                    label="Exporter" 
                                    variant="outlined"
                                />
                                <ActionButton 
                                    icon={<Sync />} 
                                    label="Synchroniser" 
                                    variant="outlined"
                                />
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Filtres rapides */}
                    <Grid item xs={12} md={6}>
                        <Paper 
                            sx={{ 
                                p: 3, 
                                borderRadius: 3,
                                background: theme.palette.background.paper,
                            }}
                        >
                            <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
                                Filtres rapides
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <FilterChip label="Tous les événements" active />
                                <FilterChip label="Examens" color="error" />
                                <FilterChip label="Cours" color="success" />
                                <FilterChip label="Activités" color="warning" />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Fade>
        </Container>
    );
};

export default HomePage;
