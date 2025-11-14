
import { Container, Typography, Box, Paper, useTheme, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const AcercaDePage = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            {/* Botón Volver */}
            <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{
                    mb: 2,
                    borderColor: theme.palette.mode === 'dark' ? '#cbd5e1' : '#4a5568',
                    color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#4a5568',
                    fontWeight: 700,
                    borderRadius: 2,
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(203, 213, 225, 0.08)' : 'rgba(74, 85, 104, 0.08)',
                        borderColor: theme.palette.mode === 'dark' ? '#cbd5e1' : '#4a5568',
                    },
                    transition: 'all 0.2s',
                }}
            >
                Volver
            </Button>
            <Paper 
                elevation={0}
                sx={{ 
                    p: 5, 
                    mt: 2,
                    backgroundColor: theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                    border: `1px solid ${theme.palette.mode === 'dark' ? '#2d3748' : '#e5e7eb'}`,
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                    <Box
                        component="img"
                        sx={{ width: 120, height: 'auto', mb: 3 }}
                        alt="Logo Recetas"
                        src="/recetas_icon.svg"
                    /> 
                    <Typography 
                        variant="h3" 
                        component="h1" 
                        gutterBottom
                        sx={{
                            fontWeight: 900,
                            color: theme.palette.mode === 'dark' ? '#f0f4f8' : '#1a202c',
                            letterSpacing: '-0.5px',
                        }}
                    >
                        Acerca de Mí
                    </Typography>
                    <Typography 
                        variant="h6" 
                        sx={{
                            color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#4a5568',
                            fontWeight: 500,
                        }}
                    >
                        Julián González
                    </Typography>
                </Box>

                <Typography 
                    variant="h4" 
                    component="h2" 
                    gutterBottom 
                    sx={{ 
                        mt: 4,
                        fontWeight: 800,
                        color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1a202c',
                        letterSpacing: '-0.3px',
                    }}
                >
                    Sobre el Proyecto "Recetas App"
                </Typography>
                <Typography 
                    variant="body1" 
                    component="p" 
                    gutterBottom
                    sx={{
                        color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#4a5568',
                        lineHeight: 1.8,
                    }}
                >
                    Esta aplicación fue desarrollada como parte del Trabajo Práctico para la materia Programación IV. El objetivo principal es demostrar las habilidades adquiridas en el desarrollo de aplicaciones web modernas utilizando React y tecnologías asociadas.
                </Typography>
                <Typography 
                    variant="body1" 
                    component="p" 
                    gutterBottom
                    sx={{
                        color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#4a5568',
                        lineHeight: 1.8,
                    }}
                >
                    La app permite a los usuarios explorar una variedad de recetas de cocina, filtrarlas por título o categoría, y ver los detalles completos de cada una, incluyendo ingredientes y pasos de preparación.
                </Typography>
                <Typography 
                    variant="body1" 
                    component="p" 
                    gutterBottom
                    sx={{
                        color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#4a5568',
                        lineHeight: 1.8,
                    }}
                >
                    Se ha puesto especial énfasis en crear una interfaz de usuario limpia, responsiva y agradable, utilizando la librería de componentes Material-UI. La gestión del estado de la aplicación se maneja de forma centralizada a través de la Context API de React para asegurar un flujo de datos predecible y mantenible.
                </Typography>
            </Paper>
        </Container>
    );
};

export default AcercaDePage;
