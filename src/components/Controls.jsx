import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const KEYS_MAP = {
  'w': 'up',
  'arrowup': 'up',
  'a': 'left',
  'arrowleft': 'left',
  's': 'down',
  'arrowdown': 'down',
  'd': 'right',
  'arrowright': 'right'
};

const ControlButton = ({ onClick, direction, icon, keyLabel, className = "", isActive }) => {
  const { isDark } = useTheme();

  return (
    <motion.button
      animate={{
        scale: isActive ? 1.2 : 1,
        backgroundColor: isActive 
          ? isDark 
            ? 'rgba(16, 185, 129, 0.4)' 
            : 'rgba(75, 85, 99, 0.2)'
          : 'transparent',
        boxShadow: isActive 
          ? isDark 
            ? '0 0 20px rgba(16, 185, 129, 0.4)' 
            : '0 0 20px rgba(75, 85, 99, 0.2)'
          : 'none'
      }}
      whileHover={{
        scale: isActive ? 1.2 : 1.1,
        backgroundColor: isDark 
          ? 'rgba(16, 185, 129, 0.2)' 
          : 'rgba(75, 85, 99, 0.1)'
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: isActive ? 10 : 25
      }}
      className={`relative w-14 h-14 rounded-2xl border-2 
        ${isDark 
          ? 'border-emerald-500/30 hover:border-emerald-500/50' 
          : 'border-gray-400/30 hover:border-gray-500/50'}
        flex items-center justify-center group ${className}`}
      onMouseDown={() => onClick(direction)}
      onTouchStart={() => onClick(direction)}
    >
      {/* Icône avec animation */}
      <motion.span 
        animate={{
          scale: isActive ? 1.2 : 1,
          rotate: isActive ? [0, 5, -5, 0] : 0
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 10 },
          rotate: { duration: 0.5, repeat: isActive ? Infinity : 0 }
        }}
        className={`text-2xl ${isDark ? 'text-emerald-400' : 'text-gray-600'}`}
      >
        {icon}
      </motion.span>

      {/* Touche */}
      <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 
        text-xs font-medium rounded-md backdrop-blur-sm
        ${isDark 
          ? 'bg-gray-800/90 text-emerald-400' 
          : 'bg-white/90 text-gray-600 border border-gray-200'}
        opacity-0 group-hover:opacity-100 transition-opacity`}>
        {keyLabel}
      </div>

      {/* Effets visuels quand actif */}
      {isActive && (
        <>
          {/* Effet de brillance pulsé */}
          <motion.div
            animate={{
              opacity: [0.6, 0.8, 0.6],
              scale: [1.2, 1.3, 1.2]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute inset-0 rounded-2xl 
              ${isDark 
                ? 'bg-gradient-to-r from-emerald-500/20 to-emerald-400/20' 
                : 'bg-gradient-to-r from-gray-400/20 to-gray-300/20'} 
              blur-md`}
          />

          {/* Effet de pulsation en arrière-plan */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute inset-0 rounded-2xl
              ${isDark 
                ? 'bg-emerald-500/20' 
                : 'bg-gray-400/20'}`}
          />
        </>
      )}
    </motion.button>
  );
};

const Controls = ({ onDirectionChange }) => {
  const { isDark } = useTheme();
  const [activeDirection, setActiveDirection] = useState(null);

  // Gestion des événements clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      const direction = KEYS_MAP[e.key.toLowerCase()];
      if (direction) {
        setActiveDirection(direction);
        onDirectionChange(direction);
      }
    };

    const handleKeyUp = (e) => {
      const direction = KEYS_MAP[e.key.toLowerCase()];
      if (direction && activeDirection === direction) {
        setActiveDirection(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onDirectionChange, activeDirection]);

  return (
    <div className="relative">
      <div className={`p-8 rounded-2xl
        ${isDark 
          ? 'bg-gray-800/50' 
          : 'bg-gray-100/70'}
        backdrop-blur-sm`}
      >
        {/* Titre */}
        <h3 className={`text-center mb-8 font-medium text-sm uppercase tracking-wider
          ${isDark ? 'text-emerald-400' : 'text-gray-600'}`}>
          Contrôles
        </h3>

        {/* Conteneur des contrôles */}
        <div className="relative w-[180px] h-[180px] mx-auto">
          {/* Cercle décoratif */}
          <div className={`absolute inset-0 rounded-full 
            ${isDark 
              ? 'bg-gray-700/30' 
              : 'bg-gray-200/50'} 
            backdrop-blur-sm border-2 
            ${isDark 
              ? 'border-gray-600/30' 
              : 'border-gray-300/50'}`} 
          />

          {/* Grille de boutons */}
          <div className="absolute inset-0">
            {/* Boutons avec état actif */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <ControlButton
                direction="up"
                icon="⬆️"
                keyLabel="W"
                onClick={onDirectionChange}
                isActive={activeDirection === 'up'}
              />
            </div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
              <ControlButton
                direction="left"
                icon="⬅️"
                keyLabel="A"
                onClick={onDirectionChange}
                isActive={activeDirection === 'left'}
              />
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <ControlButton
                direction="right"
                icon="➡️"
                keyLabel="D"
                onClick={onDirectionChange}
                isActive={activeDirection === 'right'}
              />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <ControlButton
                direction="down"
                icon="⬇️"
                keyLabel="S"
                onClick={onDirectionChange}
                isActive={activeDirection === 'down'}
              />
            </div>
            {/* Point central */}
            <div className={`absolute inset-0 m-auto w-4 h-4 rounded-full
              ${isDark 
                ? 'bg-emerald-500/30' 
                : 'bg-gray-400/30'}`} 
            />
          </div>
        </div>
      </div>

      {/* Effet de halo */}
      <div className={`absolute inset-0 
        ${isDark 
          ? 'bg-gradient-to-r from-emerald-500/5 to-emerald-400/5' 
          : 'bg-gradient-to-r from-gray-400/5 to-gray-300/5'}
        blur-xl -z-10 rounded-2xl`} 
      />
    </div>
  );
};

export default Controls; 