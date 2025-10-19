import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles'
import theme from './Theme/Theme.js'
import RTL from './Components/RTL.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import "@fontsource/vazirmatn"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RTL>
        <CssBaseline/>
        <App />
      </RTL>
    </ThemeProvider>
  </StrictMode>,
)
