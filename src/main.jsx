import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'
import App from './App.jsx'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Debug logging
console.log('Environment Variables Check:');
console.log('VITE_GOOGLE_CLIENT_ID:', clientId);
console.log('All env vars:', import.meta.env);

if (!clientId) {
  console.error('VITE_GOOGLE_CLIENT_ID is not set! Check your environment variables.');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
