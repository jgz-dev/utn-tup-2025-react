import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export const ThemeContext = createContext();

export const useThemeContext = () => {
    return useContext(ThemeContext);
};

export const CustomThemeProvider = ({ children }) => {
    // Obtener el modo guardado en localStorage o usar 'light' por defecto
    const [mode, setMode] = useState(() => {
        const savedMode = localStorage.getItem('themeMode');
        return savedMode ? savedMode : 'light';
    });

    // Guardar en localStorage cada vez que cambia el modo
    useEffect(() => {
        localStorage.setItem('themeMode', mode);
    }, [mode]);

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(
        () => createTheme({
            palette: { mode },
        }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleColorMode, theme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
