import React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Chip,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const getStatusColor = (status) => {
    switch (status) {
        case 'à venir':
            return 'info';
        case 'en cours':
            return 'warning';
        case 'terminé':
            return 'success';
        default:
            return 'default';
    }
};

const ActivitiesTable = ({ activities, onEdit, onDelete }) => {
    const formatDate = (date) => {
        return format(new Date(date), 'dd MMMM yyyy', { locale: fr });
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Année</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell>Semestre</TableCell>
                        <TableCell>Date de début</TableCell>
                        <TableCell>Date de fin</TableCell>
                        <TableCell>Statut</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {activities.map((activity) => (
                        <TableRow key={activity.id}>
                            <TableCell>{activity.year}</TableCell>
                            <TableCell>{activity.name}</TableCell>
                            <TableCell>{activity.semester}</TableCell>
                            <TableCell>{formatDate(activity.start_date)}</TableCell>
                            <TableCell>{formatDate(activity.end_date)}</TableCell>
                            <TableCell>
                                <Chip
                                    label={activity.status}
                                    color={getStatusColor(activity.status)}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    size="small"
                                    onClick={() => onEdit(activity.id)}
                                    color="primary"
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    onClick={() => onDelete(activity.id)}
                                    color="error"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ActivitiesTable;
