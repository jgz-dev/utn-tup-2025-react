import { Box, Container, Typography, Link, Stack, Divider } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid'
import { NavLink } from 'react-router-dom'
import { useRecetas } from '../../contexts/RecetasContext'

export default function Footer() {
  const { setSearchTerm, setSelectedCategory, setSelectedDifficulty, setCurrentPage } = useRecetas();
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Todas');
    setSelectedDifficulty('Todas');
    setCurrentPage(1);
  };
  return (
    <Box component="footer" sx={{ mt: 'auto', bgcolor: (t) => t.palette.mode === 'dark' ? '#111827' : '#f1f5f9', pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Logo + breve descripción */}
          <Grid size={{ xs: 12, md: 4 }}>
         
              <Box component={NavLink} to="/" sx={{ alignItems: 'center', textDecoration: 'none' }}>
                <Box component="img" src="/recetas_icon.svg" alt="Logo" sx={{ width: 190, height: 160 }} />
              </Box>
       
          </Grid>
          {/* Navegación */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Navegación</Typography>
            <Stack spacing={1}>
              <Link component={NavLink} to="/" underline="none" color="text.secondary">Inicio</Link>
              <Link component={NavLink} to="/recetas" onClick={clearFilters} underline="none" color="text.secondary">Recetas</Link>
              <Link component={NavLink} to="/favoritos" onClick={clearFilters} underline="none" color="text.secondary">Favoritos</Link>
              <Link component={NavLink} to="/acerca-de" underline="none" color="text.secondary">Acerca de</Link>
            </Stack>
          </Grid>
          {/* Contacto + UTN */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Contacto</Typography>
              <Stack spacing={1}>                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GitHubIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    <Link href="https://github.com/jgz-dev" target="_blank" rel="noopener" underline="hover">jgz-dev</Link>
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">Paraná, Argentina</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    jg12hg@gmail.com
                  </Typography>
                </Box>
                <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box component="img" src="/utn_logo.svg" alt="Logo UTN"
                       sx={{ height: 36, filter: (t) => t.palette.mode === 'dark' ? 'grayscale(1) invert(1)' : 'none' }} />
                  <Typography variant="body2" color="text.secondary">Universidad Tecnológica Nacional</Typography>
                </Box>
              </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" color="text.secondary">© {new Date().getFullYear()} Recetas App • Todas las recetas son ejemplos</Typography>
        </Box>
      </Container>
    </Box>
  )
}
