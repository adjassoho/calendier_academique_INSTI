import React from 'react';
import { Box, Grid, Paper } from '@mui/material';
import QuickStats from '../widgets/QuickStats';
import EventsTimeline from '../widgets/EventsTimeline';
import EventsProgress from '../widgets/EventsProgress';

export default function Dashboard() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Statistiques rapides */}
            <Box sx={{ mb: 4 }}>
                <QuickStats />
            </Box>

            {/* Widgets principaux */}
            <Grid container spacing={3}>
                {/* Timeline des événements */}
                <Grid item xs={12} md={8}>
                    <Paper 
                        elevation={0}
                        sx={{ 
                            height: '100%',
                            borderRadius: 2,
                            overflow: 'hidden',
                            transition: 'box-shadow 0.3s',
                            '&:hover': {
                                boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
                            }
                        }}
                    >
                        <EventsTimeline />
                    </Paper>
                </Grid>

                {/* Progression des événements */}
                <Grid item xs={12} md={4}>
                    <Paper 
                        elevation={0}
                        sx={{ 
                            height: '100%',
                            borderRadius: 2,
                            overflow: 'hidden',
                            transition: 'box-shadow 0.3s',
                            '&:hover': {
                                boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
                            }
                        }}
                    >
                        <EventsProgress />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
