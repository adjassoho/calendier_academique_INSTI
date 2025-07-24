import React from 'react';
import { Card, CardContent, CardHeader, Typography, Box, Avatar } from '@mui/material';
import { Event as EventIcon } from '@mui/icons-material';

const events = [
    {
        id: 1,
        title: "Début du semestre",
        date: "2025-01-15",
        status: "upcoming",
        type: "academic"
    },
    {
        id: 2,
        title: "Examens mi-parcours",
        date: "2025-02-20",
        status: "upcoming",
        type: "exam"
    },
    {
        id: 3,
        title: "Journée portes ouvertes",
        date: "2025-03-05",
        status: "upcoming",
        type: "event"
    }
];

const getStatusColor = (status) => {
    switch (status) {
        case 'completed':
            return '#4caf50';
        case 'upcoming':
            return '#2196f3';
        case 'cancelled':
            return '#f44336';
        default:
            return '#757575';
    }
};

const getTypeIcon = (type) => {
    switch (type) {
        case 'academic':
            return '📚';
        case 'exam':
            return '📝';
        case 'event':
            return '🎉';
        default:
            return '📅';
    }
};

export default function EventsTimeline() {
    return (
        <Card sx={{ height: '100%' }}>
            <CardHeader 
                title="Prochains Événements"
                avatar={
                    <Avatar sx={{ bgcolor: '#1a237e' }}>
                        <EventIcon />
                    </Avatar>
                }
            />
            <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {events.map((event) => (
                        <Box
                            key={event.id}
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                p: 2,
                                borderRadius: 1,
                                bgcolor: 'background.paper',
                                boxShadow: 1,
                                '&:hover': {
                                    boxShadow: 3,
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.3s'
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    mr: 2,
                                    fontSize: '1.5rem',
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 1,
                                    bgcolor: '#f5f5f5'
                                }}
                            >
                                {getTypeIcon(event.type)}
                            </Box>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    {event.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {new Date(event.date).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    bgcolor: getStatusColor(event.status),
                                    ml: 2
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}
