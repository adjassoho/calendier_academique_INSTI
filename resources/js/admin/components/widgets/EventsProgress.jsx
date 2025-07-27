import React from 'react';
import { Card, CardContent, CardHeader, Typography, Box, Avatar, LinearProgress } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

const categories = [
    {
        name: "Événements académiques",
        completed: 12,
        total: 15,
        color: "#1976d2"
    },
    {
        name: "Examens",
        completed: 8,
        total: 10,
        color: "#2e7d32"
    },
    {
        name: "Activités étudiantes",
        completed: 5,
        total: 8,
        color: "#ed6c02"
    }
];

export default function EventsProgress() {
    return (
        <Card sx={{ height: '100%' }}>
            <CardHeader
                title="Progression des Événements"
                avatar={
                    <Avatar sx={{ bgcolor: '#1a237e' }}>
                        <TrendingUp />
                    </Avatar>
                }
            />
            <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {categories.map((category) => {
                        const progress = (category.completed / category.total) * 100;
                        return (
                            <Box key={category.name}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                        {category.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {category.completed}/{category.total}
                                    </Typography>
                                </Box>
                                <Box sx={{ position: 'relative' }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={progress}
                                        sx={{
                                            height: 8,
                                            borderRadius: 4,
                                            backgroundColor: `${category.color}22`,
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: category.color,
                                                borderRadius: 4,
                                            }
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            position: 'absolute',
                                            right: -35,
                                            top: -2,
                                            minWidth: 30
                                        }}
                                    >
                                        {Math.round(progress)}%
                                    </Typography>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </CardContent>
        </Card>
    );
}
