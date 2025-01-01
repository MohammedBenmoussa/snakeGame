import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

const Celebration = () => {
  useEffect(() => {
    // Créer un son synthétique d'applaudissements
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Créer plusieurs oscillateurs pour simuler des applaudissements
    const createClap = (time) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 150 + Math.random() * 50;
      gainNode.gain.setValueAtTime(0.5, time);
      gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
      
      oscillator.start(time);
      oscillator.stop(time + 0.1);
    };

    // Jouer une séquence d'applaudissements
    const now = audioContext.currentTime;
    for (let i = 0; i < 10; i++) {
      createClap(now + i * 0.1);
    }

    return () => {
      audioContext.close();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1]"
    >
      {/* Fond avec flou léger */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />

      {/* Confetti en arrière-plan */}
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={200}
        recycle={false}
        gravity={0.1}
        opacity={0.5}
        colors={['#FFD700', '#FFA500', '#FF6347', '#FF69B4', '#4169E1', '#32CD32']}
      />

      {/* Cercles lumineux en arrière-plan */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            initial={{ scale: 0 }}
            animate={{
              scale: [0, 6],
              opacity: [0.2, 0],
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "linear"
            }}
            style={{
              width: '100px',
              height: '100px',
            }}
          />
        ))}
      </div>

      {/* Étoiles qui flottent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['✨', '⭐', '🌟'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-30"
            initial={{ y: '100vh' }}
            animate={{
              y: [null, '-100vh'],
              x: `${Math.random() * 100}%`,
              rotate: [0, 360]
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Celebration; 