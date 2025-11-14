import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { CustomThemeProvider } from './contexts/ThemeContext'
import { RecetasProvider } from './contexts/RecetasContext'
import App from './App'
import './styles/global.css'
import './styles/print.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomThemeProvider>
      <SnackbarProvider maxSnack={4} autoHideDuration={3000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <RecetasProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RecetasProvider>
      </SnackbarProvider>
    </CustomThemeProvider>
  </React.StrictMode>
)
