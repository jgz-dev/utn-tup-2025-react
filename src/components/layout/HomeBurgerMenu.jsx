import { IconButton, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeContext } from '../../contexts/ThemeContext'

export default function HomeBurgerMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const { mode } = useThemeContext()

  const handleOpen = (e) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const go = (path) => { navigate(path); handleClose() }

  return (
    <>
      <IconButton
        aria-label="menu"
        color="inherit"
        onClick={handleOpen}
        sx={{
          width: 50,
          height: 50,
          borderRadius: '12px',
          backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1',
          backdropFilter: mode === 'dark' ? 'blur(10px)' : 'none',
          border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #4a5568',
          color: mode === 'dark' ? '#e2e8f0' : '#1a202c',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': {
            backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : '#dbe1e8',
            transform: 'scale(1.1)',
            boxShadow: mode === 'dark'
              ? '0 8px 24px rgba(0, 0, 0, 0.3)'
              : '0 8px 24px rgba(74, 85, 104, 0.2)',
          },
        }}
      >
        <MenuIcon sx={{ fontSize: '1.5rem' }} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} keepMounted>
        <MenuItem onClick={() => go('/recetas')}>Recetas</MenuItem>
        <MenuItem onClick={() => go('/favoritos')}>Favoritos</MenuItem>
        <MenuItem onClick={() => go('/acerca-de')}>Acerca de</MenuItem>
      </Menu>
    </>
  )
}
