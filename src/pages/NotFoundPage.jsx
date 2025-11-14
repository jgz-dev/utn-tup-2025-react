import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const iconVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        bounce: {
            y: [0, -10, 0],
            transition: {
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '60vh',
                        textAlign: 'center',
                        py: 4,
                    }}
                >
                    <motion.div
                        variants={iconVariants}
                        initial="hidden"
                        animate={["visible", "bounce"]}
                        style={{ marginBottom: '2rem' }}
                    >
                        <ErrorIcon
                            sx={{
                                fontSize: 120,
                                color: '#cbd5e1',
                                mb: 2,
                            }}
                        />
                    </motion.div>

                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 'bold',
                            mb: 2,
                            fontSize: { xs: '3rem', sm: '4rem' },
                            color: theme.palette.mode === 'dark' ? '#f3f4f6' : '#000000',
                        }}
                    >
                        404
                    </Typography>

                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            mb: 2,
                            color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#4a5568',
                            fontSize: { xs: '1.5rem', sm: '2rem' },
                        }}
                    >
                        Receta no encontrada
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            mb: 4,
                            color: theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280',
                            maxWidth: '400px',
                            fontSize: '1.1rem',
                        }}
                    >
                        Lo sentimos, la receta que buscas no existe o ha sido removida. 
                        ¡Pero tenemos muchas otras deliciosas recetas para ti!
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/')}
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1rem',
                                backgroundColor: '#4a5568',
                                color: '#ffffff',
                                fontWeight: 600,
                                '&:hover': {
                                    backgroundColor: '#2d3748',
                                }
                            }}
                        >
                            Volver al inicio
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate('/recetas')}
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1rem',
                                borderColor: '#4a5568',
                                color: '#4a5568',
                                fontWeight: 600,
                                '&:hover': {
                                    backgroundColor: theme.palette.mode === 'dark' ? '#2d3748' : '#f0f4f8',
                                    borderColor: '#2d3748',
                                }
                            }}
                        >
                            Ver todas las recetas
                        </Button>
                    </Box>
                </Box>
            </motion.div>
        </Container>
    );
};

export default NotFoundPage;
