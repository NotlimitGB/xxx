import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import LoginPage from './login.jsx'





import '@fontsource/sofia-sans/300.css';
import '@fontsource/sofia-sans/400.css';
import '@fontsource/sofia-sans/500.css';
import '@fontsource/sofia-sans/700.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <LoginPage /> */}


  </StrictMode>,
)
