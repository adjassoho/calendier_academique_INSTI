import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Box,
    Alert,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { fr } from 'date-fns/locale';
import { format } from 'date-fns';

const ActivityFormDialog = ({ open, onClose, onSubmit, initialData = null }) => {
    const [formData, setFormData] = useState(initialData || {
        year: '',
        name: '',
        semester: 'Semestre 1',
        start_date: null,
        end_date: null,
        status: 'à venir'
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleDateChange = (name) => (date) => {
        setFormData(prev => ({
            ...prev,
            [name]: date
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.year || !formData.name || !formData.semester || !formData.start_date || !formData.end_date) {
            setError('Tous les champs sont obligatoires');
            return;
        }

        try {
            const formattedData = {
                ...formData,
                start_date: format(formData.start_date, 'yyyy-MM-dd'),
                end_date: format(formData.end_date, 'yyyy-MM-dd')
            };

            await onSubmit(formattedData);
            
            if (!initialData) {
                setFormData({
                    year: '',
                    name: '',
                    semester: 'Semestre 1',
                    start_date: null,
                    end_date: null,
                    status: 'à venir'
                });
            }
            setError('');
            onClose();
        } catch (err) {
            setError(err.response?.data?.error || 'Erreur lors de l\'ajout de l\'activité');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    {initialData ? 'Modifier l\'activité' : 'Nouvelle Activité Académique'}
                </DialogTitle>
                <DialogContent>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <TextField
                            label="Année Académique"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            placeholder="2024-2025"
                            fullWidth
                            required
                        />
                        <TextField
                            label="Nom de l'activité"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            select
                            label="Semestre"
                            name="semester"
                            value={formData.semester}
                            onChange={handleChange}
                            fullWidth
                            required
                        >
                            <MenuItem value="Semestre 1">Semestre 1</MenuItem>
                            <MenuItem value="Semestre 2">Semestre 2</MenuItem>
                        </TextField>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                            <DatePicker
                                label="Date de début"
                                value={formData.start_date}
                                onChange={handleDateChange('start_date')}
                                format="dd/MM/yyyy"
                                slotProps={{
                                    textField: {
                                        required: true,
                                        fullWidth: true
                                    }
                                }}
                            />
                            <DatePicker
                                label="Date de fin"
                                value={formData.end_date}
                                onChange={handleDateChange('end_date')}
                                minDate={formData.start_date}
                                format="dd/MM/yyyy"
                                slotProps={{
                                    textField: {
                                        required: true,
                                        fullWidth: true
                                    }
                                }}
                            />
                        </LocalizationProvider>
                        <TextField
                            select
                            label="Statut"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            fullWidth
                            required
                        >
                            <MenuItem value="à venir">À venir</MenuItem>
                            <MenuItem value="en cours">En cours</MenuItem>
                            <MenuItem value="terminé">Terminé</MenuItem>
                        </TextField>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} type="button">
                        Annuler
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        {initialData ? 'Modifier' : 'Ajouter'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ActivityFormDialog;
