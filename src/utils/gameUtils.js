import { GRID_SIZE } from '../constants/gameConstants';

export const checkCollision = (head, snake) => {
  // Vérifie si la tête du serpent entre en collision avec son corps
  // en tenant compte des bordures
  return snake.some((segment, index) => {
    if (index === 0) return false;
    
    // Vérifier la collision normale
    if (segment.x === head.x && segment.y === head.y) return true;

    // Vérifier la collision près des bordures
    const wrappedX = (segment.x + GRID_SIZE) % GRID_SIZE;
    const wrappedY = (segment.y + GRID_SIZE) % GRID_SIZE;
    
    return wrappedX === head.x && wrappedY === head.y;
  });
};

export const generateFood = (snake, gridSize) => {
  while (true) {
    const food = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
    
    // Vérifie que la nourriture n'apparaît pas sur le serpent
    if (!snake.some(segment => segment.x === food.x && segment.y === food.y)) {
      return food;
    }
  }
}; 