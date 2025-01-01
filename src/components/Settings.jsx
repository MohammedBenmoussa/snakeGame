import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const SettingSection = ({ title, children }) => {
  const { isDark } = useTheme();
  return (
    <div className="space-y-3">
      <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
        {title}
      </h3>
      {children}
    </div>
  );
};

const Settings = ({ onClose, volume, setVolume, difficulty, setDifficulty }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className={`w-full max-w-lg relative overflow-hidden
            ${isDark ? 'bg-gray-900' : 'bg-white'} 
            rounded-3xl shadow-2xl`}
          onClick={e => e.stopPropagation()}
        >
          {/* En-tête */}
          <div className={`relative px-8 py-6 border-b
            ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            <h2 className={`text-2xl font-bold 
              ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Paramètres
            </h2>
            <button
              onClick={onClose}
              className={`absolute right-6 top-6 p-2 rounded-full transition-colors
                ${isDark 
                  ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'}`}
            >
              ✕
            </button>
          </div>

          {/* Contenu */}
          <div className="px-8 py-6 space-y-8">
            {/* Thème */}
            <SettingSection title="Apparence">
              <div className="flex items-center justify-between">
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  {isDark ? 'Mode Sombre' : 'Mode Clair'}
                </span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTheme}
                  className={`relative w-14 h-8 rounded-full p-1 transition-colors duration-200
                    ${isDark ? 'bg-emerald-600' : 'bg-gray-200'}`}
                >
                  <motion.div
                    layout
                    className={`w-6 h-6 rounded-full shadow-md transform transition-transform
                      flex items-center justify-center text-xs
                      ${isDark 
                        ? 'bg-white translate-x-6' 
                        : 'bg-white translate-x-0'}`}
                  >
                    {isDark ? '🌙' : '☀️'}
                  </motion.div>
                </motion.button>
              </div>
            </SettingSection>

            {/* Volume */}
            <SettingSection title="Audio">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    Volume: {volume}%
                  </span>
                  <span className={`text-2xl ${volume === 0 ? 'opacity-50' : ''}`}>
                    {volume === 0 ? '🔇' : volume < 50 ? '🔉' : '🔊'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none 
                    cursor-pointer accent-emerald-500"
                />
              </div>
            </SettingSection>

            {/* Difficulté */}
            <SettingSection title="Difficulté">
              <div className="grid grid-cols-3 gap-3">
                {['easy', 'medium', 'hard'].map((level) => (
                  <motion.button
                    key={level}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setDifficulty(level)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all
                      ${difficulty === level
                        ? isDark
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                          : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                        : isDark
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {level === 'easy' && '🐌 Facile'}
                    {level === 'medium' && '🚶 Normal'}
                    {level === 'hard' && '🏃 Difficile'}
                  </motion.button>
                ))}
              </div>
            </SettingSection>
          </div>

          {/* Pied de page */}
          <div className={`px-8 py-6 border-t
            ${isDark ? 'border-gray-800' : 'border-gray-200'}
            bg-gradient-to-t ${isDark ? 'from-black/20' : 'from-gray-50'}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className={`w-full px-6 py-3 rounded-xl font-semibold
                ${isDark
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500'
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-400'}
                text-white shadow-lg shadow-emerald-500/20
                hover:shadow-emerald-500/30 transition-all`}
            >
              Appliquer les changements
            </motion.button>
          </div>

          {/* Effet de brillance sur les bords */}
          <div className="absolute inset-0 pointer-events-none">
            <div className={`absolute inset-0 
              ${isDark 
                ? 'bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/5' 
                : 'bg-gradient-to-br from-emerald-500/10 via-transparent to-emerald-500/10'}`}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Settings; 