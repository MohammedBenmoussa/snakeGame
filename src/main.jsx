import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from './contexts/ThemeContext'

// Configuration pour améliorer les performances
if (process.env.NODE_ENV === 'production') {
  // Désactiver les logs en production
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

// Nettoyer le cache des images et des animations
window.addEventListener('load', () => {
  // Nettoyer le cache des images
  const images = document.getElementsByTagName('img');
  for (let i = 0; i < images.length; i++) {
    images[i].src = images[i].src;
  }

  // Forcer le garbage collector si disponible
  if (window.gc) {
    window.gc();
  }
});

// Nettoyer lors de la navigation
window.addEventListener('beforeunload', () => {
  // Nettoyer les animations
  const animations = document.querySelectorAll('.framer-motion-animation');
  animations.forEach(el => {
    if (!el.isConnected) {
      el.remove();
    }
  });
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
); 