import React from 'react';
import { motion } from 'framer-motion';

const FOOD_ITEMS = [
  {
    emoji: "🍎",
    color: "from-red-400 to-red-600",
    glow: "red-500"
  },
  {
    emoji: "🥚",
    color: "from-yellow-100 to-yellow-200",
    glow: "yellow-200"
  },
  {
    emoji: "🍇",
    color: "from-purple-400 to-purple-600",
    glow: "purple-500"
  },
  {
    emoji: "🍊",
    color: "from-orange-400 to-orange-600",
    glow: "orange-500"
  },
  {
    emoji: "🫐",
    color: "from-blue-400 to-blue-600",
    glow: "blue-500"
  },
  {
    emoji: "🍓",
    color: "from-rose-400 to-rose-600",
    glow: "rose-500"
  }
];

const Food = ({ position }) => {
  // Choisir un aliment aléatoire
  const foodItem = React.useMemo(() => 
    FOOD_ITEMS[Math.floor(Math.random() * FOOD_ITEMS.length)],
  [position]); // Changer l'aliment à chaque nouvelle position

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      style={{
        position: 'absolute',
        width: '30px',
        height: '30px',
        left: position.x * 30,
        top: position.y * 30,
      }}
      className="relative"
    >
      {/* Cercle de fond avec glow */}
      <motion.div
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${foodItem.color}
          shadow-lg`}
        style={{
          boxShadow: `0 0 10px var(--tw-shadow-color)`,
          '--tw-shadow-color': `rgb(var(--${foodItem.glow}))`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Emoji de nourriture */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-lg"
        animate={{
          rotate: [0, 10, -10, 0],
          y: [0, -2, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {foodItem.emoji}
      </motion.div>

      {/* Effet de brillance */}
      <motion.div
        className="absolute -inset-2 rounded-full opacity-50 blur-sm"
        style={{
          background: `radial-gradient(circle, rgb(var(--${foodItem.glow}) / 0.3) 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Particules flottantes */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full bg-${foodItem.glow}/50`}
          animate={{
            y: [0, -10, 0],
            x: [0, i % 2 === 0 ? 5 : -5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
          style={{
            left: '50%',
            bottom: '100%',
          }}
        />
      ))}
    </motion.div>
  );
};

export default Food; 