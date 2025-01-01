import React, { useState, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const GRID_SIZE = {
  width: Math.ceil(window.innerWidth / 30),
  height: Math.ceil(window.innerHeight / 30)
};

const CELL_SIZE = {
  width: window.innerWidth / GRID_SIZE.width,
  height: window.innerHeight / GRID_SIZE.height
};

const INITIAL_SNAKES = Array.from({ length: 8 }, (_, i) => {
  const edge = i % 4;
  const offset = Math.floor(i / 4) * (GRID_SIZE.width / 4);
  switch (edge) {
    case 0: return [{ x: offset, y: 0 }]; // Haut
    case 1: return [{ x: GRID_SIZE.width - 1 - offset, y: 0 }]; // Haut droite
    case 2: return [{ x: offset, y: GRID_SIZE.height - 1 }]; // Bas
    case 3: return [{ x: GRID_SIZE.width - 1 - offset, y: GRID_SIZE.height - 1 }]; // Bas droite
  }
});

const INITIAL_FOODS = Array.from({ length: 15 }, () => ({
  x: Math.floor(Math.random() * GRID_SIZE.width),
  y: Math.floor(Math.random() * GRID_SIZE.height),
  id: Math.random()
}));

const DemoSnake = () => {
  const [snakes, setSnakes] = useState(INITIAL_SNAKES);
  const [foods, setFoods] = useState(INITIAL_FOODS);
  const [gridCells] = useState(
    Array.from({ length: GRID_SIZE.width * GRID_SIZE.height }, (_, i) => ({
      x: i % GRID_SIZE.width,
      y: Math.floor(i / GRID_SIZE.width)
    }))
  );

  const generateFood = (snakePositions) => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE.width),
      y: Math.floor(Math.random() * GRID_SIZE.height),
      id: Math.random()
    };
    if (snakePositions.some(pos => pos.x === newFood.x && pos.y === newFood.y)) {
      return generateFood(snakePositions);
    }
    return newFood;
  };

  // Mise à jour du jeu avec plusieurs serpents
  useEffect(() => {
    const gameLoop = setInterval(() => {
      setSnakes(prevSnakes => {
        return prevSnakes.map((snake, snakeIndex) => {
          const head = snake[0];
          // Trouver la nourriture la plus proche
          const nearestFood = foods.reduce((nearest, current) => {
            const currentDist = Math.hypot(head.x - current.x, head.y - current.y);
            const nearestDist = Math.hypot(head.x - nearest.x, head.y - nearest.y);
            return currentDist < nearestDist ? current : nearest;
          });

          // Direction plus fluide vers la nourriture
          const dx = nearestFood.x - head.x;
          const dy = nearestFood.y - head.y;
          
          let newDirection;
          if (Math.random() < 0.9) { // 90% du temps, suivre la nourriture
            if (Math.abs(dx) > Math.abs(dy)) {
              newDirection = { x: dx > 0 ? 1 : -1, y: 0 };
            } else {
              newDirection = { x: 0, y: dy > 0 ? 1 : -1 };
            }
          } else { // 10% du temps, mouvement aléatoire
            const directions = [
              { x: 1, y: 0 }, { x: -1, y: 0 },
              { x: 0, y: 1 }, { x: 0, y: -1 }
            ];
            newDirection = directions[Math.floor(Math.random() * directions.length)];
          }

          const newHead = {
            x: (head.x + newDirection.x + GRID_SIZE.width) % GRID_SIZE.width,
            y: (head.y + newDirection.y + GRID_SIZE.height) % GRID_SIZE.height
          };

          // Vérifier si le serpent mange
          const foodEaten = foods.find(f => f.x === newHead.x && f.y === newHead.y);
          if (foodEaten) {
            setFoods(prevFoods => {
              const newFoods = prevFoods.filter(f => f !== foodEaten);
              newFoods.push(generateFood(snake));
              return newFoods;
            });
            return [newHead, ...snake];
          }

          return [newHead, ...snake.slice(0, -1)];
        });
      });
    }, 100); // Vitesse augmentée

    return () => clearInterval(gameLoop);
  }, [foods]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="relative w-full h-full bg-gray-900/30 backdrop-blur-sm">
        {/* Grille avec effet de profondeur */}
        {gridCells.map((cell, i) => (
          <div
            key={i}
            className={`absolute border border-white/5 transition-colors duration-1000
              ${(cell.x + cell.y) % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'}`}
            style={{
              width: CELL_SIZE.width,
              height: CELL_SIZE.height,
              left: cell.x * CELL_SIZE.width,
              top: cell.y * CELL_SIZE.height,
              transform: `scale(${1 - (cell.x + cell.y) / (GRID_SIZE.width + GRID_SIZE.height) * 0.1})`,
            }}
          />
        ))}

        {/* Nourriture avec effet de pulsation */}
        {foods.map((food, i) => (
          <motion.div
            key={food.id}
            className="absolute bg-emerald-400/50 rounded-full"
            style={{
              width: Math.min(CELL_SIZE.width, CELL_SIZE.height) - 4,
              height: Math.min(CELL_SIZE.width, CELL_SIZE.height) - 4,
              left: food.x * CELL_SIZE.width + 2,
              top: food.y * CELL_SIZE.height + 2,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Serpents avec effet de traînée */}
        {snakes.map((snake, snakeIndex) => (
          snake.map((segment, i) => (
            <motion.div
              key={`snake-${snakeIndex}-${i}`}
              className={`absolute rounded-full
                ${i === 0 
                  ? 'bg-gradient-to-r from-emerald-400/70 to-emerald-600/70' 
                  : 'bg-gradient-to-r from-emerald-500/40 to-emerald-700/40'}`}
              style={{
                width: Math.min(CELL_SIZE.width, CELL_SIZE.height) - 2,
                height: Math.min(CELL_SIZE.width, CELL_SIZE.height) - 2,
                left: segment.x * CELL_SIZE.width + 1,
                top: segment.y * CELL_SIZE.height + 1,
                zIndex: 1000 - i,
                filter: `blur(${i * 0.5}px)`,
              }}
              animate={{
                scale: i === 0 ? [1, 1.1, 1] : 1 - (i * 0.02),
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: snakeIndex * 0.1,
              }}
            />
          ))
        ))}
      </div>
    </div>
  );
};

// Exportons le SnakeIcon pour pouvoir l'utiliser ailleurs
export const SnakeIcon = () => {
  return (
    <motion.div 
      className="w-48 h-48 relative mx-auto mb-8"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", duration: 1 }}
    >
      {/* Corps du serpent */}
      <motion.div
        className="absolute w-full h-full"
        animate={{
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Tête */}
        <motion.div 
          className="absolute top-1/4 left-1/2 w-24 h-24 -translate-x-1/2
            bg-gradient-to-br from-emerald-400 to-emerald-600 
            rounded-2xl shadow-lg shadow-emerald-500/30"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Yeux */}
          <div className="absolute top-4 left-4 w-4 h-4 bg-white rounded-full">
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-black rounded-full 
              -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="absolute top-4 right-4 w-4 h-4 bg-white rounded-full">
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-black rounded-full 
              -translate-x-1/2 -translate-y-1/2" />
          </div>
          {/* Langue */}
          <motion.div
            className="absolute bottom-2 left-1/2 -translate-x-1/2"
            animate={{
              scaleY: [1, 1.5, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-1 h-4 bg-red-500 mx-auto" />
            <div className="flex -mt-1">
              <div className="w-1 h-2 bg-red-500 rotate-45" />
              <div className="w-1 h-2 bg-red-500 -rotate-45" />
            </div>
          </motion.div>
        </motion.div>

        {/* Corps segments */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 
              rounded-2xl shadow-lg shadow-emerald-600/20"
            initial={{ scale: 1 }}
            animate={{
              scale: [1, 1.05, 1],
              y: [0, -2, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              top: '40%',
              left: `${50 + (i + 1) * 15}%`,
              opacity: 1 - (i * 0.2),
              zIndex: -i,
            }}
          />
        ))}
      </motion.div>

      {/* Effet de brillance */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-400/10 
        to-transparent rounded-full animate-pulse" />
    </motion.div>
  );
};

const StartScreen = ({ onStartGame }) => {
  const { isDark } = useTheme();

  return (
    <div className={`relative min-h-screen overflow-hidden
      ${isDark 
        ? 'bg-gradient-to-br from-[#0B1120] via-[#121A2D] to-[#1B1F3B]'
        : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'}`}
    >
      <DemoSnake />

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.div 
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className={`max-w-2xl backdrop-blur-xl p-12 rounded-2xl 
            ${isDark 
              ? 'bg-gray-900/30 border border-gray-700/50' 
              : 'bg-white/30 border border-white/50'}
            shadow-2xl`}
        >
          <SnakeIcon />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-xl text-center mb-8
              ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Le classique jeu du serpent revisité avec un design moderne.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`bg-gradient-to-br rounded-xl p-6 mb-8
              ${isDark 
                ? 'from-gray-800/50 to-gray-900/50 border border-gray-700/50' 
                : 'from-white/50 to-white/30 border border-white/50'}`}
          >
            <h2 className={`text-xl font-semibold mb-4
              ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              Comment jouer :
            </h2>
            <ul className="space-y-3">
              {[
                '🎮 Utilisez les flèches ou WASD pour diriger le serpent',
                '🍎 Mangez la nourriture pour grandir',
                '⚡ Évitez de vous mordre la queue',
                '🏆 Battez votre meilleur score'
              ].map((text, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  {text}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartGame}
            className="w-full px-8 py-4 bg-gradient-to-r from-emerald-400 to-emerald-600 
              text-white text-xl font-bold rounded-xl shadow-lg shadow-emerald-500/20
              hover:shadow-emerald-500/30 transition-all duration-200"
          >
            Jouer
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default StartScreen; 