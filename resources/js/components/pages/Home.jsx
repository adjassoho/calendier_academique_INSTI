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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
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
    switch (status?.toLowerCase()) {
        case 'draft':
            return { bg: '#f5f5f5', color: '#757575', label: 'Brouillon' };
        case 'completed':
            return { bg: '#e8f5e9', color: '#2e7d32', label: 'Terminé' };
        case 'cancelled':
            return { bg: '#ffebee', color: '#c62828', label: 'Annulé' };
        case 'upcoming':
            return { bg: '#e3f2fd', color: '#1976d2', label: 'À venir' };
        default:
            return { bg: '#f5f5f5', color: '#757575', label: status || 'Non défini' };
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
    const [filters, setFilters] = useState({
        date: '',
        studyLevel: 'all',
        eventType: 'all'
    });
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [uniqueStudyLevels, setUniqueStudyLevels] = useState([]);
    const [uniqueEventTypes, setUniqueEventTypes] = useState([]);

    useEffect(() => {
        setMounted(true);
        fetchEvents();
    }, [period]);

    useEffect(() => {
        if (events.length > 0) {
            // Extraire les niveaux d'études uniques
            const studyLevels = new Set();
            events.forEach(event => {
                if (Array.isArray(event.study_levels)) {
                    event.study_levels.forEach(level => studyLevels.add(level));
                } else if (typeof event.study_levels === 'object') {
                    Object.values(event.study_levels).forEach(level => studyLevels.add(level));
                }
            });
            setUniqueStudyLevels(Array.from(studyLevels));

            // Extraire les types d'événements uniques
            const eventTypes = new Set(events.map(event => event.event_type));
            setUniqueEventTypes(Array.from(eventTypes));

            // Appliquer les filtres
            filterEvents();
        }
    }, [events, filters]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/events');
            if (response.data.status === 'success') {
                const events = response.data.data;
                setEvents(events);
                
                // Calculer les statistiques
                const now = new Date();
                const weekEnd = new Date();
                weekEnd.setDate(weekEnd.getDate() + 7);
                
                const stats = {
                    upcoming: events.filter(e => e.status === 'upcoming').length,
                    thisWeek: events.filter(e => {
                        const eventDate = new Date(e.date);
                        const today = new Date();
                        const nextWeek = new Date();
                        nextWeek.setDate(today.getDate() + 7);
                        return eventDate >= today && eventDate <= nextWeek;
                    }).length,
                    total: events.length
                };
                
                setStats(stats);
            }
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

    const filterEvents = () => {
        let filtered = [...events];

        // Filtre par date
        if (filters.date) {
            const filterDate = new Date(filters.date);
            filtered = filtered.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.toDateString() === filterDate.toDateString();
            });
        }

        // Filtre par niveau d'études
        if (filters.studyLevel !== 'all') {
            filtered = filtered.filter(event => {
                const eventLevels = Array.isArray(event.study_levels) 
                    ? event.study_levels 
                    : Object.values(event.study_levels || {});
                return eventLevels.includes(filters.studyLevel);
            });
        }

        // Filtre par type d'événement
        if (filters.eventType !== 'all') {
            filtered = filtered.filter(event => event.event_type === filters.eventType);
        }

        setFilteredEvents(filtered);
    };

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
        setPage(0);
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

                {/* Nouveaux filtres */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Filtres
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Date"
                                value={filters.date}
                                onChange={(e) => handleFilterChange('date', e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <InputLabel>Niveau d'études</InputLabel>
                                <Select
                                    value={filters.studyLevel}
                                    label="Niveau d'études"
                                    onChange={(e) => handleFilterChange('studyLevel', e.target.value)}
                                >
                                    <MenuItem value="all">Tous les niveaux</MenuItem>
                                    {uniqueStudyLevels.map((level) => (
                                        <MenuItem key={level} value={level}>
                                            {level}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <InputLabel>Type d'événement</InputLabel>
                                <Select
                                    value={filters.eventType}
                                    label="Type d'événement"
                                    onChange={(e) => handleFilterChange('eventType', e.target.value)}
                                >
                                    <MenuItem value="all">Tous les types</MenuItem>
                                    {uniqueEventTypes.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

                {/* Table des événements */}
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Titre</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Niveaux d'études</TableCell>
                                <TableCell>Statut</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredEvents
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((event) => {
                                    const statusInfo = getStatusColor(event.status);
                                    return (
                                        <TableRow key={event.id}>
                                            <TableCell>{event.title}</TableCell>
                                            <TableCell>{event.event_type}</TableCell>
                                            <TableCell>
                                                {new Date(event.date).toLocaleDateString('fr-FR')}
                                            </TableCell>
                                            <TableCell>{event.description}</TableCell>
                                            <TableCell>
                                                {event.study_levels ? (
                                                    Array.isArray(event.study_levels) 
                                                        ? event.study_levels.join(', ')
                                                        : typeof event.study_levels === 'object'
                                                            ? Object.values(event.study_levels).join(', ')
                                                            : event.study_levels
                                                ) : ''}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={statusInfo.label}
                                                    sx={{
                                                        backgroundColor: statusInfo.bg,
                                                        color: statusInfo.color,
                                                        fontWeight: 500
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={filteredEvents.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Lignes par page"
                    />
                </TableContainer>
            </Container>
        </Box>
    );
};

export default Home;
