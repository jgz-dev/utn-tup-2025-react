import { AppBar, Toolbar, Box, Button, TextField, InputAdornment, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecetas } from "../../contexts/RecetasContext";
import { useThemeContext } from "../../contexts/ThemeContext";

export default function Navbar() {
  const {
    searchTerm,
    setSearchTerm,
    setSelectedCategory,
    setSelectedDifficulty,
    setCurrentPage,
  } = useRecetas();

  const { mode, toggleColorMode } = useThemeContext();
  const location = useLocation();
  const navigate = useNavigate();
  const isDetailPage = /^\/recetas\/[^/]+$/.test(location.pathname);
  const showSearch = location.pathname === "/recetas" || location.pathname === "/favoritos";

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleOpenMenu = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const clearForFavorites = () => {
    setSearchTerm("");
    setSelectedCategory("Todas");
    setSelectedDifficulty("Todas");
    setCurrentPage(1);
  };
  const isFavoritos = location.pathname === "/favoritos";
  const isAcerca = location.pathname === "/acerca-de";

  // Reset búsqueda/filtros al cambiar entre Recetas <-> Favoritos para evitar estados persistentes
  const prevPathRef = useRef(location.pathname);
  useEffect(() => {
    const prev = prevPathRef.current;
    const now = location.pathname;
    const switchedBetweenLists =
      (prev === "/recetas" && now === "/favoritos") ||
      (prev === "/favoritos" && now === "/recetas");
    if (switchedBetweenLists) {
      setSearchTerm("");
      setSelectedCategory("Todas");
      setSelectedDifficulty("Todas");
      setCurrentPage(1);
    }
    prevPathRef.current = now;
  }, [location.pathname, setSearchTerm, setSelectedCategory, setSelectedDifficulty, setCurrentPage]);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(90deg, #1a202c 0%, #0f1419 100%)"
            : "linear-gradient(90deg, #4a5568 0%, #2d3748 100%)",
        boxShadow: "0 2px 8px rgba(0,0,0,.15)",
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton component={Link} to="/" color="inherit" sx={{ mr: 1 }}>
            <img src="/recetas_icon.svg" alt="Logo Recetas" style={{ height: 48 }} />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Desktop */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2, ml: 'auto' }}>
          {/* Buscador desktop en Recetas y Favoritos */}
          {showSearch && (
            <Box sx={{ flexGrow: 1, maxWidth: 420, mr: 2 }}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder={isFavoritos ? "Buscar en favoritos..." : "Buscar recetas..."}
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (!isFavoritos && location.pathname !== '/recetas') navigate('/recetas');
                    if (isFavoritos && location.pathname !== '/favoritos') navigate('/favoritos');
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                    borderRadius: 1,
                    '& fieldset': { borderColor: (theme) => theme.palette.mode === 'dark' ? '#4a5568' : '#cbd5e1' },
                    '&:hover fieldset': { borderColor: '#667eea' },
                    '&.Mui-focused fieldset': { borderColor: '#667eea' },
                  },
                }}
              />
            </Box>
          )}
          
          {isAcerca ? (
            <>
              <Button color="inherit" component={Link} to="/recetas" sx={{ fontWeight: 600 }}>
                Recetas
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/favoritos"
                sx={{ fontWeight: 600 }}
                onClick={clearForFavorites}
              >
                Favoritos
              </Button>
            </>
          ) : isFavoritos ? (
            <>
              <Button color="inherit" component={Link} to="/recetas" sx={{ fontWeight: 600 }}>
                Recetas
              </Button>
              <Button color="inherit" component={Link} to="/acerca-de">
                Acerca de
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/favoritos"
                sx={{ fontWeight: 600 }}
                onClick={clearForFavorites}
              >
                Favoritos
              </Button>
              <Button color="inherit" component={Link} to="/acerca-de">
                Acerca de
              </Button>
            </>
          )}
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit" aria-label="alternar tema">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        {/* Mobile */}
        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
          <IconButton onClick={toggleColorMode} color="inherit" aria-label="alternar tema">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton
            size="large"
            aria-label="abrir menú"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
          >
            {showSearch && (
              <MenuItem disableRipple sx={{ px: 2, py: 1.5 }}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Buscar recetas..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                      borderRadius: 1,
                      '& fieldset': { borderColor: (theme) => theme.palette.mode === 'dark' ? '#4a5568' : '#cbd5e1' },
                      '&:hover fieldset': { borderColor: '#667eea' },
                      '&.Mui-focused fieldset': { borderColor: '#667eea' },
                    },
                  }}
                  onKeyDown={(e) => { if (e.key === 'Enter') { handleCloseMenu(); if (location.pathname !== '/recetas' && location.pathname !== '/favoritos') { navigate('/recetas'); } } }}
                />
              </MenuItem>
            )}
            {showSearch && (
              <MenuItem onClick={() => { setSearchTerm(''); handleCloseMenu(); }} sx={{ fontSize: '0.85rem', opacity: 0.8 }}>Limpiar búsqueda</MenuItem>
            )}
            {isAcerca
              ? [
                  <MenuItem key="recetas" component={Link} to="/recetas" onClick={handleCloseMenu}>Recetas</MenuItem>,
                  <MenuItem
                    key="favoritos"
                    component={Link}
                    to="/favoritos"
                    onClick={() => { clearForFavorites(); handleCloseMenu(); }}
                  >
                    Favoritos
                  </MenuItem>,
                ]
              : isFavoritos
              ? [
                  <MenuItem key="recetas" component={Link} to="/recetas" onClick={handleCloseMenu}>Recetas</MenuItem>,
                  <MenuItem key="acerca" component={Link} to="/acerca-de" onClick={handleCloseMenu}>Acerca de</MenuItem>,
                ]
              : [
                  <MenuItem
                    key="favoritos"
                    component={Link}
                    to="/favoritos"
                    onClick={() => { clearForFavorites(); handleCloseMenu(); }}
                  >
                    Favoritos
                  </MenuItem>,
                  <MenuItem key="acerca" component={Link} to="/acerca-de" onClick={handleCloseMenu}>Acerca de</MenuItem>,
                ]}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}