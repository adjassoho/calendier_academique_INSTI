import React from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    CardHeader,
    IconButton,
} from '@mui/material';
import {
    Event as EventIcon,
    School as SchoolIcon,
    DateRange as DateRangeIcon,
    MoreVert as MoreVertIcon,
    TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

// Composant pour les cartes de statistiques
const StatCard = ({ title, value, icon, color }) => (
    <Card>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                    sx={{
                        backgroundColor: `${color}15`,
                        borderRadius: '50%',
                        p: 1,
                        mr: 2,
                    }}
                >
                    {icon}
                </Box>
                <Typography variant="h6" color="textSecondary">
                    {title}
                </Typography>
            </Box>
            <Typography variant="h4" component="div">
                {value}
            </Typography>
        </CardContent>
    </Card>
);

// Composant pour le graphique des activités récentes
const RecentActivities = () => (
    <Card sx={{ height: '100%' }}>
        <CardHeader
            title="Activités Récentes"
            action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
            }
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                Liste des dernières activités ajoutées...
            </Typography>
        </CardContent>
    </Card>
);

// Composant pour les statistiques détaillées
const DetailedStats = () => (
    <Card sx={{ height: '100%' }}>
        <CardHeader
            title="Statistiques Détaillées"
            action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
            }
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                Graphiques et statistiques détaillées...
            </Typography>
        </CardContent>
    </Card>
);

const Dashboard = () => {
    const [activities, setActivities] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        upcoming: 0,
        years: 0,
        completion: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openActivityForm, setOpenActivityForm] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [activitiesRes, statsRes] = await Promise.all([
                axios.get('/api/academic-activities'),
                axios.get('/api/academic-activities-stats')
            ]);
            
            setActivities(activitiesRes.data.data || []);
            setStats(statsRes.data.data || {});
            setError(null);
        } catch (err) {
            console.error('Erreur:', err);
            setError('Erreur lors du chargement des données');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddActivity = async (activityData) => {
        try {
            const response = await axios.post('/api/academic-activities', activityData);
            setActivities(prev => [...prev, response.data.data]);
            setOpenActivityForm(false);
            fetchData();
        } catch (err) {
            console.error('Erreur lors de l\'ajout:', err);
            throw err;
        }
    };

    const handleEditActivity = async (id, activityData) => {
        try {
            const response = await axios.put(`/api/academic-activities/${id}`, activityData);
            setActivities(prev => prev.map(activity => 
                activity.id === id ? response.data.data : activity
            ));
            fetchData();
        } catch (err) {
            console.error('Erreur lors de la modification:', err);
            throw err;
        }
    };

    const handleDeleteActivity = async (id) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette activité ?')) return;
        
        try {
            await axios.delete(`/api/academic-activities/${id}`);
            setActivities(prev => prev.filter(activity => activity.id !== id));
            fetchData();
        } catch (err) {
            console.error('Erreur lors de la suppression:', err);
            throw err;
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Tableau de bord
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenActivityForm(true)}
                >
                    Nouvelle Activité
                </Button>
            </Box>

            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total des activités"
                        value={stats.total}
                        icon={<EventIcon sx={{ color: '#1976d2' }} />}
                        color="#1976d2"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Activités à venir"
                        value={stats.upcoming}
                        icon={<DateRangeIcon sx={{ color: '#ed6c02' }} />}
                        color="#ed6c02"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Années académiques"
                        value={stats.years}
                        icon={<SchoolIcon sx={{ color: '#2e7d32' }} />}
                        color="#2e7d32"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Taux de complétion"
                        value={`${stats.completion}%`}
                        icon={<TrendingUpIcon sx={{ color: '#9c27b0' }} />}
                        color="#9c27b0"
                    />
                </Grid>
            </Grid>

            <ActivitiesTable
                activities={activities}
                onEdit={handleEditActivity}
                onDelete={handleDeleteActivity}
            />

            <ActivityFormDialog
                open={openActivityForm}
                onClose={() => setOpenActivityForm(false)}
                onSubmit={handleAddActivity}
            />
        </Box>
    );
};

export default Dashboard;
