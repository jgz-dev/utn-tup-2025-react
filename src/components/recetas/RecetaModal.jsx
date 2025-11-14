import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Rating,
  Divider,
  Chip,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useRecetas } from '../../contexts/RecetasContext';
import { useRecipeRating } from '../../hooks/useRecipeRating';

const RecetaModal = ({ receta, open, onClose }) => {
  const { getRatingStats } = useRecetas();
  const ratingStats = receta ? getRatingStats(receta.id) : { averageRating: 0, ratingCount: 0 };
  const { userRating, isVotedThisSession, handleRatingChange } = useRecipeRating(receta?.id);

  if (!receta) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ pr: 5 }}>
        {receta.titulo}
        <IconButton
          aria-label="cerrar"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box
          component="img"
          src={receta.imagen}
          alt={receta.titulo}
          sx={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 2, mb: 2 }}
        />
        <Typography variant="body1" sx={{ mb: 2 }}>
          {receta.descripcion}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', mb: 2 }}>
          <Chip icon={<AccessTimeIcon />} label={receta.tiempoPreparacion} />
          <Chip icon={<RestaurantIcon />} label={receta.dificultad} />
          <Chip icon={<PeopleIcon />} label={`${receta.porciones} ${receta.porciones === 1 ? 'porción' : 'porciones'}`} />
          <Chip label={receta.categoria} />
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
          Calificación de la comunidad
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Rating value={ratingStats.averageRating || 0} readOnly precision={0.5} />
          <Typography variant="caption">{ratingStats.ratingCount || 0} votos</Typography>
        </Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
          Tu voto
        </Typography>
        <Rating
          name={`user-rating-modal-${receta.id}`}
          value={userRating}
          onChange={handleRatingChange}
          disabled={isVotedThisSession}
          precision={1}
          sx={{ mb: 2 }}
        />
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Ingredientes</Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          {receta.ingredientes.map((ing, idx) => (
            <Typography component="li" key={idx} variant="body2">
              {ing.cantidad} {ing.unidad} - {ing.nombre}
            </Typography>
          ))}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Pasos</Typography>
        <Box component="ol" sx={{ pl: 3 }}>
          {receta.pasos.map((paso, idx) => (
            <Typography component="li" key={idx} variant="body2" sx={{ mb: 0.5 }}>
              {paso}
            </Typography>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

RecetaModal.propTypes = {
  receta: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default RecetaModal;
