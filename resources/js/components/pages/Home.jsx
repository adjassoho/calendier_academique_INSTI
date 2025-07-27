import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Chip,
    useTheme,
    Fade,
    Card,
    CardContent,
    Grid,
    CircularProgress,
    ToggleButtonGroup,
    ToggleButton,
} from '@mui/material';
import { 
    CalendarMonth, 
    School, 
    Event, 
    DateRange, 
    AccessTime,
    Today,
    ViewWeek,
    CalendarViewMonth,
    CalendarToday
} from '@mui/icons-material';

const getStatusColor = (status) => {
    switch (status) {
        case 'upcoming':
            return { bg: '#e3f2fd', color: '#1976d2', label: 'À venir' };
        case 'completed':
            return { bg: '#e8f5e9', color: '#2e7d32', label: 'Terminé' };
        case 'cancelled':
            return { bg: '#ffebee', color: '#c62828', label: 'Annulé' };
        case 'in_progress':
            return { bg: '#fff3e0', color: '#e65100', label: 'En cours' };
        default:
            return { bg: '#f5f5f5', color: '#757575', label: 'Non défini' };
    }
};

const StatCard = ({ icon: Icon, title, value, delay }) => (
    <Fade in timeout={1000} style={{ transitionDelay: `${delay}ms` }}>
        <Card 
            elevation={0}
            sx={{ 
                height: '100%',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white'
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Icon sx={{ fontSize: 32, opacity: 0.9 }} />
                    <Typography variant="h6" sx={{ ml: 1, fontWeight: 500 }}>
                        {title}
                    </Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {value}
                </Typography>
            </CardContent>
        </Card>
    </Fade>
);

const Home = () => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [mounted, setMounted] = useState(false);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState('all');
    const [stats, setStats] = useState({
        upcoming: 0,
        thisWeek: 0,
        total: 0
    });

    useEffect(() => {
        setMounted(true);
        fetchEvents();
    }, [period]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/events/public?period=${period}`);
            setEvents(response.data);
            
            // Calculer les statistiques
            const now = new Date();
            const weekEnd = new Date();
            weekEnd.setDate(weekEnd.getDate() + 7);
            
            const stats = {
                upcoming: response.data.filter(e => e.statut === 'upcoming').length,
                thisWeek: response.data.filter(e => {
                    const eventDate = new Date(e.date);
                    return eventDate >= now && eventDate <= weekEnd;
                }).length,
                total: response.data.length
            };
            
            setStats(stats);
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des événements:', error);
            setLoading(false);
        }
    };

    const handlePeriodChange = (event, newPeriod) => {
        if (newPeriod !== null) {
            setPeriod(newPeriod);
            setPage(0);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getPeriodLabel = () => {
        switch (period) {
            case 'day':
                return "Aujourd'hui";
            case 'week':
                return 'Cette semaine';
            case 'month':
                return 'Ce mois';
            default:
                return 'Tous les événements';
        }
    };

    return (
        <Box sx={{ 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Hero Section avec fond dégradé et animation */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
                    color: 'white',
                    py: 8,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 20% 150%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)',
                    }
                }}
            >
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Fade in timeout={1000}>
                        <Typography
                            variant="h2"
                            component="h1"
                            gutterBottom
                            sx={{
                                fontWeight: 700,
                                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2
                            }}
                        >
                            <CalendarMonth sx={{ fontSize: 45 }} />
                            Calendrier Académique
                        </Typography>
                    </Fade>

                    <Fade in timeout={1000} style={{ transitionDelay: '200ms' }}>
                        <Typography
                            variant="h5"
                            sx={{
                                maxWidth: 600,
                                opacity: 0.9,
                                mb: 6,
                                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                            }}
                        >
                            Restez informé des événements et activités académiques à venir
                        </Typography>
                    </Fade>

                    {/* Statistiques */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4}>
                            <StatCard
                                icon={Event}
                                title="Événements à venir"
                                value={stats.upcoming}
                                delay={400}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <StatCard
                                icon={DateRange}
                                title="Cette semaine"
                                value={stats.thisWeek}
                                delay={600}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <StatCard
                                icon={AccessTime}
                                title="Total événements"
                                value={stats.total}
                                delay={800}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Main Content */}
            <Container 
                maxWidth="lg" 
                sx={{ 
                    flex: 1, 
                    my: 6,
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.6s ease-out'
                }}
            >
                {/* Filtres */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        {getPeriodLabel()}
                    </Typography>
                    <Paper 
                        elevation={0}
                        sx={{ 
                            p: 1, 
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <ToggleButtonGroup
                            value={period}
                            exclusive
                            onChange={handlePeriodChange}
                            aria-label="Filtrer par période"
                            sx={{
                                '& .MuiToggleButton-root': {
                                    px: 3,
                                    py: 1,
                                    '&.Mui-selected': {
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'primary.dark',
                                        },
                                    },
                                },
                            }}
                        >
                            <ToggleButton value="all" aria-label="tous">
                                <CalendarToday sx={{ mr: 1 }} />
                                Tous
                            </ToggleButton>
                            <ToggleButton value="day" aria-label="jour">
                                <Today sx={{ mr: 1 }} />
                                Jour
                            </ToggleButton>
                            <ToggleButton value="week" aria-label="semaine">
                                <ViewWeek sx={{ mr: 1 }} />
                                Semaine
                            </ToggleButton>
                            <ToggleButton value="month" aria-label="mois">
                                <CalendarViewMonth sx={{ mr: 1 }} />
                                Mois
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Paper>
                </Box>

                {/* Table des événements */}
                <Paper 
                    elevation={0}
                    sx={{ 
                        borderRadius: 2,
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: 'divider',
                        background: '#ffffff',
                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                        }
                    }}
                >
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : events.length === 0 ? (
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column',
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            p: 4,
                            textAlign: 'center'
                        }}>
                            <CalendarMonth sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                            <Typography variant="h6" color="text.secondary">
                                Aucun événement trouvé pour cette période
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Essayez de sélectionner une autre période
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            <TableContainer>
                                <Table sx={{ minWidth: 650 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell 
                                                sx={{ 
                                                    fontWeight: 'bold',
                                                    backgroundColor: theme.palette.grey[50]
                                                }}
                                            >
                                                Événement
                                            </TableCell>
                                            <TableCell 
                                                sx={{ 
                                                    fontWeight: 'bold',
                                                    backgroundColor: theme.palette.grey[50]
                                                }}
                                            >
                                                Date
                                            </TableCell>
                                            <TableCell 
                                                sx={{ 
                                                    fontWeight: 'bold',
                                                    backgroundColor: theme.palette.grey[50]
                                                }}
                                            >
                                                Type
                                            </TableCell>
                                            <TableCell 
                                                sx={{ 
                                                    fontWeight: 'bold',
                                                    backgroundColor: theme.palette.grey[50]
                                                }}
                                            >
                                                Statut
                                            </TableCell>
                                            <TableCell 
                                                sx={{ 
                                                    fontWeight: 'bold',
                                                    backgroundColor: theme.palette.grey[50]
                                                }}
                                            >
                                                Niveaux concernés
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {events
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((event) => {
                                                const statusColor = getStatusColor(event.statut);
                                                return (
                                                    <TableRow
                                                        key={event.id}
                                                        sx={{
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                                            },
                                                            transition: 'background-color 0.2s ease'
                                                        }}
                                                    >
                                                        <TableCell>
                                                            <Typography variant="subtitle1" fontWeight="medium">
                                                                {event.titre}
                                                            </Typography>
                                                            <Typography 
                                                                variant="body2" 
                                                                color="text.secondary"
                                                                sx={{ mt: 0.5 }}
                                                            >
                                                                {event.description}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            {new Date(event.date).toLocaleDateString('fr-FR', {
                                                                day: 'numeric',
                                                                month: 'long',
                                                                year: 'numeric'
                                                            })}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Chip
                                                                label={event.type}
                                                                size="small"
                                                                sx={{
                                                                    backgroundColor: '#e3f2fd',
                                                                    color: '#1976d2',
                                                                    fontWeight: 500
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Chip
                                                                label={statusColor.label}
                                                                size="small"
                                                                sx={{
                                                                    backgroundColor: statusColor.bg,
                                                                    color: statusColor.color,
                                                                    fontWeight: 500
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                                                {event.niveaux_etude.map((niveau) => (
                                                                    <Chip
                                                                        key={niveau}
                                                                        label={niveau}
                                                                        size="small"
                                                                        icon={<School sx={{ fontSize: 16 }} />}
                                                                        sx={{
                                                                            backgroundColor: '#f3e5f5',
                                                                            color: '#9c27b0',
                                                                            fontWeight: 500,
                                                                            '&:hover': {
                                                                                backgroundColor: '#e1bee7'
                                                                            }
                                                                        }}
                                                                    />
                                                                ))}
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                component="div"
                                count={events.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                rowsPerPageOptions={[5, 10, 25]}
                                labelRowsPerPage="Lignes par page"
                                labelDisplayedRows={({ from, to, count }) => 
                                    `${from}-${to} sur ${count}`
                                }
                                sx={{
                                    borderTop: '1px solid',
                                    borderColor: 'divider',
                                }}
                            />
                        </>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default Home;
