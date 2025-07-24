import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Chip,
    Tooltip,
    Box,
    CircularProgress,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';

// Données de test (à remplacer par les données de l'API)
const mockEvents = [
    {
        id: 1,
        titre: "Début du semestre",
        date: "2025-01-15",
        type: "academic",
        statut: "upcoming",
        description: "Début des cours du semestre 2",
        niveaux_etude: ['licence1', 'licence2', 'licence3'],
    },
    {
        id: 2,
        titre: "Examens mi-parcours",
        date: "2025-02-20",
        type: "exam",
        statut: "upcoming",
        description: "Examens de mi-parcours pour toutes les filières",
        niveaux_etude: ['master1', 'master2'],
    },
    {
        id: 3,
        titre: "Journée portes ouvertes",
        date: "2025-03-05",
        type: "event",
        statut: "draft",
        description: "Présentation de l'université aux futurs étudiants",
        niveaux_etude: ['licence1', 'master1'],
    },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'upcoming':
            return { bg: '#e3f2fd', color: '#1976d2' };
        case 'completed':
            return { bg: '#e8f5e9', color: '#2e7d32' };
        case 'cancelled':
            return { bg: '#ffebee', color: '#c62828' };
        case 'draft':
            return { bg: '#f5f5f5', color: '#757575' };
        default:
            return { bg: '#f5f5f5', color: '#757575' };
    }
};

const getStatusLabel = (status) => {
    switch (status) {
        case 'upcoming':
            return 'À venir';
        case 'completed':
            return 'Terminé';
        case 'cancelled':
            return 'Annulé';
        case 'draft':
            return 'Brouillon';
        default:
            return status;
    }
};

const getNiveauLabel = (niveau) => {
    switch (niveau) {
        case 'licence1':
            return 'L1';
        case 'licence2':
            return 'L2';
        case 'licence3':
            return 'L3';
        case 'master1':
            return 'M1';
        case 'master2':
            return 'M2';
        default:
            return niveau;
    }
};

export default function EventsTable({ events = mockEvents, loading = false, searchQuery, onEdit, onDelete }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Filtrer les événements en fonction de la recherche
    const filteredEvents = events.filter(event => {
        const searchLower = searchQuery.toLowerCase();
        return (
            event.title?.toLowerCase().includes(searchLower) ||
            event.description?.toLowerCase().includes(searchLower) ||
            event.event_type?.toLowerCase().includes(searchLower) ||
            event.status?.toLowerCase().includes(searchLower)
        );
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Titre</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Statut</TableCell>
                            <TableCell>Niveaux</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredEvents
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((event) => {
                                const statusColor = getStatusColor(event.status);
                                return (
                                    <TableRow
                                        key={event.id}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#f5f5f5',
                                            },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {event.title}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(event.date).toLocaleDateString('fr-FR')}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={event.event_type}
                                                size="small"
                                                sx={{
                                                    backgroundColor: '#e3f2fd',
                                                    color: '#1976d2',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={getStatusLabel(event.status)}
                                                size="small"
                                                sx={{
                                                    backgroundColor: statusColor.bg,
                                                    color: statusColor.color,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {event.study_levels?.map((niveau) => (
                                                    <Chip
                                                        key={niveau}
                                                        label={getNiveauLabel(niveau)}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: '#f3e5f5',
                                                            color: '#9c27b0',
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            {event.description?.length > 50
                                                ? `${event.description.substring(0, 50)}...`
                                                : event.description}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Tooltip title="Modifier">
                                                    <IconButton
                                                        onClick={() => onEdit(event)}
                                                        size="small"
                                                        sx={{ color: '#1976d2' }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Supprimer">
                                                    <IconButton
                                                        onClick={() => onDelete(event.id)}
                                                        size="small"
                                                        sx={{ color: '#d32f2f' }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredEvents.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Lignes par page"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count}`}
            />
        </>
    );
}
