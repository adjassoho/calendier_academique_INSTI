import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Alert,
    CircularProgress
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import eventService from '@/services/eventService';

const CalendarAdmin = () => {
    const [events, setEvents] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        event_type: '',
        status: '',
        description: '',
        study_levels: []
    });

    const handleOpenDialog = (event = null) => {
        if (event) {
            setSelectedEvent(event);
            setFormData({
                title: event.title,
                date: event.date.split('T')[0],
                event_type: event.event_type,
                status: event.status,
                description: event.description,
                study_levels: Array.isArray(event.study_levels) ? event.study_levels : []
            });
        } else {
            setSelectedEvent(null);
            setFormData({
                title: '',
                date: '',
                event_type: '',
                status: '',
                description: '',
                study_levels: []
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedEvent(null);
        setError(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'study_levels') {
            setFormData(prev => ({
                ...prev,
                study_levels: value.split(',').map(level => level.trim())
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);

            if (selectedEvent) {
                await eventService.update(selectedEvent.id, formData);
            } else {
                console.log('Données envoyées:', formData);
                const response = await eventService.create(formData);
                console.log('Réponse:', response);
            }
            
            handleCloseDialog();
            fetchEvents();
        } catch (error) {
            console.error('Erreur détaillée:', error);
            setError(error.response?.data?.message || error.message || 'Une erreur est survenue lors de la sauvegarde');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
            try {
                setLoading(true);
                await eventService.delete(id);
                fetchEvents();
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                setError('Une erreur est survenue lors de la suppression');
            } finally {
                setLoading(false);
            }
        }
    };

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const data = await eventService.getAll();
            setEvents(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des événements:', error);
            setError('Une erreur est survenue lors de la récupération des événements');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Gestion des Événements
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                >
                    Nouvel Événement
                </Button>
            </Box>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Titre</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Statut</TableCell>
                            <TableCell>Niveaux</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((event) => (
                            <TableRow key={event.id}>
                                <TableCell>{event.title}</TableCell>
                                <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                                <TableCell>{event.event_type}</TableCell>
                                <TableCell>{event.status}</TableCell>
                                <TableCell>{Array.isArray(event.study_levels) ? event.study_levels.join(', ') : ''}</TableCell>
                                <TableCell>
                                    <Button
                                        size="small"
                                        startIcon={<EditIcon />}
                                        onClick={() => handleOpenDialog(event)}
                                        sx={{ mr: 1 }}
                                    >
                                        Modifier
                                    </Button>
                                    <Button
                                        size="small"
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDelete(event.id)}
                                    >
                                        Supprimer
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {selectedEvent ? 'Modifier l\'événement' : 'Nouvel événement'}
                </DialogTitle>
                <DialogContent>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Titre de l'événement"
                        type="text"
                        fullWidth
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="date"
                        label="Date"
                        type="date"
                        fullWidth
                        value={formData.date}
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="event_type"
                        label="Type d'événement"
                        type="text"
                        fullWidth
                        value={formData.event_type}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="status"
                        label="Statut"
                        type="text"
                        fullWidth
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        multiline
                        rows={4}
                        fullWidth
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="study_levels"
                        label="Niveaux d'étude (séparés par des virgules)"
                        type="text"
                        fullWidth
                        value={Array.isArray(formData.study_levels) ? formData.study_levels.join(', ') : ''}
                        onChange={handleInputChange}
                        required
                        helperText="Exemple: L1, L2, L3"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Annuler</Button>
                    <Button onClick={handleSubmit} variant="contained" disabled={loading}>
                        {selectedEvent ? 'Modifier' : 'Créer'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CalendarAdmin;