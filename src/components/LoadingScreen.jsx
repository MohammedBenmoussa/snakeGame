import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const LoadingScreen = () => {
  const { isDark } = useTheme();

  return (
    <div className={`fixed inset-0 
      ${isDark 
        ? 'bg-gradient-to-br from-[#0B1120] via-[#121A2D] to-[#1B1F3B]'
        : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'}
      flex items-center justify-center z-50`}
    >
      <div className="relative">
        {/* Logo animé */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div 
            animate={{ 
              rotate: 360,
              borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 50% 50%"],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`w-24 h-24 mx-auto mb-8 border-4
              ${isDark 
                ? 'border-emerald-500 border-t-transparent shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'border-emerald-400 border-t-transparent shadow-[0_0_15px_rgba(52,211,153,0.3)]'}
              rounded-full`}
          />
        </motion.div>

        {/* Barre de progression */}
        <div className="relative">
          <div className={`h-2 w-48 rounded-full overflow-hidden
            ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`h-full rounded-full
                ${isDark 
                  ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600'
                  : 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400'}`}
            />
          </div>

          {/* Texte de chargement */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`mt-6 text-center space-y-2`}
          >
            <p className={`text-lg font-medium
              ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
              Chargement du jeu
            </p>
            <p className={`text-sm
              ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Préparez-vous à jouer !
            </p>
          </motion.div>
        </div>

        {/* Particules d'arrière-plan */}
        <div className="absolute inset-0 -z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                scale: 0
              }}
              animate={{ 
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                scale: Math.random() * 0.5 + 0.5
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className={`absolute w-2 h-2 rounded-full
                ${isDark 
                  ? 'bg-emerald-500/20'
                  : 'bg-emerald-400/20'}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 