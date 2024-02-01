import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './contexts/ThemeContext';
import { AppContextProvider} from './contexts/AppContext';
import { DBContextProvider} from './contexts/DBContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppContextProvider>
          <DBContextProvider>
            <App />
          </DBContextProvider>
        </AppContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
