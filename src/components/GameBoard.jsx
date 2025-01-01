import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import Snake from './Snake';
import Food from './Food';
import Celebration from './Celebration';

const GameBoard = ({ snake, food, showCelebration }) => {
  const { isDark } = useTheme();

  return (
    <div className="relative">
      {/* Célébration en arrière-plan du GameBoard */}
      <AnimatePresence>
        {showCelebration && <Celebration />}
      </AnimatePresence>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`relative w-full aspect-square max-w-[600px] rounded-3xl overflow-hidden z-10
          ${isDark 
            ? 'bg-[#151B2E]/90 backdrop-blur-xl' 
            : 'bg-gray-100/95 backdrop-blur-md'}
          border ${isDark ? 'border-[#2A3347]' : 'border-gray-300'}
          ${isDark 
            ? 'shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)]' 
            : 'shadow-[0_0_50px_-12px_rgba(107,114,128,0.25)]'}`}
      >
        {/* Grille */}
        <div className="absolute inset-0">
          <AnimatePresence>
            {Array.from({ length: 400 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.001 }}
                className={`absolute w-[28px] h-[28px] border
                  ${isDark 
                    ? 'border-[#1F2B45]/50' 
                    : 'border-gray-200'}
                  ${(Math.floor(i / 20) + (i % 20)) % 2 === 0 
                    ? isDark 
                      ? 'bg-[#1A2337]/30' 
                      : 'bg-gray-200/50'
                    : isDark 
                      ? 'bg-[#1A2337]/10' 
                      : 'bg-gray-100/50'}`}
                style={{
                  left: (i % 20) * 30,
                  top: Math.floor(i / 20) * 30,
                }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Effet de néon subtil */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute inset-0 
            ${isDark 
              ? 'bg-gradient-to-br from-emerald-500/[0.02] via-transparent to-emerald-500/[0.02]' 
              : 'bg-gradient-to-br from-gray-400/[0.05] via-transparent to-gray-500/[0.05]'}`} 
          />
        </div>

        {/* Serpent et Nourriture */}
        <div className="relative z-10">
          <Snake segments={snake} isDark={isDark} />
          <Food position={food} isDark={isDark} />
        </div>

        {/* Effet de brillance supplémentaire */}
        <div className={`absolute inset-0 pointer-events-none
          ${isDark 
            ? 'bg-gradient-to-t from-black/10 via-transparent to-white/5' 
            : 'bg-gradient-to-t from-gray-200/20 via-transparent to-white/20'}`} 
        />
      </motion.div>
    </div>
  );
};

export default GameBoard; 