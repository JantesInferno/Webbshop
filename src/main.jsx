import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './contexts/ThemeContext';
import { DBContextProvider} from './contexts/DBContext';
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { CartContextProvider } from './contexts/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={"/Webbshop"}>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <CartContextProvider>
            <DBContextProvider>
              <App />
            </DBContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
