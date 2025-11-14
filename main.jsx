import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import App from './App.jsx'
import { RecetasProvider } from './contexts/RecetasContext.jsx'
import { CustomThemeProvider, useThemeContext } from './contexts/ThemeContext.jsx'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import './styles/global.css';
import './styles/print-styles.css';

const AppWithTheme = () => {
  const { theme } = useThemeContext();
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <App />
      </SnackbarProvider>
    </MuiThemeProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <RecetasProvider>
        <CustomThemeProvider>
          <AppWithTheme />
        </CustomThemeProvider>
      </RecetasProvider>
    </Router>
  </StrictMode>,
)
