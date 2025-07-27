import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Grid,
    Box,
    FormControl,
    InputLabel,
    Select,
    Chip,
    OutlinedInput,
    CircularProgress,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import fr from 'date-fns/locale/fr';

const eventTypes = [
    { value: 'academique', label: 'Académique' },
    { value: 'examen', label: 'Examen' },
    { value: 'reunion', label: 'Réunion' },
    { value: 'autre', label: 'Autre' },
];

const studyLevels = [
    { value: 'licence1', label: 'Licence 1' },
    { value: 'licence2', label: 'Licence 2' },
    { value: 'licence3', label: 'Licence 3' },
    { value: 'master1', label: 'Master 1' },
    { value: 'master2', label: 'Master 2' },
    { value: 'doctorat', label: 'Doctorat' },
];

const eventStatus = [
    { value: 'draft', label: 'Brouillon' },
    { value: 'upcoming', label: 'À venir' },
    { value: 'completed', label: 'Terminé' },
    { value: 'cancelled', label: 'Annulé' },
];

export default function EventFormDialog({ open, onClose, onSave, event }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        date: null,
        type: '',
        status: 'draft',
        description: '',
        studyLevels: [],
    });

    useEffect(() => {
        if (event) {
            setFormData({
                title: event.title,
                date: new Date(event.date),
                type: event.type,
                status: event.status,
                description: event.description,
                studyLevels: event.studyLevels || [],
            });
        } else {
            setFormData({
                title: '',
                date: null,
                type: '',
                status: 'draft',
                description: '',
                studyLevels: [],
            });
        }
    }, [event]);

    const handleChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value,
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            date,
        });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const formattedData = {
                title: formData.title,
                date: formData.date.toISOString(),
                event_type: formData.type,
                status: formData.status,
                description: formData.description,
                study_levels: formData.studyLevels,
            };
            console.log('Données envoyées à l\'API:', formattedData);
            await onSave(formattedData);
            onClose();
        } catch (error) {
            console.error('Erreur détaillée:', error);
            console.error('Message d\'erreur:', error.message);
            if (error.response) {
                console.error('Réponse du serveur:', error.response.data);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                }
            }}
        >
            <DialogTitle>
                {event ? 'Modifier l\'événement' : 'Nouvel événement'}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ pt: 2 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Titre"
                                value={formData.title}
                                onChange={handleChange('title')}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                                <DatePicker
                                    label="Date"
                                    value={formData.date}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                    sx={{ width: '100%' }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Type"
                                value={formData.type}
                                onChange={handleChange('type')}
                            >
                                {eventTypes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                select
                                label="Statut"
                                value={formData.status}
                                onChange={handleChange('status')}
                            >
                                {eventStatus.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="study-levels-label">Niveaux d'étude concernés</InputLabel>
                                <Select
                                    labelId="study-levels-label"
                                    multiple
                                    value={formData.studyLevels}
                                    onChange={handleChange('studyLevels')}
                                    input={<OutlinedInput label="Niveaux d'étude concernés" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={studyLevels.find(level => level.value === value)?.label}
                                                    sx={{
                                                        backgroundColor: '#e3f2fd',
                                                        color: '#1976d2',
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {studyLevels.map((level) => (
                                        <MenuItem key={level.value} value={level.value}>
                                            {level.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Description"
                                value={formData.description}
                                onChange={handleChange('description')}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose} color="inherit">
                    Annuler
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={loading}
                    sx={{
                        backgroundColor: '#1a237e',
                        '&:hover': {
                            backgroundColor: '#0d47a1',
                        },
                    }}
                >
                    {loading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        event ? 'Modifier' : 'Créer'
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
