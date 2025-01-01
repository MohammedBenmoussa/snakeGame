export const checkCollision = (head, snake) => {
  // Vérifie si la tête du serpent entre en collision avec son corps
  return snake.some(
    (segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y
  );
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