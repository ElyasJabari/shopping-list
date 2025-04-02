import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import ShoppingList from './components/Shoppinglist.jsx'

// PWA Registrierung
function useRegisterSW() {
  useEffect(() => {
    if (import.meta.env.PROD && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('ServiceWorker registriert');
        })
        .catch(err => {
          console.log('ServiceWorker Registration fehlgeschlagen:', err);
        });
    }
  }, []);
}

const App = () => {
  useRegisterSW();
  
  return (
    <StrictMode>
      <ShoppingList />
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<App />);