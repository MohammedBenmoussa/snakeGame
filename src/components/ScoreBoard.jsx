import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import Confetti from 'react-confetti';
import Celebration from './Celebration';

const ScoreCard = ({ label, value, isHighScore }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`relative overflow-hidden rounded-xl p-6
        ${isDark 
          ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80' 
          : 'bg-gradient-to-br from-gray-100 to-gray-200/80'}
        backdrop-blur-md border
        ${isDark 
          ? 'border-gray-700/50' 
          : 'border-gray-300'}
        hover:shadow-lg transition-all duration-300`}
    >
      {/* En-tête avec icône */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">
          {isHighScore ? '👑' : '🎯'}
        </span>
        <h3 className={`text-sm font-medium
          ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {label}
        </h3>
      </div>

      {/* Score */}
      <div className="relative">
        <motion.div
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`text-4xl font-bold
            ${isHighScore 
              ? isDark 
                ? 'text-yellow-400'
                : 'text-yellow-600'
              : isDark
                ? 'text-emerald-400'
                : 'text-emerald-600'}`}
        >
          {value}
        </motion.div>
      </div>

      {/* Effet de brillance */}
      <div className={`absolute inset-0 pointer-events-none
        ${isDark
          ? 'bg-gradient-to-br from-white/[0.02] to-transparent'
          : 'bg-gradient-to-br from-white/20 to-transparent'}`}
      />
    </motion.div>
  );
};

const ScoreBoard = ({ score, highScore }) => {
  return (
    <div className="space-y-4">
      <ScoreCard 
        label="Score Actuel" 
        value={score} 
        isHighScore={false}
      />
      <ScoreCard 
        label="Meilleur Score" 
        value={highScore} 
        isHighScore={true}
      />
    </div>
  );
};

export default ScoreBoard; 