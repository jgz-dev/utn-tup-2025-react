import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { Box, useTheme, Fade, CircularProgress } from '@mui/material';
import React, { Suspense, lazy, memo } from 'react';
import MainLayout from './components/layout/MainLayout';
import ScrollToTop from './components/layout/ScrollToTop';

// Code-splitting de páginas para mejorar tiempo de carga inicial
const HomePage = lazy(() => import('./pages/HomePage'));
const RecetasListPage = lazy(() => import('./pages/RecetasListPage'));
const RecetaDetallePage = lazy(() => import('./pages/RecetaDetallePage'));
const FavoritosPage = lazy(() => import('./pages/FavoritosPage'));
const AcercaDePage = lazy(() => import('./pages/AcercaDePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Componente de Layout que aplica la transición
const AnimatedLayout = memo(() => {
  const location = useLocation();
  return (
    <MainLayout>
      <Fade in={true} timeout={500} key={location.pathname}>
        <div><Outlet /></div>
      </Fade>
    </MainLayout>
  );
});

function App() {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: theme.palette.mode === 'dark' ? '#0f1419' : '#ffffff', m: 0, p: 0 }}>
      {/* Auto scroll to top on section change */}
      <ScrollToTop behavior="smooth" />
      <Suspense fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<AnimatedLayout />}>
            <Route path="/recetas" element={<RecetasListPage />} />
            <Route path="/recetas/:id" element={<RecetaDetallePage />} />
            <Route path="/favoritos" element={<FavoritosPage />} />
            <Route path="/acerca-de" element={<AcercaDePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Box>
  )
}

export default App