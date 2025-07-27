import React from 'react';
import { Grid } from '@mui/material';
import StatsCard from '../cards/StatsCard';
import {
    Event as EventIcon,
    CalendarToday as CalendarIcon,
    CheckCircle as CheckCircleIcon,
    Notifications as NotificationsIcon,
} from '@mui/icons-material';

const stats = [
    {
        title: "Total Événements",
        value: "33",
        icon: <EventIcon />,
        color: "#1976d2",
        trend: "+12% ce mois"
    },
    {
        title: "Événements à venir",
        value: "8",
        icon: <CalendarIcon />,
        color: "#2e7d32",
        trend: "Cette semaine"
    },
    {
        title: "Taux de complétion",
        value: "78%",
        icon: <CheckCircleIcon />,
        color: "#ed6c02",
        trend: "+5% vs dernier mois"
    },
    {
        title: "Rappels actifs",
        value: "12",
        icon: <NotificationsIcon />,
        color: "#9c27b0",
        trend: "4 aujourd'hui"
    }
];

export default function QuickStats() {
    return (
        <Grid container spacing={3}>
            {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <StatsCard {...stat} />
                </Grid>
            ))}
        </Grid>
    );
}
