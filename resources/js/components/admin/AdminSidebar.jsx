import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Divider,
    useTheme,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Event as EventIcon,
    Category as CategoryIcon,
    School as SchoolIcon,
    Settings as SettingsIcon,
    CalendarMonth as CalendarIcon,
    People as PeopleIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
    { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Calendrier', icon: <CalendarIcon />, path: '/admin/calendar' },
    { text: 'Événements', icon: <EventIcon />, path: '/admin/events' },
    { text: 'Catégories', icon: <CategoryIcon />, path: '/admin/categories' },
    { text: 'Départements', icon: <SchoolIcon />, path: '/admin/departments' },
    { text: 'Utilisateurs', icon: <PeopleIcon />, path: '/admin/users' },
];

const AdminSidebar = ({ open }) => {
    const theme = useTheme();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: theme.palette.background.default,
                    borderRight: `1px solid ${theme.palette.divider}`,
                    ...(!open && {
                        width: theme.spacing(7),
                        overflowX: 'hidden',
                    }),
                },
            }}
            open={open}
        >
            <Box sx={{ height: '64px' }} /> {/* Espace pour la barre de navigation */}
            
            {/* Logo INSTI */}
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <img
                    src="/images/unstim-logo.png"
                    alt="INSTI Logo"
                    style={{
                        height: '40px',
                        width: 'auto',
                    }}
                />
            </Box>

            <Divider />

            {/* Menu principal */}
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                px: 2.5,
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 74, 173, 0.08)',
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: theme.palette.primary.main,
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText 
                                primary={item.text} 
                                sx={{ 
                                    opacity: open ? 1 : 0,
                                    '& .MuiTypography-root': {
                                        fontWeight: 500,
                                    },
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider sx={{ mt: 'auto' }} />

            {/* Paramètres */}
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            px: 2.5,
                            '&:hover': {
                                backgroundColor: 'rgba(0, 74, 173, 0.08)',
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color: theme.palette.primary.main,
                            }}
                        >
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Paramètres" 
                            sx={{ 
                                opacity: open ? 1 : 0,
                                '& .MuiTypography-root': {
                                    fontWeight: 500,
                                },
                            }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default AdminSidebar;
