import { List, ListItem, ListItemIcon, ListItemText, Typography, Box, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/**
 * IngredientesList
 * Props:
 * - ingredientes: Array<{ cantidad: string, unidad: string, nombre: string }>
 * Renderiza la lista de ingredientes con estilos coherentes a la app.
 */
const IngredientesList = ({ ingredientes = [] }) => {
  const theme = useTheme();

  if (!ingredientes || ingredientes.length === 0) {
    return null;
  }

  return (
    <>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ mb: 3, fontWeight: 800, color: theme.palette.mode === 'dark' ? '#f3f4f6' : '#000000' }}
      >
        Ingredientes
      </Typography>
      <List
        dense
        sx={{
          mb: 4,
          backgroundColor: theme.palette.mode === 'dark' ? '#111827' : '#f9fafb',
          borderRadius: 2,
          p: 2,
        }}
        className="ingredients-list"
      >
        {ingredientes.map((ingrediente, index) => (
          <ListItem key={index} sx={{ py: 1, borderRadius: 1 }} className="ingredient-item">
            <ListItemIcon sx={{ minWidth: 32, color: '#667eea' }}>
              <CheckCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={`${ingrediente.cantidad} ${ingrediente.unidad}`}
              secondary={<Typography sx={{ fontWeight: 500 }}>{ingrediente.nombre}</Typography>}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default IngredientesList;
