import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Divider,
    Typography,
    Box,
    Chip,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
    Tooltip,
    useTheme,
    alpha
} from '@mui/material';
import {
    School as SchoolIcon,
    Computer as ComputerIcon,
    Event as EventIcon,
    Science as ScienceIcon,
    Engineering as EngineeringIcon,
    FilterList as FilterListIcon,
    Category as CategoryIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const drawerWidth = 280;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        backgroundColor: theme.palette.background.default,
        borderRight: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(3),
    },
}));

const categories = [
    { id: 1, name: 'Cours', color: '#4CAF50', icon: <SchoolIcon /> },
    { id: 2, name: 'Examens', color: '#f44336', icon: <EventIcon /> },
    { id: 3, name: 'Réunions', color: '#2196F3', icon: <ComputerIcon /> },
    { id: 4, name: 'Événements', color: '#FF9800', icon: <EventIcon /> },
    { id: 5, name: 'Ateliers', color: '#9C27B0', icon: <ScienceIcon /> },
];

const departments = [
    { id: 1, name: 'Génie Logiciel', icon: <ComputerIcon /> },
    { id: 2, name: 'Réseaux et Télécommunications', icon: <EngineeringIcon /> },
    { id: 3, name: 'Génie Civil', icon: <EngineeringIcon /> },
    { id: 4, name: 'Génie Mécanique', icon: <EngineeringIcon /> },
];

const SectionTitle = ({ icon, children }) => {
    const theme = useTheme();
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton
                sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    mr: 1,
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                    },
                }}
                size="small"
            >
                {icon}
            </IconButton>
            <Typography variant="h6" color="primary" fontWeight="600">
                {children}
            </Typography>
        </Box>
    );
};

const Sidebar = ({
    selectedCategories,
    setSelectedCategories,
    selectedDepartment,
    setSelectedDepartment,
}) => {
    const theme = useTheme();

    const handleCategoryToggle = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    return (
        <StyledDrawer variant="permanent">
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Section Filtres */}
                <SectionTitle icon={<FilterListIcon />}>
                    Filtres
                </SectionTitle>

                {/* Filtre par département */}
                <FormControl 
                    variant="outlined" 
                    sx={{ 
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                        }
                    }}
                >
                    <InputLabel>Département</InputLabel>
                    <Select
                        value={selectedDepartment}
                        label="Département"
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>Tous les départements</em>
                        </MenuItem>
                        {departments.map((dept) => (
                            <MenuItem key={dept.id} value={dept.id}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <ListItemIcon sx={{ minWidth: 40 }}>
                                        {dept.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={dept.name} />
                                </Box>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Divider sx={{ my: 3 }} />

                {/* Filtre par catégorie */}
                <SectionTitle icon={<CategoryIcon />}>
                    Catégories
                </SectionTitle>

                <FormGroup>
                    {categories.map((category) => (
                        <FormControlLabel
                            key={category.id}
                            control={
                                <Checkbox
                                    checked={selectedCategories.includes(category.id)}
                                    onChange={() => handleCategoryToggle(category.id)}
                                    icon={
                                        <Box
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                border: `2px solid ${alpha(category.color, 0.5)}`,
                                                borderRadius: 1.5,
                                                transition: 'all 0.2s',
                                            }}
                                        />
                                    }
                                    checkedIcon={
                                        <Box
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                backgroundColor: category.color,
                                                borderRadius: 1.5,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                '& svg': {
                                                    fontSize: 16,
                                                },
                                            }}
                                        >
                                            {category.icon}
                                        </Box>
                                    }
                                />
                            }
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography>{category.name}</Typography>
                                    <Chip
                                        size="small"
                                        label="12"
                                        sx={{
                                            backgroundColor: alpha(category.color, 0.1),
                                            color: category.color,
                                            fontWeight: 600,
                                            ml: 1,
                                        }}
                                    />
                                </Box>
                            }
                            sx={{
                                mx: 0,
                                '& .MuiFormControlLabel-label': {
                                    width: '100%',
                                },
                            }}
                        />
                    ))}
                </FormGroup>

                <Box sx={{ flexGrow: 1 }} />

                {/* Section Légende */}
                <Divider sx={{ my: 3 }} />
                <List dense sx={{ pb: 2 }}>
                    {categories.map((category) => (
                        <Tooltip 
                            key={category.id} 
                            title={`Événements de type ${category.name}`}
                            placement="right"
                        >
                            <ListItemButton
                                sx={{
                                    borderRadius: 2,
                                    mb: 0.5,
                                    '&:hover': {
                                        backgroundColor: alpha(category.color, 0.1),
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    <Box
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            backgroundColor: category.color,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText 
                                    primary={category.name}
                                    primaryTypographyProps={{
                                        variant: 'body2',
                                        color: 'text.secondary',
                                    }}
                                />
                            </ListItemButton>
                        </Tooltip>
                    ))}
                </List>
            </Box>
        </StyledDrawer>
    );
};

export default Sidebar;
