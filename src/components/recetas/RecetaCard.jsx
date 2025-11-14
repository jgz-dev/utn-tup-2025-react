import { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
  Box,
  Rating,
  IconButton,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRecetas } from '../../contexts/RecetasContext';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: custom * 0.05
    }
  }),
  hover: {
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const RecetaCard = memo(({ receta, onOpenModal, index = 0 }) => {
  const { titulo, descripcion, imagen, tiempoPreparacion, dificultad, porciones } = receta;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { isFavorite, toggleFavorite, getRatingStats } = useRecetas();
  
  // Obtener las estadísticas dinámicas de rating
  const ratingStats = getRatingStats(receta.id);

  const handleNavigateToDetailPage = useCallback((event) => {
    event.stopPropagation();
    navigate(`/recetas/${receta.id}`);
  }, [navigate, receta.id]);

  const handleToggleFavorite = useCallback((event) => {
    event.stopPropagation();
    const isAdded = toggleFavorite(receta.id);
    
    if (isAdded) {
      enqueueSnackbar('Agregado a favoritos', {
        variant: 'success',
        autoHideDuration: 2000,
      });
    } else {
      enqueueSnackbar('Removido de favoritos', {
        variant: 'info',
        autoHideDuration: 2000,
      });
    }
  }, [receta.id, toggleFavorite, enqueueSnackbar]);

  const favorite = isFavorite(receta.id);

  // Función para obtener color según dificultad (monocromatic gris/azul)
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Fácil':
        return { bg: '#4a5568', text: '#e2e8f0' };
      case 'Media':
        return { bg: '#2d3748', text: '#cbd5e1' };
      case 'Difícil':
        return { bg: '#1a202c', text: '#e2e8f0' };
      default:
        return { bg: '#4a5568', text: '#cbd5e1' };
    }
  };

  const difficultyColor = getDifficultyColor(dificultad);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      style={{ 
        height: '100%',
        display: 'flex'
      }}
    >
      <Card 
        onClick={onOpenModal}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
          border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? '#2d3748' : '#e5e7eb'}`,
          '&:hover': {
            boxShadow: (theme) => theme.palette.mode === 'dark' 
              ? '0 20px 40px rgba(0, 0, 0, 0.4)' 
              : '0 20px 40px rgba(74, 85, 104, 0.15)',
          },
        }}
      >
        {/* Contenedor de imagen con overlay */}
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            height: '200px',
          }}
        >
          <CardMedia
            component="img"
            height="200"
            src={imagen}
            alt={`Imagen de ${titulo}`}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              }
            }}
          />
          
          {/* Overlay con gradiente */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '60px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '0.75rem',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
              <Rating 
                name={`recipe-rating-${receta.id}`} 
                value={ratingStats.averageRating || 0} 
                precision={0.5} 
                readOnly 
                size="small"
                sx={{
                  '& .MuiRating-icon': {
                    filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.3))',
                  }
                }}
              />
              <Typography 
                variant="caption" 
                sx={{ color: 'white', fontWeight: 600, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
              >
                ({Number(ratingStats.averageRating || 0).toFixed(1)})
              </Typography>
            </Box>
          </Box>

          {/* Botón Favorito */}
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: 'rgba(74, 85, 104, 0.9)',
              borderRadius: '50%',
              backdropFilter: 'blur(5px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            }}
          >
            <IconButton
              size="small"
              onClick={handleToggleFavorite}
              sx={{
                color: favorite ? '#cbd5e1' : '#9ca3af',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#e2e8f0',
                  transform: 'scale(1.1)',
                },
              }}
            >
              {favorite ? <FavoriteIcon sx={{ fontSize: '1.2rem' }} /> : <FavoriteBorderIcon sx={{ fontSize: '1.2rem' }} />}
            </IconButton>
          </Box>

          {/* Badge de dificultad */}
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
            }}
          >
            <Chip
              label={dificultad}
              size="small"
              sx={{
                backgroundColor: difficultyColor.bg,
                color: difficultyColor.text,
                fontWeight: 600,
                fontSize: '0.75rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              }}
            />
          </Box>
        </Box>

        {/* Contenido */}
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', pb: 1 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div" 
            sx={{ 
              mb: 0.5, 
              minHeight: '2em',
              fontWeight: 700,
              fontSize: '1.05rem',
              color: (theme) => theme.palette.mode === 'dark' ? '#e2e8f0' : '#1a202c',
            }}
          >
            {titulo}
          </Typography>

          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2, 
              flexGrow: 1,
              fontSize: '0.9rem',
              lineHeight: 1.5,
              color: (theme) => theme.palette.mode === 'dark' ? '#cbd5e1' : '#4a5568',
            }}
          >
            {descripcion}
          </Typography>

          {/* Metadata en fila compacta */}
          <Stack 
            direction="row" 
            spacing={1.5} 
            sx={{ 
              color: 'text.secondary',
              alignItems: 'center',
              flexWrap: 'wrap',
              rowGap: 0.5,
              fontSize: '0.85rem',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <AccessTimeIcon sx={{ fontSize: '0.95rem', opacity: 0.7 }} />
              <Typography variant="caption" sx={{ fontSize: '0.8rem' }}>
                {tiempoPreparacion}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <PeopleIcon sx={{ fontSize: '0.95rem', opacity: 0.7 }} />
              <Typography variant="caption" sx={{ fontSize: '0.8rem' }}>
                {porciones} {porciones === 1 ? 'porción' : 'porciones'}
              </Typography>
            </Box>
          </Stack>
        </CardContent>

        {/* Botones */}
        <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
          <Button 
            size="small" 
            onClick={handleNavigateToDetailPage}
            fullWidth
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#4a5568' : '#cbd5e1',
              color: (theme) => theme.palette.mode === 'dark' ? '#e2e8f0' : '#1a202c',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#5a6578' : '#dbe1e8',
              }
            }}
          >
            Ver Receta
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
});

RecetaCard.displayName = 'RecetaCard';

/**
 * PropTypes - Validación de props del componente RecetaCard
 */
RecetaCard.propTypes = {
  receta: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    descripcion: PropTypes.string,
    categoria: PropTypes.string.isRequired,
    dificultad: PropTypes.oneOf(['Fácil', 'Media', 'Difícil']).isRequired,
    tiempoPreparacion: PropTypes.string,
    porciones: PropTypes.number,
  }).isRequired,
  onOpenModal: PropTypes.func.isRequired,
  index: PropTypes.number,
};

export default RecetaCard;