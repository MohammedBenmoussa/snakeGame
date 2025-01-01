import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Snake = ({ segments, isDark }) => {
  // Calculer la direction de chaque segment pour les animations
  const segmentDirections = useMemo(() => {
    return segments.map((segment, i) => {
      if (i === 0) return 'head';
      const prev = segments[i - 1];
      const curr = segment;
      
      // Déterminer si c'est un virage
      const dx = prev.x - curr.x;
      const dy = prev.y - curr.y;
      
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        // Gestion des bords
        return 'edge';
      }
      
      if (dx !== 0 && dy !== 0) {
        return 'turn';
      }
      return 'straight';
    });
  }, [segments]);

  return (
    <>
      {segments.map((segment, index) => (
        <motion.div
          key={index}
          className={`absolute w-[calc(100%/20-1px)] h-[calc(100%/20-1px)]
            rounded-lg
            ${isDark 
              ? 'bg-emerald-500 shadow-emerald-500/50' 
              : 'bg-emerald-400 shadow-emerald-400/50'}
            shadow-lg
            ${index === 0 ? 'relative' : ''}`}
          style={{
            left: `${segment.x * (100 / 20)}%`,
            top: `${segment.y * (100 / 20)}%`,
          }}
          initial={index === 0 ? { scale: 0.8 } : { scale: 0.9 }}
          animate={
            segmentDirections[index] === 'head' 
              ? { 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                  boxShadow: [
                    `0 0 10px ${isDark ? 'rgba(16, 185, 129, 0.5)' : 'rgba(52, 211, 153, 0.5)'}`,
                    `0 0 20px ${isDark ? 'rgba(16, 185, 129, 0.7)' : 'rgba(52, 211, 153, 0.7)'}`,
                    `0 0 10px ${isDark ? 'rgba(16, 185, 129, 0.5)' : 'rgba(52, 211, 153, 0.5)'}`
                  ]
                }
              : segmentDirections[index] === 'turn'
                ? {
                    scale: [0.95, 1, 0.95],
                    rotate: segment.x % 2 ? [0, 5, 0] : [0, -5, 0],
                    boxShadow: `0 0 15px ${isDark ? 'rgba(16, 185, 129, 0.3)' : 'rgba(52, 211, 153, 0.3)'}`
                  }
                : segmentDirections[index] === 'edge'
                  ? {
                      scale: [0.9, 1.1, 0.9],
                      opacity: [0.7, 1, 0.7]
                    }
                  : {
                      scale: [0.9, 0.95, 0.9],
                      rotate: segment.x % 2 ? [0, 3, 0] : [0, -3, 0]
                    }
          }
          transition={{
            duration: segmentDirections[index] === 'edge' ? 0.3 : 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * 0.1,
            ease: "easeInOut"
          }}
        >
          {/* Effet de traînée */}
          {index !== 0 && (
            <motion.div
              className="absolute inset-0 rounded-lg opacity-50"
              style={{
                background: isDark 
                  ? 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(52, 211, 153, 0.3) 0%, transparent 70%)'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}

          {/* Yeux uniquement pour la tête */}
          {index === 0 && (
            <>
              <motion.div
                className={`absolute w-[20%] h-[20%] rounded-full 
                  ${isDark ? 'bg-white' : 'bg-white'}
                  top-[20%] left-[20%]`}
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    '0 0 5px rgba(255,255,255,0.5)',
                    '0 0 10px rgba(255,255,255,0.7)',
                    '0 0 5px rgba(255,255,255,0.5)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  className="absolute w-[50%] h-[50%] rounded-full bg-black
                    top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              <motion.div
                className={`absolute w-[20%] h-[20%] rounded-full 
                  ${isDark ? 'bg-white' : 'bg-white'}
                  top-[20%] right-[20%]`}
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    '0 0 5px rgba(255,255,255,0.5)',
                    '0 0 10px rgba(255,255,255,0.7)',
                    '0 0 5px rgba(255,255,255,0.5)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  className="absolute w-[50%] h-[50%] rounded-full bg-black
                    top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </>
          )}
        </motion.div>
      ))}
    </>
  );
};

export default Snake; 