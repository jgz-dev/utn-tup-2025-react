import { FormControl, InputLabel, Select, MenuItem, useTheme, Box, Typography, IconButton, TextField, Chip, Stack } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { useRecetas } from '../../contexts/RecetasContext';

const ControlesFiltro = () => {
    const theme = useTheme();
    const [filtersOpen, setFiltersOpen] = useState(false);
    const {
        categories,
        selectedCategory,
        setSelectedCategory,
        difficulties,
        selectedDifficulty,
        setSelectedDifficulty,
        itemsPerPage,
        setItemsPerPage,
        setCurrentPage,
        searchTerm,
        setSearchTerm,
        allFilteredRecetas,
        sortOption,
        setSortOption,
    } = useRecetas();

    const hasActiveFilters = selectedCategory !== 'Todas' || selectedDifficulty !== 'Todas';

    const handleToggleFilters = () => {
        setFiltersOpen(!filtersOpen);
    };

    const handleClearFilters = () => {
        setSelectedCategory('Todas');
        setSelectedDifficulty('Todas');
        setCurrentPage(1);
    };

    return (
     <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>

            {/* Encabezado con título, contador y acciones */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography 
                        variant="h6" 
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.mode === 'dark' ? '#f3f4f6' : '#1a202c',
                        }}
                    >
                        Filtros
                    </Typography>
                    {hasActiveFilters && (
                        <Box sx={{
                            px: 1.5,
                            py: 0.5,
                            backgroundColor: '#4a5568',
                            borderRadius: '12px',
                            color: '#ffffff',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                        }}>
                            Activos
                        </Box>
                    )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">{allFilteredRecetas.length} resultados</Typography>
                    {hasActiveFilters && (
                        <IconButton
                            size="small"
                            onClick={handleClearFilters}
                            title="Limpiar filtros"
                            sx={{
                                color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#4a5568',
                                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(203, 213, 225, 0.05)' : 'rgba(74, 85, 104, 0.05)',
                                '&:hover': { 
                                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(203, 213, 225, 0.15)' : 'rgba(74, 85, 104, 0.15)',
                                },
                            }}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    )}
                    <IconButton
                        size="small"
                        onClick={handleToggleFilters}
                        sx={{
                            color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#4a5568',
                            transition: 'transform 0.3s ease',
                            transform: filtersOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                    >
                        <ExpandMoreIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>

            {/* Panel de Filtros - Desplegable */}
            {filtersOpen && (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                        gap: 2,
                        p: 3,
                        backgroundColor: theme.palette.mode === 'dark' ? '#1f2937' : '#f9fafb',
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.mode === 'dark' ? '#374151' : '#e5e7eb'}`,
                        transition: 'all 0.3s ease',
                        animation: 'slideDown 0.3s ease',
                        '@keyframes slideDown': {
                            from: {
                                opacity: 0,
                                transform: 'translateY(-10px)',
                            },
                            to: {
                                opacity: 1,
                                transform: 'translateY(0)',
                            },
                        },
                    }}
                >
                    {/* Chips de filtros activos */}
                    <Stack direction="row" spacing={1} sx={{ gridColumn: '1 / -1', flexWrap: 'wrap', mb: 1 }}>
                        {selectedCategory !== 'Todas' && (
                            <Chip label={`Categoría: ${selectedCategory}`} size="small" onDelete={handleClearFilters} />
                        )}
                        {selectedDifficulty !== 'Todas' && (
                            <Chip label={`Dificultad: ${selectedDifficulty}`} size="small" onDelete={handleClearFilters} />
                        )}
                    </Stack>
                    {/* Filtro por Categoría */}
                    <FormControl fullWidth size="small">
                        <InputLabel id="category-select-label">Categoría</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            value={selectedCategory}
                            label="Categoría"
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setCurrentPage(1);
                            }}
                            sx={{
                                backgroundColor: theme.palette.mode === 'dark' ? '#111827' : '#ffffff',
                                color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1a202c',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: theme.palette.mode === 'dark' ? '#374151' : '#cbd5e1',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4a5568',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4a5568',
                                }
                            }}
                        >
                            {categories.map(category => (
                                <MenuItem key={category} value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Filtro por Dificultad */}
                    <FormControl fullWidth size="small">
                        <InputLabel id="difficulty-select-label">Dificultad</InputLabel>
                        <Select
                            labelId="difficulty-select-label"
                            id="difficulty-select"
                            value={selectedDifficulty}
                            label="Dificultad"
                            onChange={(e) => {
                                setSelectedDifficulty(e.target.value);
                                setCurrentPage(1);
                            }}
                            sx={{
                                backgroundColor: theme.palette.mode === 'dark' ? '#111827' : '#ffffff',
                                color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1a202c',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: theme.palette.mode === 'dark' ? '#374151' : '#cbd5e1',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4a5568',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4a5568',
                                }
                            }}
                        >
                            {difficulties.map(difficulty => (
                                <MenuItem key={difficulty} value={difficulty}>{difficulty}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            )}

            {/* Ordenar por + Items por página */}
            <Box
                sx={{
                    width: '100%',
                    p: 3,
                    boxSizing: 'border-box',
                    backgroundColor: theme.palette.mode === 'dark' ? '#1f2937' : '#f9fafb',
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.mode === 'dark' ? '#374151' : '#e5e7eb'}`,
                    transition: 'all 0.3s ease',
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 2,
                }}
            >
                <FormControl size="small" fullWidth>
                    <InputLabel id="sort-by-label">Ordenar por</InputLabel>
                    <Select
                        labelId="sort-by-label"
                        value={sortOption}
                        label="Ordenar por"
                        onChange={(e) => { setSortOption(e.target.value); setCurrentPage(1) }}
                        sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? '#111827' : '#ffffff',
                            color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1a202c',
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.mode === 'dark' ? '#374151' : '#cbd5e1' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4a5568' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4a5568' },
                        }}
                    >
                        <MenuItem value={'rating_desc'}>Calificación (desc)</MenuItem>
                        <MenuItem value={'rating_asc'}>Calificación (asc)</MenuItem>
                        <MenuItem value={'difficulty_asc'}>Dificultad (Fácil→Difícil)</MenuItem>
                        <MenuItem value={'difficulty_desc'}>Dificultad (Difícil→Fácil)</MenuItem>
                    </Select>
                </FormControl>

                <FormControl size="small" fullWidth>
                    <InputLabel id="items-per-page-label">Recetas por página</InputLabel>
                    <Select
                        labelId="items-per-page-label"
                        value={itemsPerPage}
                        label="Recetas por página"
                        onChange={(e) => {
                            setItemsPerPage(e.target.value);
                            setCurrentPage(1);
                        }}
                        sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? '#111827' : '#ffffff',
                            color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1a202c',
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.mode === 'dark' ? '#374151' : '#cbd5e1' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4a5568' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4a5568' },
                        }}
                    >
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={18}>18</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
};

export default ControlesFiltro;
