import React from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Card,
    CardContent,
    useTheme,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Event as EventIcon,
    Category as CategoryIcon,
    School as SchoolIcon,
    Assessment as AssessmentIcon,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => {
    const theme = useTheme();
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                        sx={{
                            backgroundColor: color + '20',
                            borderRadius: '50%',
                            p: 1,
                            mr: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {icon}
                    </Box>
                    <Typography variant="h6" color="text.secondary">
                        {title}
                    </Typography>
                </Box>
                <Typography variant="h4" component="div" fontWeight="bold">
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
};

const Dashboard = () => {
    const theme = useTheme();

    // Données factices pour la démonstration
    const recentEvents = [
        { id: 1, title: 'Examen de Mathématiques', date: '2025-01-10', department: 'Génie Logiciel', type: 'Examen' },
        { id: 2, title: 'Conférence IA', date: '2025-01-15', department: 'Informatique', type: 'Événement' },
        { id: 3, title: 'TP Réseaux', date: '2025-01-20', department: 'Réseaux', type: 'Cours' },
    ];

    return (
        <Box sx={{ p: 3 }}>
            {/* En-tête */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" fontWeight="bold">
                    Tableau de bord
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                >
                    Nouvel événement
                </Button>
            </Box>

            {/* Statistiques */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Événements"
                        value="45"
                        icon={<EventIcon sx={{ color: '#2196F3' }} />}
                        color="#2196F3"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Catégories"
                        value="8"
                        icon={<CategoryIcon sx={{ color: '#4CAF50' }} />}
                        color="#4CAF50"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Départements"
                        value="6"
                        icon={<SchoolIcon sx={{ color: '#FF9800' }} />}
                        color="#FF9800"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Ce mois"
                        value="12"
                        icon={<AssessmentIcon sx={{ color: '#F44336' }} />}
                        color="#F44336"
                    />
                </Grid>
            </Grid>

            {/* Tableau des événements récents */}
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Événements récents
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Titre</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Département</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recentEvents.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell>{event.title}</TableCell>
                                    <TableCell>{event.date}</TableCell>
                                    <TableCell>{event.department}</TableCell>
                                    <TableCell>{event.type}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton size="small" color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Actions rapides */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Gestion des catégories
                        </Typography>
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            sx={{ mr: 2 }}
                        >
                            Nouvelle catégorie
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                        >
                            Gérer les catégories
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Gestion des départements
                        </Typography>
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            sx={{ mr: 2 }}
                        >
                            Nouveau département
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                        >
                            Gérer les départements
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
