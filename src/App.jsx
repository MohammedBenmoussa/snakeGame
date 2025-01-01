import React, { useState, useEffect, Suspense, useRef } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Settings from './components/Settings';
import { useGameLogic } from './hooks/useGameLogic';
import { SnakeIcon } from './components/StartScreen';
import { motion, AnimatePresence } from 'framer-motion';
import Celebration from './components/Celebration';
import { useSoundEffects } from './hooks/useSoundEffects';
import TouchControls from './components/TouchControls';

// Importation dynamique des composants
const GameBoard = React.lazy(() => import('./components/GameBoard'));
const ScoreBoard = React.lazy(() => import('./components/ScoreBoard'));
const Controls = React.lazy(() => import('./components/Controls'));
const StartScreen = React.lazy(() => import('./components/StartScreen'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(50);
  const [difficulty, setDifficulty] = useState('medium');
  const [highScore, setHighScore] = useState(() => {
    // Initialiser le highScore depuis localStorage
    return parseInt(localStorage.getItem('highScore') || '0');
  });
  const [showCelebration, setShowCelebration] = useState(false);
  const prevHighScore = useRef(highScore);

  const { snake, food, score, gameOver, resetGame, handleDirectionButton } = useGameLogic();
  const { playNewRecordSound } = useSoundEffects();

  // Détecter quand le serpent mange
  useEffect(() => {
    if (score > 0 && score !== prevHighScore.current) {
      setShowCelebration(true);
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 2000); // Durée plus courte pour ne pas trop gêner le jeu
      
      return () => clearTimeout(timer);
    }
    prevHighScore.current = score;
  }, [score]); // On surveille uniquement le score

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2600);
    return () => clearTimeout(timer);
  }, []);

  // Nettoyage périodique de la mémoire
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      // Nettoyer le DOM des animations terminées
      const animations = document.querySelectorAll('.framer-motion-animation');
      animations.forEach(el => {
        if (!el.isConnected) {
          el.remove();
        }
      });

      // Forcer le garbage collector si disponible
      if (window.gc) {
        window.gc();
      }
    }, 30000);

    return () => clearInterval(cleanupInterval);
  }, []);

  // Nettoyage lors du game over
  useEffect(() => {
    if (gameOver) {
      // Nettoyer les animations
      const cleanup = setTimeout(() => {
        const animations = document.querySelectorAll('.framer-motion-animation');
        animations.forEach(el => {
          if (!el.isConnected) {
            el.remove();
          }
        });

        if (window.gc) {
          window.gc();
        }
      }, 100);

      return () => clearTimeout(cleanup);
    }
  }, [gameOver]);

  // Nettoyage lors du changement d'écran
  useEffect(() => {
    return () => {
      // Nettoyer les animations au démontage
      const animations = document.querySelectorAll('.framer-motion-animation');
      animations.forEach(el => {
        if (!el.isConnected) {
          el.remove();
        }
      });

      if (window.gc) {
        window.gc();
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    if (score > highScore && score !== 0) {
      setHighScore(score);
      localStorage.setItem('highScore', score.toString());
      setShowCelebration(true);
      playNewRecordSound(); // Son de nouveau record
      
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [score, highScore, playNewRecordSound]);

  const handleStartGame = () => {
    setIsPlaying(true);
    resetGame();
  };

  const handleQuitGame = () => {
    setIsPlaying(false);
    setScore(0);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isPlaying) {
    return <StartScreen onStartGame={handleStartGame} />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200
        dark:from-[#0B1120] dark:via-[#121A2D] dark:to-[#1B1F3B] transition-colors duration-300">
        
        {/* Grille de fond */}
        <div className="fixed inset-0 bg-grid-light/[0.03] dark:bg-grid-dark/[0.02]" />
        
        {/* Effet de brillance */}
        <div className="fixed inset-0 bg-gradient-to-tr from-gray-400/5 via-transparent to-gray-500/5 
          dark:from-emerald-400/0 dark:via-transparent dark:to-emerald-400/5 pointer-events-none" />

        {/* Célébration en arrière-plan */}
        <AnimatePresence>
          {showCelebration && <Celebration />}
        </AnimatePresence>

        {/* Layout principal */}
        <div className="relative min-h-screen flex flex-col max-w-[1600px] mx-auto">
          {/* En-tête avec petit snake et bouton menu */}
          <header className={`py-2 sm:py-4 relative z-10 transition-all duration-300
            ${showCelebration ? 'blur-sm' : ''}`}>
            <motion.button
              onClick={handleQuitGame}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              className="absolute left-6 sm:left-8 top-1/2 -translate-y-1/2 
                px-4 py-2 sm:px-5 sm:py-2.5
                bg-gradient-to-r from-light-accent-primary to-light-accent-secondary
                dark:from-violet-500/90 dark:to-violet-700/90 
                rounded-lg backdrop-blur-md shadow-lg 
                text-white font-medium
                border border-light-accent-primary/20 dark:border-violet-400/20
                transition-all duration-200 
                flex items-center gap-2 group"
            >
              <motion.span
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="text-lg"
              >
                🎮
              </motion.span>
              <span className="relative">
                Menu
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 
                  bg-gradient-to-r from-white/0 via-white to-white/0 
                  group-hover:w-full transition-all duration-300" 
                />
              </span>
            </motion.button>

            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto scale-75">
              <SnakeIcon />
            </div>
          </header>

          {/* Contenu principal */}
          <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full max-w-[1200px]">
              {/* Zone de jeu */}
              <div className="flex-grow order-1">
                <div className="p-2 sm:p-4 lg:p-8 rounded-xl">
                  <div className="w-full mx-auto">
                    <GameBoard 
                      snake={snake} 
                      food={food} 
                      showCelebration={showCelebration}
                      onDirectionChange={handleDirectionButton}
                    />
                  </div>
                </div>
              </div>

              {/* Panneau latéral - ScoreBoard avec flou conditionnel */}
              <div className={`w-full lg:w-80 order-2 lg:sticky lg:top-8 transition-all duration-300
                ${showCelebration ? 'blur-sm' : ''}`}>
                <div className="space-y-4 sm:space-y-6 
                  bg-white/90 dark:bg-gray-900/20 
                  border border-gray-200 dark:border-gray-800/50
                  p-4 sm:p-6 rounded-xl backdrop-blur-md
                  shadow-lg shadow-gray-400/10 dark:shadow-none">
                  <ScoreBoard 
                    score={score} 
                    highScore={highScore}
                    key={`scoreboard-${score}`}
                  />
                  <div className="pt-4 border-t border-light-border dark:border-gray-800/50">
                    <Controls onDirectionChange={handleDirectionButton} />
                  </div>
                  {gameOver && (
                    <div className="pt-4 border-t border-light-border dark:border-gray-800/50 space-y-3">
                      <button
                        onClick={resetGame}
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 
                          bg-gradient-to-r from-light-accent-primary to-light-accent-secondary
                          dark:from-emerald-400 dark:to-emerald-600 
                          text-white text-base sm:text-lg font-bold rounded-xl 
                          transform hover:scale-105 
                          transition-all duration-200 hover:shadow-lg"
                      >
                        Nouvelle Partie
                      </button>
                      <button
                        onClick={handleQuitGame}
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 
                          bg-gradient-to-r from-light-accent-secondary to-light-accent-primary
                          dark:from-violet-400 dark:to-violet-600 
                          text-white text-base sm:text-lg font-bold rounded-xl 
                          transform hover:scale-105 
                          transition-all duration-200 hover:shadow-lg"
                      >
                        Menu
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* TouchControls en dehors du layout principal */}
        <TouchControls />

        {/* Bouton Paramètres avec flou conditionnel */}
        <motion.button
          onClick={() => setShowSettings(true)}
          className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-50 transition-all duration-300
            ${showCelebration ? 'blur-sm' : ''}`}
        >
          <motion.span
            animate={{
              rotate: [0, 180],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="block"
          >
            ⚙️
          </motion.span>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full 
            animate-ping" />
        </motion.button>

        {/* Modal Paramètres */}
        {showSettings && (
          <Settings
            onClose={() => setShowSettings(false)}
            volume={volume}
            setVolume={setVolume}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        )}
      </div>
    </Suspense>
  );
}

export default App; 