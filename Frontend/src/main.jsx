import {BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './features/auth/context/auth.context.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  </AuthProvider>
)
