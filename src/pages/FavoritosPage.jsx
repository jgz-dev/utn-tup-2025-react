import { useMemo, useCallback } from 'react';
import { Container, Typography, Box, useTheme, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RecetasList from '../components/recetas/RecetasList';
import { useRecetas } from '../contexts/RecetasContext';

const FavoritosPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { allRecetas, isFavorite, searchTerm, setSearchTerm, setSelectedCategory, setSelectedDifficulty, setCurrentPage } = useRecetas();

    const normalize = useCallback((str) => (str || '')
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''), []);

    // Filtrar solo las recetas favoritas de TODAS las recetas
    const favoritRecetas = useMemo(() => {
        const base = allRecetas.filter(receta => isFavorite(receta.id));
        const q = normalize(searchTerm).trim();
        if (!q) return base;
        return base.filter(r => {
            const title = normalize(r.titulo);
            const words = title.split(/[^a-z0-9ñü]+/);
            return words.some(w => w.startsWith(q));
        });
    }, [allRecetas, isFavorite, searchTerm, normalize]);

    return (
        <>
            <Box 
                sx={{ 
                    my: 5,
                    backgroundColor: theme.palette.mode === 'dark' ? '#0f1419' : '#f7f9fc',
                    py: 6,
                    mb: 6,
                }}
            >
                <Container maxWidth="lg">
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('Todas');
                            setSelectedDifficulty('Todas');
                            setCurrentPage(1);
                            navigate(-1);
                        }}
                        sx={{
                            mb: 3,
                            border: `2px solid ${theme.palette.mode === 'dark' ? '#9ca3af' : '#4a5568'}`,
                            padding: '10px 20px',
                            borderRadius: '8px',
                            color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#4a5568',
                            '&:hover': {
                                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(229, 231, 235, 0.1)' : 'rgba(74, 85, 104, 0.05)',
                            },
                        }}
                    >
                        Volver
                    </Button>
                </Container>
                <Typography 
                    variant="h2" 
                    component="h1" 
                    align="center" 
                    gutterBottom
                    sx={{
                        fontWeight: 900,
                        color: theme.palette.mode === 'dark' ? '#f0f4f8' : '#1a202c',
                        fontSize: { xs: '2rem', md: '3rem' },
                        letterSpacing: '-0.5px',
                    }}
                >
                    Mis Favoritos
                </Typography>
                <Typography 
                    variant="h6" 
                    component="p" 
                    align="center" 
                    sx={{
                        color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#4a5568',
                        fontSize: '1.05rem',
                        fontWeight: 500,
                    }}
                >
                    {favoritRecetas.length === 0 
                        ? 'Aún no tienes recetas guardadas como favoritas.'
                        : `Tienes ${favoritRecetas.length} receta${favoritRecetas.length !== 1 ? 's' : ''} guardada${favoritRecetas.length !== 1 ? 's' : ''} como favorita${favoritRecetas.length !== 1 ? 's' : ''}.`
                    }
                </Typography>
            </Box>

            {favoritRecetas.length > 0 ? (
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <RecetasList recetas={favoritRecetas} paginar={false} />
                </Container>
            ) : (
                <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
                    <Typography 
                        variant="h6" 
                        sx={{
                            color: theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280',
                            fontWeight: 500,
                        }}
                    >
                        Comienza a agregar recetas a favoritos para verlas aquí.
                    </Typography>
                </Container>
            )}
        </>
    );
};

export default FavoritosPage;
