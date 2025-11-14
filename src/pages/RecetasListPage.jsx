import RecetasList from '../components/recetas/RecetasList';
import { Typography, Box, useTheme, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useRecetas } from '../contexts/RecetasContext';
import ControlesFiltro from '../components/recetas/ControlesFiltro';
import Pagination from '@mui/material/Pagination';
import { useEffect } from 'react';


const RecetasListPage = () => {
    const theme = useTheme();
    const {
        allFilteredRecetas,
        recetas,
        currentPage,
        setCurrentPage,
        totalPages,
        shouldShowPagination,
    } = useRecetas();
    
    // Scroll to top when changing pagination page for better UX
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [currentPage]);
    
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
                        Nuestras Recetas
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
                        Explora una colección de recetas deliciosas para cada ocasión.
                    </Typography>
                </Box>
                <Container maxWidth="lg" sx={{ pb: 4 }}>
                    <Grid container spacing={4}>
                        <Grid size={12} sx={{ mb: 2 }}>
                            <ControlesFiltro />
                        </Grid>
                        <Grid size={12}>
                            {allFilteredRecetas.length > 0 ? (
                                <>
                                    <RecetasList recetas={recetas} paginar={false} />
                                    {shouldShowPagination && (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                            <Pagination
                                                count={totalPages}
                                                page={currentPage}
                                                onChange={(e, value) => setCurrentPage(value)}
                                                color="primary"
                                                size="large"
                                            />
                                        </Box>
                                    )}
                                </>
                            ) : (
                                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                                    No se encontraron recetas.
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </>
        );
    };


export default RecetasListPage;
