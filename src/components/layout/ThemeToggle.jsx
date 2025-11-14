import { IconButton, Box } from '@mui/material';
import { useThemeContext } from '../../contexts/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { motion } from 'framer-motion';

const ThemeToggle = ({ sx = {} }) => {
    const { mode, toggleColorMode } = useThemeContext();

    const toggleVariants = {
        light: { rotate: 0, scale: 1 },
        dark: { rotate: 180, scale: 1 },
    };

    return (
        <motion.div
            initial="light"
            animate={mode === 'dark' ? 'dark' : 'light'}
            variants={toggleVariants}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
            <Box
                sx={{
                    position: 'relative',
                    ...sx,
                }}
            >
                <IconButton
                    onClick={toggleColorMode}
                    sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '12px',
                        backgroundColor: mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.1)'
                            : '#cbd5e1',
                        backdropFilter: mode === 'dark' ? 'blur(10px)' : 'none',
                        border: mode === 'dark' 
                            ? '1px solid rgba(255, 255, 255, 0.2)'
                            : '1px solid #4a5568',
                        color: mode === 'dark' ? '#e2e8f0' : '#1a202c',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover': {
                            backgroundColor: mode === 'dark'
                                ? 'rgba(255, 255, 255, 0.15)'
                                : '#dbe1e8',
                            transform: 'scale(1.1)',
                            boxShadow: mode === 'dark'
                                ? '0 8px 24px rgba(0, 0, 0, 0.3)'
                                : '0 8px 24px rgba(74, 85, 104, 0.2)',
                        },
                    }}
                >
                    {mode === 'dark' ? (
                        <LightModeIcon sx={{ fontSize: '1.5rem' }} />
                    ) : (
                        <DarkModeIcon sx={{ fontSize: '1.5rem' }} />
                    )}
                </IconButton>
            </Box>
        </motion.div>
    );
};

export default ThemeToggle;
