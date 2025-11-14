import { Box, Container, Typography, Button, Stack, useTheme, Card } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { useRecetas } from '../contexts/RecetasContext';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ThemeToggle from '../components/layout/ThemeToggle';
import HomeBurgerMenu from '../components/layout/HomeBurgerMenu';
import Footer from '../components/layout/Footer';

const HomePage = () => {
    const navigate = useNavigate();
    const { searchTerm, setSearchTerm, setCurrentPage } = useRecetas();
    const theme = useTheme();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const heroVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const features = [
        {
            icon: <SearchIcon sx={{ fontSize: 40 }} />,
            title: "Búsqueda Inteligente",
            description: "Encuentra recetas deliciosas usando nuestro buscador avanzado por título y categoría",
        },
        {
            icon: <FavoriteBorderIcon sx={{ fontSize: 40 }} />,
            title: "Guarda tus Favoritos",
            description: "Marca tus recetas favoritas y accede a ellas rápidamente desde cualquier dispositivo",
        },
        {
            icon: <RateReviewIcon sx={{ fontSize: 40 }} />,
            title: "Califica y Comparte",
            description: "Comparte tu experiencia calificando recetas e impresiona a otros usuarios",
        },
    ];

    return (
        <Box id="inicio" sx={{ overflowX: 'hidden', backgroundColor: theme.palette.mode === 'dark' ? '#0f1419' : '#ffffff' }}>

            {/* Theme Toggle + Burger Menu */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 20,
                    right: 20,
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                }}
            >
                <ThemeToggle />
                <HomeBurgerMenu />
            </Box>

            {/* Hero Section */}
            <motion.div
                variants={heroVariants}
                initial="hidden"
                animate="visible"
            >
                <Box
                    sx={{
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, #1a202c 0%, #0f1419 50%, #1f2937 100%)'
                            : 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
                        color: '#e2e8f0',
                        py: { xs: 10, md: 16 },
                        textAlign: 'center',
                        borderRadius: 0,
                        mx: 0,
                        mb: 0,
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Background decoration */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '-50%',
                            right: '-10%',
                            width: '400px',
                            height: '400px',
                            borderRadius: '50%',
                            backgroundColor: theme.palette.mode === 'dark' 
                                ? 'rgba(148, 163, 184, 0.15)' 
                                : 'rgba(255, 255, 255, 0.15)',
                            filter: 'blur(40px)',
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: '-30%',
                            left: '-10%',
                            width: '300px',
                            height: '300px',
                            borderRadius: '50%',
                            backgroundColor: theme.palette.mode === 'dark' 
                                ? 'rgba(71, 85, 105, 0.2)' 
                                : 'rgba(255, 255, 255, 0.12)',
                            filter: 'blur(40px)',
                        }}
                    />

                    <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Logo */}
                            <motion.div variants={itemVariants}>
                                <Box
                                    component="img"
                                    src="/recetas_icon.svg"
                                    alt="Recetas App Logo"
                                    sx={{
                                        height: { xs: 70, md: 90 },
                                        mb: 3,
                                        display: 'block',
                                        margin: '0 auto 1.5rem',
                                        filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))',
                                    }}
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Typography
                                    variant="h2"
                                    component="h1"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2,
                                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                                        letterSpacing: '-1px',
                                    }}
                                >
                                    Recetas de Cocina
                                </Typography>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        mb: 4,
                                        fontSize: { xs: '1rem', md: '1.25rem' },
                                        opacity: 0.95,
                                        fontWeight: 300,
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    Descubre, aprende y disfruta de deliciosas recetas de cocina para todas las ocasiones
                                </Typography>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={() => navigate('/recetas')}
                                        endIcon={<ArrowForwardIcon />}
                                        sx={{
                                            backgroundColor: '#cbd5e1',
                                            color: '#1a202c',
                                            fontWeight: 700,
                                            px: 5,
                                            py: 1.75,
                                            fontSize: '1.05rem',
                                            textTransform: 'none',
                                            borderRadius: '50px',
                                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                                            '&:hover': {
                                                backgroundColor: '#e2e8f0',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        Explorar Recetas
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        onClick={() => navigate('/acerca-de')}
                                        sx={{
                                            borderColor: '#cbd5e1',
                                            color: '#cbd5e1',
                                            fontWeight: 700,
                                            px: 5,
                                            py: 1.75,
                                            fontSize: '1.05rem',
                                            textTransform: 'none',
                                            borderRadius: '50px',
                                            '&:hover': {
                                                backgroundColor: 'rgba(203, 213, 225, 0.15)',
                                                borderColor: '#cbd5e1',
                                                transform: 'translateY(-2px)',
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        Conocer Más
                                    </Button>
                                </Stack>
                            </motion.div>
                        </motion.div>
                    </Container>
                </Box>
            </motion.div>

            {/* Features Section (Redesigned) */}
            <Box id="caracteristicas" sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#0f1419' : '#f7f9fc', py: 12, m: 0 }}>
                <Container maxWidth="lg">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants}>
                            <Typography
                                variant="h3"
                                component="h2"
                                sx={{
                                    textAlign: 'center',
                                    mb: 1,
                                    fontWeight: 900,
                                    fontSize: { xs: '2rem', md: '2.8rem' },
                                    color: theme.palette.mode === 'dark' ? '#f0f4f8' : '#1a202c',
                                    letterSpacing: '-0.5px',
                                }}
                            >
                                ¿Por Qué Recetas App?
                            </Typography>
                            <Box
                                sx={{
                                    height: '5px',
                                    width: '120px',
                                    backgroundColor: '#4a5568',
                                    margin: '1rem auto 2rem',
                                    borderRadius: '3px',
                                }}
                            />
                            <Typography
                                variant="body1"
                                sx={{
                                    textAlign: 'center',
                                    mb: 6,
                                    color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#4a5568',
                                    fontSize: '1.05rem',
                                    maxWidth: '700px',
                                    margin: '0 auto 3rem',
                                }}
                            >
                                Una plataforma completa para explorar, guardar y compartir tus recetas favoritas
                            </Typography>
                        </motion.div>

                                                <Grid container spacing={4} sx={{ mb: 0, justifyContent: 'center', alignItems: 'stretch' }}>
                                                    {features.map((feature, index) => (
                                                        <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex' }}>
                                                            <motion.div variants={itemVariants} style={{ width: '100%' }}>
                                                                <Card
                                                                    sx={{
                                                                        position: 'relative',
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        textAlign: 'left',
                                                                        p: 4,
                                                                        gap: 1.5,
                                                                        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                                                                        border: '1px solid',
                                                                        borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
                                                                        background: theme.palette.mode === 'dark'
                                                                            ? 'linear-gradient(145deg, #1f2937 0%, #2d3748 100%)'
                                                                            : 'linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)',
                                                                        boxShadow: theme.palette.mode === 'dark'
                                                                            ? '0 4px 14px -2px rgba(0,0,0,0.6)'
                                                                            : '0 4px 16px -2px rgba(74,85,104,0.18)',
                                                                        borderRadius: 3,
                                                                        overflow: 'hidden',
                                                                        height: '100%',
                                                                        minHeight: 220,
                                                                        width: '100%',
                                                                        '&:before': {
                                                                            content: '""',
                                                                            position: 'absolute',
                                                                            inset: 0,
                                                                            background: 'radial-gradient(circle at 30% 20%, rgba(102,126,234,0.18), transparent 60%)',
                                                                            opacity: 0,
                                                                            transition: 'opacity .35s',
                                                                        },
                                                                        '&:hover:before': { opacity: 1 },
                                                                        '&:hover': {
                                                                            transform: 'translateY(-10px)',
                                                                            boxShadow: theme.palette.mode === 'dark'
                                                                                ? '0 18px 36px -8px rgba(0,0,0,0.65)'
                                                                                : '0 22px 40px -10px rgba(74,85,104,0.25)',
                                                                            borderColor: '#667eea',
                                                                        },
                                                                    }}
                                                                >
                                                                    <Box
                                                                        sx={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            width: 64,
                                                                            height: 64,
                                                                            borderRadius: 2,
                                                                            background: theme.palette.mode === 'dark' ? 'linear-gradient(135deg,#2d3748,#1f2937)' : 'linear-gradient(135deg,#4a5568,#2d3748)',
                                                                            color: '#e2e8f0',
                                                                            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05), 0 6px 18px -6px rgba(0,0,0,0.35)',
                                                                            mb: 1,
                                                                        }}
                                                                    >
                                                                        {feature.icon}
                                                                    </Box>
                                                                    <Typography
                                                                        variant="h6"
                                                                        sx={{
                                                                            fontWeight: 800,
                                                                            fontSize: '1.15rem',
                                                                            color: theme.palette.mode === 'dark' ? '#f8fafc' : '#1a202c',
                                                                            letterSpacing: '-0.4px',
                                                                        }}
                                                                    >
                                                                        {feature.title}
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            fontSize: '0.93rem',
                                                                            lineHeight: 1.6,
                                                                            color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#4a5568',
                                                                            pr: 1,
                                                                        }}
                                                                    >
                                                                        {feature.description}
                                                                    </Typography>
                                                                    
                                                                </Card>
                                                            </motion.div>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                    </motion.div>
                </Container>
            </Box>

            {/* Stats Section */}
            <Box
                id="estadisticas"
                sx={{
                    backgroundColor: theme.palette.mode === 'dark' ? '#1a202c' : '#f7f9fc',
                    py: 12,
                    borderRadius: 0,
                    mx: 0,
                }}
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Container maxWidth="lg">
                        <Grid container spacing={6} sx={{ textAlign: 'center', justifyContent: 'center' }}>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <motion.div variants={itemVariants}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Typography
                                            variant="h2"
                                            sx={{
                                                fontWeight: 900,
                                                color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#4a5568',
                                                mb: 1,
                                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                                letterSpacing: '-1px',
                                            }}
                                        >
                                            100%
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: 800, color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1a202c', mb: 0.5 }}
                                        >
                                            Responsivo
                                        </Typography>
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#4a5568', 
                                                fontWeight: 500,
                                                fontSize: '0.95rem',
                                            }}
                                        >
                                            Todos los dispositivos
                                        </Typography>
                                    </Box>
                                </motion.div>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <motion.div variants={itemVariants}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Typography
                                            variant="h2"
                                            sx={{
                                                fontWeight: 900,
                                                color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#4a5568',
                                                mb: 1,
                                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                                letterSpacing: '-1px',
                                            }}
                                        >
                                            ✓
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: 800, color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1a202c', mb: 0.5 }}
                                        >
                                            Accesible
                                        </Typography>
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#4a5568', 
                                                fontWeight: 500,
                                                fontSize: '0.95rem',
                                            }}
                                        >
                                            Modo oscuro incluido
                                        </Typography>
                                    </Box>
                                </motion.div>
                            </Grid>
                        </Grid>
                    </Container>
                </motion.div>
            </Box>

            {/* CTA Section */}
            <Box
                id="cta"
                sx={{
                    backgroundColor: theme.palette.mode === 'dark' ? '#0f1419' : '#f7f9fc',
                    py: 12,
                    textAlign: 'center',
                }}
            >
                <Container maxWidth="md">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants}>
                            <Typography
                                variant="h3"
                                gutterBottom
                                sx={{
                                    fontWeight: 900,
                                    mb: 2,
                                    fontSize: { xs: '2rem', md: '2.8rem' },
                                    color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1a202c',
                                    letterSpacing: '-0.5px',
                                }}
                            >
                                Comienza tu Aventura Culinaria
                            </Typography>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Typography
                                variant="body1"
                                sx={{
                                    mb: 4,
                                    fontSize: '1.05rem',
                                    color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#4a5568',
                                    lineHeight: 1.7,
                                }}
                            >
                                Explora nuestra colección de recetas cuidadosamente seleccionadas y descubre nuevos sabores en tu cocina.
                            </Typography>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate('/recetas')}
                                sx={{
                                    px: 8,
                                    py: 2,
                                    fontSize: '1.05rem',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    borderRadius: '50px',
                                    background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
                                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                                    color: '#e2e8f0',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.25)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                                endIcon={<ArrowForwardIcon />}
                            >
                                Explorar Ahora
                            </Button>
                        </motion.div>
                    </motion.div>
                </Container>
            </Box>

            {/* Footer */}
            <Footer />
        </Box>
    );
};

export default HomePage;
