import React from 'react';
import { motion } from 'framer-motion';

const TouchControls = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 md:hidden z-50"
    >
      <div className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-md 
        rounded-xl p-4 border border-gray-200/20 dark:border-gray-700/20
        shadow-lg"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-600 dark:text-gray-300"
        >
          <p className="text-sm mb-3 font-medium">Swipe to control</p>
          <div className="flex gap-4 justify-center">
            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-2xl"
            >
              👆
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-2xl"
            >
              👇
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-2xl"
            >
              👈
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-2xl"
            >
              👉
            </motion.span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TouchControls; 