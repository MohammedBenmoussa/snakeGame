import { useState, useEffect, useCallback, useRef } from 'react';
import { GRID_SIZE, INITIAL_SNAKE, DIRECTIONS, GAME_SPEED } from '../constants/gameConstants';
import { checkCollision, generateFood } from '../utils/gameUtils';
import { useSoundEffects } from './useSoundEffects';

export const useGameLogic = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  const lastDirection = useRef(direction);
  const lastTime = useRef(0);
  const gameLoopRef = useRef(null);
  const isPaused = useRef(false);
  const { playEatSound, playGameOverSound, playMoveSound, playDangerSound } = useSoundEffects();

  const checkDanger = useCallback((head, snake) => {
    // Vérifier si le serpent est proche de sa queue
    const dangerDistance = 2; // Distance de danger
    
    for (let i = 4; i < snake.length; i++) {
      const segment = snake[i];
      const distanceX = Math.abs(head.x - segment.x);
      const distanceY = Math.abs(head.y - segment.y);
      
      if (distanceX <= dangerDistance && distanceY <= dangerDistance) {
        return true;
      }
    }
    return false;
  }, []);

  const moveSnake = useCallback((timestamp) => {
    if (gameOver || isPaused.current) return;

    if (timestamp - lastTime.current >= GAME_SPEED) {
      lastTime.current = timestamp;
      playMoveSound();

      setSnake(currentSnake => {
        const head = currentSnake[0];
        const newHead = {
          x: (head.x + lastDirection.current.x + GRID_SIZE) % GRID_SIZE,
          y: (head.y + lastDirection.current.y + GRID_SIZE) % GRID_SIZE
        };

        // Vérifier le danger avant de bouger
        if (checkDanger(newHead, currentSnake)) {
          playDangerSound();
        }

        if (newHead.x === food.x && newHead.y === food.y) {
          playEatSound();
          setScore(prevScore => prevScore + 1);
          setFood(generateFood(currentSnake, GRID_SIZE));
          return [newHead, ...currentSnake];
        }

        if (checkCollision(newHead, currentSnake)) {
          playGameOverSound();
          setGameOver(true);
          return currentSnake;
        }

        return [newHead, ...currentSnake.slice(0, -1)];
      });
    }

    gameLoopRef.current = requestAnimationFrame(moveSnake);
  }, [food, gameOver, playEatSound, playGameOverSound, playMoveSound, playDangerSound, checkDanger]);

  // Gestion des touches du clavier optimisée
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (lastDirection.current !== DIRECTIONS.DOWN) {
            e.preventDefault();
            lastDirection.current = DIRECTIONS.UP;
            setDirection(DIRECTIONS.UP);
          }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (lastDirection.current !== DIRECTIONS.UP) {
            e.preventDefault();
            lastDirection.current = DIRECTIONS.DOWN;
            setDirection(DIRECTIONS.DOWN);
          }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (lastDirection.current !== DIRECTIONS.RIGHT) {
            e.preventDefault();
            lastDirection.current = DIRECTIONS.LEFT;
            setDirection(DIRECTIONS.LEFT);
          }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (lastDirection.current !== DIRECTIONS.LEFT) {
            e.preventDefault();
            lastDirection.current = DIRECTIONS.RIGHT;
            setDirection(DIRECTIONS.RIGHT);
          }
          break;
        case ' ':
        case 'p':
        case 'P':
          e.preventDefault();
          isPaused.current = !isPaused.current;
          if (!isPaused.current) {
            lastTime.current = 0;
            gameLoopRef.current = requestAnimationFrame(moveSnake);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver, moveSnake]);

  // Démarrage de la boucle de jeu
  useEffect(() => {
    gameLoopRef.current = requestAnimationFrame(moveSnake);
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [moveSnake]);

  const handleDirectionButton = useCallback((newDirection) => {
    if (gameOver) return;

    const isValidDirection = (
      (newDirection === DIRECTIONS.UP && lastDirection.current !== DIRECTIONS.DOWN) ||
      (newDirection === DIRECTIONS.DOWN && lastDirection.current !== DIRECTIONS.UP) ||
      (newDirection === DIRECTIONS.LEFT && lastDirection.current !== DIRECTIONS.RIGHT) ||
      (newDirection === DIRECTIONS.RIGHT && lastDirection.current !== DIRECTIONS.LEFT)
    );

    if (isValidDirection) {
      lastDirection.current = newDirection;
      setDirection(newDirection);
      lastTime.current = 0; // Force une mise à jour immédiate
    }
  }, [gameOver]);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    lastDirection.current = DIRECTIONS.RIGHT;
    setDirection(DIRECTIONS.RIGHT);
    setFood(generateFood(INITIAL_SNAKE, GRID_SIZE));
    setScore(0);
    setGameOver(false);
    isPaused.current = false;
    lastTime.current = 0;
  }, []);

  return {
    snake,
    food,
    score,
    setScore,
    gameOver,
    isPaused: isPaused.current,
    resetGame,
    handleDirectionButton
  };
}; 