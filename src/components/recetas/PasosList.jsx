import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';

const PasosList = ({ pasos = [] }) => {
  const theme = useTheme();

  if (!Array.isArray(pasos) || pasos.length === 0) return null;

  return (
    <>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ mb: 3, fontWeight: 800, color: theme.palette.mode === 'dark' ? '#f3f4f6' : '#000000' }}
      >
        Pasos de Preparación
      </Typography>
      <List sx={{ mb: 4 }} className="steps-list">
        {pasos.map((paso, index) => (
          <ListItem
            key={index}
            alignItems="center"
            sx={{
              py: 2,
              px: 0,
              borderLeft: `4px solid #667eea`,
              pl: 2,
              mb: 2,
              backgroundColor: theme.palette.mode === 'dark' ? '#111827' : '#f9fafb',
              borderRadius: 1,
              p: 2,
            }}
            className="step-item"
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: '#667eea',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  flexShrink: 0,
                }}
              >
                {index + 1}
              </Box>
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1" sx={{ lineHeight: 1.6, fontWeight: 500 }}>{paso}</Typography>}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default PasosList;
