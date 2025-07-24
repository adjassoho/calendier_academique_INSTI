import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import EventForm from './EventForm';
import axios from 'axios';

const Calendar = ({ darkMode, selectedCategories, selectedDepartment }) => {
    const [events, setEvents] = useState([]);
    const [openEventDialog, setOpenEventDialog] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedDates, setSelectedDates] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, [selectedCategories, selectedDepartment]);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('/api/events', {
                params: {
                    categories: selectedCategories.join(','),
                    department: selectedDepartment
                }
            });
            setEvents(response.data.map(event => ({
                id: event.id,
                title: event.title,
                start: event.start_date,
                end: event.end_date,
                backgroundColor: event.category_color,
                extendedProps: {
                    description: event.description,
                    location: event.location,
                    category_id: event.category_id,
                    is_online: event.is_online,
                    meeting_link: event.meeting_link
                }
            })));
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
        setOpenEventDialog(true);
    };

    const handleDateSelect = (selectInfo) => {
        setSelectedDates(selectInfo);
        setOpenEventDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenEventDialog(false);
        setSelectedEvent(null);
        setSelectedDates(null);
    };

    const handleSaveEvent = async (eventData) => {
        try {
            if (selectedEvent) {
                await axios.put(`/api/events/${selectedEvent.id}`, eventData);
            } else {
                await axios.post('/api/events', eventData);
            }
            fetchEvents();
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving event:', error);
        }
    };

    return (
        <Paper sx={{ p: 2, height: 'calc(100vh - 100px)' }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                locale={frLocale}
                selectable={true}
                editable={true}
                events={events}
                eventClick={handleEventClick}
                select={handleDateSelect}
                height="100%"
            />

            <Dialog open={openEventDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {selectedEvent ? 'Modifier l\'événement' : 'Nouvel événement'}
                </DialogTitle>
                <DialogContent>
                    <EventForm
                        event={selectedEvent}
                        selectedDates={selectedDates}
                        onSave={handleSaveEvent}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Annuler</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default Calendar;
