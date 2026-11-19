
import { useCallback, useEffect, useRef, useState } from "react";

import {
    INITIAL_SNAKE,
    DIRECTIONS,
    createFood,
    moveSnake,
} from "../engine/gameEngine";

export default function useSnakeGame() {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState(() =>
        createFood(INITIAL_SNAKE)
    );

    const [score, setScore] = useState(0);

    const [highScore, setHighScore] = useState(() => {
        return Number(localStorage.getItem("snakeHighScore")) || 0;
    });

    const [level, setLevel] = useState(1);
    const [lives, setLives] = useState(3);

    const [status, setStatus] = useState("menu");
    const [gameMode, setGameMode] = useState("Classic");
    const [speed, setSpeed] = useState(140);

    // Refs for reliable game-loop state
    const snakeRef = useRef(INITIAL_SNAKE);
    const foodRef = useRef(food);
    const livesRef = useRef(3);

    const directionRef = useRef(DIRECTIONS.RIGHT);
    const nextDirectionRef = useRef(DIRECTIONS.RIGHT);

    // Reset game
    const resetGame = useCallback(() => {
        const newSnake = INITIAL_SNAKE;
        const newFood = createFood(newSnake);

        snakeRef.current = newSnake;
        foodRef.current = newFood;
        livesRef.current = 3;

        directionRef.current = DIRECTIONS.RIGHT;
        nextDirectionRef.current = DIRECTIONS.RIGHT;

        setSnake(newSnake);
        setFood(newFood);
        setScore(0);
        setLevel(1);
        setLives(3);
        setSpeed(140);
    }, []);

    // Start game
    const startGame = useCallback((mode = gameMode) => {
        resetGame();
        setGameMode(mode);
        setStatus("playing");
    }, [gameMode, resetGame]);

    // Change direction
    const changeDirection = useCallback((direction) => {
        const current = directionRef.current;

        const isOpposite =
            current.x + direction.x === 0 &&
            current.y + direction.y === 0;

        if (!isOpposite) {
            nextDirectionRef.current = direction;
        }
    }, []);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (event) => {
            const keys = {
                ArrowUp: DIRECTIONS.UP,
                ArrowDown: DIRECTIONS.DOWN,
                ArrowLeft: DIRECTIONS.LEFT,
                ArrowRight: DIRECTIONS.RIGHT,
                w: DIRECTIONS.UP,
                s: DIRECTIONS.DOWN,
                a: DIRECTIONS.LEFT,
                d: DIRECTIONS.RIGHT,
            };

            if (keys[event.key]) {
                event.preventDefault();
                changeDirection(keys[event.key]);
            }

            if (event.key === "Escape") {
                setStatus((current) => {
                    if (current === "playing") return "paused";
                    if (current === "paused") return "playing";
                    return current;
                });
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [changeDirection]);

    // Main game loop
    useEffect(() => {
        if (status !== "playing") return;

        const timer = setInterval(() => {
            directionRef.current = nextDirectionRef.current;

            const result = moveSnake(
                snakeRef.current,
                directionRef.current,
                foodRef.current
            );

            // COLLISION DETECTED
            if (result.gameOver) {
                const remainingLives = livesRef.current - 1;

                livesRef.current = remainingLives;
                setLives(remainingLives);

                // No lives remaining
                if (remainingLives <= 0) {
                    setStatus("gameover");
                    return;
                }

                // Respawn snake with one less life
                const newSnake = INITIAL_SNAKE;
                const newFood = createFood(newSnake);

                snakeRef.current = newSnake;
                foodRef.current = newFood;

                directionRef.current = DIRECTIONS.RIGHT;
                nextDirectionRef.current = DIRECTIONS.RIGHT;

                setSnake(newSnake);
                setFood(newFood);

                // Score is NOT reset
                return;
            }

            // Update snake position
            snakeRef.current = result.snake;
            setSnake(result.snake);

            // Eat food
            if (result.ateFood) {
                setScore((currentScore) => {
                    const newScore = currentScore + 10;

                    setHighScore((previous) => {
                        const best = Math.max(previous, newScore);

                        localStorage.setItem(
                            "snakeHighScore",
                            String(best)
                        );

                        return best;
                    });

                    return newScore;
                });

                const newFood = createFood(result.snake);

                foodRef.current = newFood;
                setFood(newFood);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [status, speed]);

    // Update level and speed
    useEffect(() => {
        setLevel(Math.floor(score / 100) + 1);
        setSpeed(Math.max(65, 140 - Math.floor(score / 100) * 8));
    }, [score]);

    const pauseGame = () => setStatus("paused");

    const resumeGame = () => setStatus("playing");

    return {
        snake,
        food,
        score,
        highScore,
        level,
        lives,
        status,
        gameMode,
        speed,
        startGame,
        resetGame,
        pauseGame,
        resumeGame,
        changeDirection,
        setGameMode,
        setStatus,
    };
}
