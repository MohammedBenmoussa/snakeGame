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

const Food = ({ position, isDark }) => {
  return (
    <motion.div
      className={`absolute w-[calc(100%/20-1px)] h-[calc(100%/20-1px)]
        rounded-lg
        ${isDark 
          ? 'bg-red-500 shadow-red-500/50' 
          : 'bg-red-400 shadow-red-400/50'}
        shadow-lg`}
      style={{
        left: `${position.x * (100 / 20)}%`,
        top: `${position.y * (100 / 20)}%`,
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  );
};

export default Food; 