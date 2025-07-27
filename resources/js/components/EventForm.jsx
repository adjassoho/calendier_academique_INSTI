import React, { useState, useEffect } from 'react';
import { EVENT_TYPES, EVENT_STATUS, STUDY_LEVELS } from '../constants/eventConstants';
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Button,
    Grid,
    Box,
} from '@mui/material';
import axios from 'axios';

const EventForm = ({ event, selectedDates, onSave }) => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        event_type: EVENT_TYPES.ACADEMIC,
        status: EVENT_STATUS.DRAFT,
        study_levels: [],
        location: '',
        is_online: false,
        meeting_link: '',
    });

    useEffect(() => {
        fetchCategories();
        if (event) {
            setFormData({
                title: event.title,
                description: event.description || '',
                date: formatDateTime(event.start),
                event_type: event.event_type,
                status: event.status,
                study_levels: event.study_levels || [],
                location: event.location || '',
                is_online: event.is_online || false,
                meeting_link: event.meeting_link || '',
            });
        } else if (selectedDates) {
            setFormData(prev => ({
                ...prev,
                date: formatDateTime(selectedDates.start),
            }));
        }
    }, [event, selectedDates]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'is_online' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const formatDateTime = (date) => {
        return date.toISOString().slice(0, 16);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Titre"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        multiline
                        rows={3}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Date"
                        name="date"
                        type="datetime-local"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Type d'événement</InputLabel>
                        <Select
                            name="event_type"
                            value={formData.event_type}
                            onChange={handleChange}
                            required
                            label="Type d'événement"
                        >
                            {Object.entries(EVENT_TYPES).map(([key, value]) => (
                                <MenuItem key={value} value={value}>
                                    {value.charAt(0).toUpperCase() + value.slice(1)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Statut</InputLabel>
                        <Select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                            label="Statut"
                        >
                            {Object.entries(EVENT_STATUS).map(([key, value]) => (
                                <MenuItem key={value} value={value}>
                                    {value.charAt(0).toUpperCase() + value.slice(1)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Niveaux d'études</InputLabel>
                        <Select
                            multiple
                            name="study_levels"
                            value={formData.study_levels}
                            onChange={handleChange}
                            required
                            label="Niveaux d'études"
                        >
                            {STUDY_LEVELS.map((level) => (
                                <MenuItem key={level} value={level}>
                                    {level.charAt(0).toUpperCase() + level.slice(1)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Lieu"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="is_online"
                                checked={formData.is_online}
                                onChange={handleChange}
                            />
                        }
                        label="Événement en ligne"
                    />
                </Grid>
                {formData.is_online && (
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Lien de réunion"
                            name="meeting_link"
                            value={formData.meeting_link}
                            onChange={handleChange}
                            type="url"
                        />
                    </Grid>
                )}
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button type="submit" variant="contained" color="primary">
                            {event ? 'Modifier' : 'Créer'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default EventForm;
