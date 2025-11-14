import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Paper, Divider, Rating, Button, Stack, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useSnackbar } from 'notistack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PeopleIcon from '@mui/icons-material/People';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import PrintIcon from '@mui/icons-material/Print';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRecetas } from '../contexts/RecetasContext';
import { useRecipeRating } from '../hooks/useRecipeRating';
import { buttonStyles } from '../utils/buttonStyles';
import { APP_CONFIG } from '../constants/app';
import NotFoundPage from './NotFoundPage';
import IngredientesList from '../components/recetas/IngredientesList';
import PasosList from '../components/recetas/PasosList';

const RecetaDetallePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const { getRecetaById } = useRecetas();
    const receta = getRecetaById(id);

    // Usar custom hook para ratings
    const { userRating, ratingStats, isVotedThisSession, handleRatingChange } = useRecipeRating(receta?.id);

    // Compartir receta (copiar link al portapapeles)
    const handleShare = () => {
        const url = `${window.location.origin}/recetas/${receta.id}`;
        navigator.clipboard.writeText(url).then(() => {
            enqueueSnackbar(APP_CONFIG.MESSAGES.SHARE.SUCCESS, {
                variant: 'success',
                autoHideDuration: APP_CONFIG.SNACKBAR.AUTO_HIDE_DURATION,
            });
        }).catch(() => {
            enqueueSnackbar(APP_CONFIG.MESSAGES.SHARE.ERROR, {
                variant: 'error',
                autoHideDuration: APP_CONFIG.SNACKBAR.AUTO_HIDE_DURATION,
            });
        });
    };

    // Imprimir receta
    const handlePrint = () => {
        window.print();
    };

    // Mostrar página 404 si la receta no existe
    if (!receta) {
        return <NotFoundPage />;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Botón Volver - Reposicionado arriba con diseño minimalista */}
            <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{
                    mb: 3,
                    border: `2px solid ${theme.palette.mode === 'dark' ? '#9ca3af' : '#4a5568'}`,
                    padding: '10px 20px',
                    borderRadius: '8px',
                    ...buttonStyles.outlineButtonWithTransform(theme),
                }}
            >
                Volver
            </Button>

            <Paper elevation={3} sx={{
                p: { xs: 2, md: 4 },
                backgroundColor: theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
            }}>
                {/* Header con título y botones de acción */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, gap: 2, flexWrap: 'wrap' }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800, color: theme.palette.mode === 'dark' ? '#f3f4f6' : '#000000' }}>
                            {receta.titulo}
                        </Typography>
                    </Box>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                        <Button
                            variant="outlined"
                            startIcon={<ShareIcon />}
                            onClick={handleShare}
                            size="small"
                            sx={buttonStyles.outlineButton(theme)}
                        >
                            Compartir
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<PrintIcon />}
                            onClick={handlePrint}
                            size="small"
                            className="print-button"
                            sx={buttonStyles.outlineButton(theme)}
                        >
                            Imprimir
                        </Button>
                    </Stack>
                </Box>

                {/* Grid layout para imagen y info lateral */}
                <Grid container spacing={4} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        {/* Imagen destacada (oculta en impresión) */}
                        <Box
                            component="img"
                            className="no-print"
                            sx={{
                                width: '100%',
                                maxHeight: '500px',
                                objectFit: 'cover',
                                borderRadius: 2,
                                mb: 3,
                                boxShadow: theme.palette.mode === 'dark'
                                    ? '0 10px 30px rgba(0, 0, 0, 0.4)'
                                    : '0 10px 30px rgba(0, 0, 0, 0.1)',
                            }}
                            src={receta.imagen}
                            alt={`Imagen de ${receta.titulo}`}
                        />
                    </Grid>
                </Grid>

                {/* Descripción */}
                <Typography variant="body1" paragraph sx={{ fontSize: '1.05rem', lineHeight: 1.7, mb: 4 }}>
                    {receta.descripcion}
                </Typography>

                {/* Grid para Información y Calificación lado a lado */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {/* Panel de información lateral */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? '#111827' : '#f9fafb',
                            p: 3,
                            borderRadius: 2,
                            border: `1px solid ${theme.palette.mode === 'dark' ? '#374151' : '#e5e7eb'}`,
                            height: '100%',
                        }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: theme.palette.mode === 'dark' ? '#f3f4f6' : '#000000' }}>
                                Información
                            </Typography>
                            <Stack spacing={2}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <AccessTimeIcon sx={{ color: '#667eea' }} />
                                    <Box>
                                        <Typography variant="caption" sx={{ color: theme.palette.mode === 'dark' ? '#d1d5db' : '#999' }}>Tiempo</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? '#f3f4f6' : '#000000' }}>
                                            {receta.tiempoPreparacion}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <RestaurantIcon sx={{ color: '#667eea' }} />
                                    <Box>
                                        <Typography variant="caption" sx={{ color: theme.palette.mode === 'dark' ? '#d1d5db' : '#999' }}>Dificultad</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? '#f3f4f6' : '#000000' }}>
                                            {receta.dificultad}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PeopleIcon sx={{ color: '#667eea' }} />
                                    <Box>
                                        <Typography variant="caption" sx={{ color: theme.palette.mode === 'dark' ? '#d1d5db' : '#999' }}>Porciones</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? '#f3f4f6' : '#000000' }}>
                                            {receta.porciones} {receta.porciones === 1 ? 'porción' : 'porciones'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>

                    {/* Box de calificación */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        {/* Sección de calificación (oculta en impresión) */}
                        <Box className="no-print" sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? '#111827' : '#f9fafb',
                            p: 3,
                            borderRadius: 2,
                            border: `1px solid ${theme.palette.mode === 'dark' ? '#374151' : '#e5e7eb'}`,
                            height: '100%',
                        }}>
                            <Typography variant="body1" sx={{ fontWeight: 700, mb: 3, color: theme.palette.mode === 'dark' ? '#f3f4f6' : '#000000' }}>
                                ¿Qué te parece esta receta?
                            </Typography>
                            {/* Estadísticas de rating */}
                            {ratingStats.ratingCount > 0 && (
                                <Box sx={{ mb: 3, p: 2, backgroundColor: theme.palette.mode === 'dark' ? 'rgba(74, 85, 104, 0.3)' : 'rgba(255, 255, 255, 0.6)', borderRadius: 1.5, border: `1px solid ${theme.palette.mode === 'dark' ? '#4a5568' : '#a0aec0'}` }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{ textAlign: 'center', padding: '1rem', backgroundColor: theme.palette.mode === 'dark' ? 'rgba(200, 211, 225, 0.1)' : 'rgba(74, 85, 104, 0.08)', borderRadius: 1.5, minWidth: '70px' }}>
                                            <Typography variant="h5" sx={{ fontWeight: 900, color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#2d3748', fontSize: '2rem' }}>
                                                {ratingStats.averageRating.toFixed(1)}
                                            </Typography>
                                            <Rating value={ratingStats.averageRating} readOnly precision={0.5} size="small" sx={{ '& .MuiRating-icon': { color: theme.palette.mode === 'dark' ? '#fbbf24' : '#f59e0b' } }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" sx={{ display: 'block', color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#4a5568', fontWeight: 600 }}>
                                                {ratingStats.ratingCount} {ratingStats.ratingCount === 1 ? 'voto' : 'votos'}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280', mt: 0.5, display: 'block' }}>
                                                de la comunidad
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                            
                            {/* Tu calificación */}
                            <Box sx={{ p: 2, backgroundColor: theme.palette.mode === 'dark' ? 'rgba(74, 85, 104, 0.2)' : 'rgba(255, 255, 255, 0.5)', borderRadius: 1.5, border: `1px solid ${theme.palette.mode === 'dark' ? '#4a5568' : '#a0aec0'}` }}>
                                <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280', fontWeight: 600, mb: 1.5, fontSize: '0.9rem' }}>
                                    Tu calificación:
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                                    <Rating
                                        name={`user-rating-${receta.id}`}
                                        value={userRating}
                                        precision={1}
                                        onChange={handleRatingChange}
                                        disabled={isVotedThisSession}
                                        sx={{
                                            '& .MuiRating-icon': {
                                                color: isVotedThisSession ? theme.palette.mode === 'dark' ? '#9ca3af' : '#cbd5e1' : theme.palette.mode === 'dark' ? '#fbbf24' : '#f59e0b',
                                                transition: 'all 0.2s ease',
                                            }
                                        }}
                                    />
                                    {userRating > 0 && !isVotedThisSession && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 0.75, backgroundColor: theme.palette.mode === 'dark' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(245, 158, 11, 0.1)', borderRadius: 1, border: `1.5px solid ${theme.palette.mode === 'dark' ? '#fbbf24' : '#f59e0b'}`, transition: 'all 0.3s ease' }}>
                                            <CheckCircleIcon sx={{ fontSize: '1rem', color: theme.palette.mode === 'dark' ? '#fbbf24' : '#f59e0b' }} />
                                            <Typography variant="caption" sx={{ fontWeight: 700, color: theme.palette.mode === 'dark' ? '#fbbf24' : '#f59e0b', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                                                Voto registrado
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                {/* Ingredientes */}
                <IngredientesList ingredientes={receta.ingredientes} />

                <Divider sx={{ my: 4 }} />

                {/* Pasos de preparación */}
                <PasosList pasos={receta.pasos} />

                <Divider sx={{ my: 3 }} />

                {/* Botón Volver al final */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Button
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate(-1)}
                        size="large"
                        sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #323133ff 100%)',
                            fontWeight: 700,
                            px: 5,
                            py: 1.75,
                            borderRadius: '50px',
                        }}
                    >
                        Volver al Listado
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default RecetaDetallePage;
