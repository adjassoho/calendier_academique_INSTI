import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

const StatsCard = ({ icon, title, value, bgColor }) => (
    <Paper
        elevation={1}
        sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: bgColor,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        }}
    >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {icon}
            <Typography variant="subtitle1" sx={{ ml: 1, color: 'text.secondary' }}>
                {title}
            </Typography>
        </Box>
        <Typography variant="h3" component="div" fontWeight="bold">
            {value}
        </Typography>
    </Paper>
);

export default StatsCard;
