import { useEffect } from 'react';
import { DIRECTIONS } from '../constants/gameConstants';

export const useSwipeControls = (handleDirectionChange) => {
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    const minSwipeDistance = 50; // Distance minimum pour détecter un swipe

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!touchStartX || !touchStartY) return;

      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      // Vérifier si le mouvement est assez long pour être considéré comme un swipe
      if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) return;

      // Déterminer la direction principale du swipe
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Mouvement horizontal
        if (deltaX > 0) {
          handleDirectionChange(DIRECTIONS.RIGHT);
        } else {
          handleDirectionChange(DIRECTIONS.LEFT);
        }
      } else {
        // Mouvement vertical
        if (deltaY > 0) {
          handleDirectionChange(DIRECTIONS.DOWN);
        } else {
          handleDirectionChange(DIRECTIONS.UP);
        }
      }

      // Réinitialiser les positions
      touchStartX = 0;
      touchStartY = 0;
    };

    const handleTouchEnd = () => {
      touchStartX = 0;
      touchStartY = 0;
    };

    // Ajouter les event listeners
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    // Cleanup
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleDirectionChange]);
}; 