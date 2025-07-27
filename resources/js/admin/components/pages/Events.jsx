import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    TextField,
    InputAdornment,
    Alert,
    Snackbar,
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import EventsTable from '../tables/EventsTable';
import EventFormDialog from '../dialogs/EventFormDialog';
import { evenementService } from '../../services/evenementService';

export default function Events() {
    const [openDialog, setOpenDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Charger les événements
    const loadEvents = async () => {
        try {
            setLoading(true);
            const data = await evenementService.getAll();
            setEvents(data);
            setError(null);
        } catch (err) {
            setError('Erreur lors du chargement des événements');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const handleOpenDialog = (event = null) => {
        setSelectedEvent(event);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setSelectedEvent(null);
        setOpenDialog(false);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSaveEvent = async (eventData) => {
        try {
            if (selectedEvent) {
                await evenementService.update(selectedEvent.id, eventData);
                setSnackbar({
                    open: true,
                    message: 'Événement modifié avec succès',
                    severity: 'success'
                });
            } else {
                await evenementService.create(eventData);
                setSnackbar({
                    open: true,
                    message: 'Événement créé avec succès',
                    severity: 'success'
                });
            }
            handleCloseDialog();
            loadEvents();
        } catch (err) {
            setSnackbar({
                open: true,
                message: 'Erreur lors de l\'enregistrement',
                severity: 'error'
            });
            console.error(err);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await evenementService.delete(eventId);
            setSnackbar({
                open: true,
                message: 'Événement supprimé avec succès',
                severity: 'success'
            });
            loadEvents();
        } catch (err) {
            setSnackbar({
                open: true,
                message: 'Erreur lors de la suppression',
                severity: 'error'
            });
            console.error(err);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box>
            {/* En-tête */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h1">
                    Gestion des Événements
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                    sx={{
                        backgroundColor: '#1a237e',
                        '&:hover': {
                            backgroundColor: '#0d47a1',
                        },
                    }}
                >
                    Nouvel Événement
                </Button>
            </Box>

            {/* Message d'erreur */}
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {/* Barre de recherche */}
            <Paper 
                sx={{ 
                    p: 2, 
                    mb: 3,
                    borderRadius: 2,
                    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)',
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Rechercher un événement..."
                    value={searchQuery}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                        },
                    }}
                />
            </Paper>

            {/* Table des événements */}
            <Paper 
                sx={{ 
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)',
                }}
            >
                <EventsTable
                    events={events}
                    loading={loading}
                    searchQuery={searchQuery}
                    onEdit={handleOpenDialog}
                    onDelete={handleDeleteEvent}
                />
            </Paper>

            {/* Modal de création/édition */}
            <EventFormDialog
                open={openDialog}
                onClose={handleCloseDialog}
                onSave={handleSaveEvent}
                event={selectedEvent}
            />

            {/* Notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
