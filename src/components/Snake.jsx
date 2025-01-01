import React from 'react';
import { motion } from 'framer-motion';

const Snake = ({ segments, isDark }) => {
  return segments.map((segment, index) => (
    <motion.div
      key={index}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      style={{
        position: 'absolute',
        width: '28px',
        height: '28px',
        left: segment.x * 30,
        top: segment.y * 30,
        zIndex: segments.length - index,
      }}
      layoutId={`snake-segment-${index}`}
      className={`relative ${
        index === 0 
          ? isDark
            ? 'bg-gradient-to-br from-emerald-400 to-emerald-600'
            : 'bg-gradient-to-br from-light-accent-primary to-light-accent-secondary'
          : isDark
            ? 'bg-gradient-to-br from-emerald-500 to-emerald-700'
            : 'bg-gradient-to-br from-light-accent-secondary to-light-accent-primary'
      } rounded-lg shadow-lg`}
    >
      {/* Yeux (uniquement pour la tête) */}
      {index === 0 && (
        <div className="absolute top-[20%] w-full flex justify-around px-1 z-20">
          {[...Array(2)].map((_, i) => (
            <motion.div 
              key={i}
              className="w-2 h-2 bg-white rounded-full relative"
              animate={{
                scale: [1, 1.2, 1],
                boxShadow: [
                  '0 0 0px rgba(255,255,255,0.3)',
                  '0 0 4px rgba(255,255,255,0.6)',
                  '0 0 0px rgba(255,255,255,0.3)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div 
                className="absolute top-1/2 left-1/2 w-1 h-1 
                  bg-black rounded-full -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 0.8, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Effet d'écailles et de brillance */}
      <motion.div
        className="absolute inset-0 rounded-lg overflow-hidden z-10"
        animate={{
          background: [
            'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)',
            'radial-gradient(circle at 70% 70%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)',
            'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)',
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.min(index * 0.05, 0.5)
        }}
      />

      {/* Effet de halo lumineux */}
      <motion.div
        className={`absolute -inset-1 rounded-xl blur-sm z-0
          ${index === 0 ? 'bg-emerald-400/30' : 'bg-emerald-500/20'}`}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: Math.min(index * 0.05, 0.5),
          ease: "easeInOut"
        }}
      />

      {/* Effet de mouvement ondulant */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg z-10"
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.min(index * 0.05, 0.5)
        }}
      />

      {/* Effet de pulsation */}
      <motion.div
        className="absolute inset-0 rounded-lg z-10"
        animate={{
          boxShadow: [
            'inset 0 0 5px rgba(255,255,255,0.2)',
            'inset 0 0 10px rgba(255,255,255,0.3)',
            'inset 0 0 5px rgba(255,255,255,0.2)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.min(index * 0.05, 0.5)
        }}
      />
    </motion.div>
  ));
};

export default Snake; 