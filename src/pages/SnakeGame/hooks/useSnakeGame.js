
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    INITIAL_SNAKE,
    DIRECTIONS,
    createFood,
    moveSnake,
} from "../engine/gameEngine";

// =====================================
// DIRECTION MAPPING
// =====================================

const DIRECTION_MAP = {
    UP: DIRECTIONS.UP,
    DOWN: DIRECTIONS.DOWN,
    LEFT: DIRECTIONS.LEFT,
    RIGHT: DIRECTIONS.RIGHT,
};

const getHighScore = () => {
    try {
        return Number(localStorage.getItem("snakeHighScore")) || 0;
    } catch {
        return 0;
    }
};

export default function useSnakeGame() {

    // =====================================
    // GAME STATES
    // =====================================

    const [snake, setSnake] = useState(INITIAL_SNAKE);

    const [food, setFood] = useState(() =>
        createFood(INITIAL_SNAKE)
    );

    const [score, setScore] = useState(0);

    const [highScore, setHighScore] = useState(getHighScore);

    const [level, setLevel] = useState(1);

    const [lives, setLives] = useState(3);

    const [status, setStatus] = useState("menu");

    const [gameMode, setGameMode] = useState("Classic");

    const [speed, setSpeed] = useState(140);


    // =====================================
    // GAME REFS
    // =====================================

    const snakeRef = useRef(INITIAL_SNAKE);

    const foodRef = useRef(food);

    const livesRef = useRef(3);

    const directionRef = useRef(DIRECTIONS.RIGHT);

    const nextDirectionRef = useRef(DIRECTIONS.RIGHT);


    // =====================================
    // RESET GAME
    // =====================================

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


    // =====================================
    // START GAME
    // =====================================

    const startGame = useCallback((mode = gameMode) => {

        resetGame();

        setGameMode(mode);

        setStatus("playing");

    }, [gameMode, resetGame]);


    // =====================================
    // CHANGE DIRECTION
    // KEYBOARD + VIRTUAL JOYSTICK
    // =====================================

    const changeDirection = useCallback((inputDirection) => {

        // Accept both string and direction object
        const newDirection =
            typeof inputDirection === "string"
                ? DIRECTION_MAP[inputDirection.toUpperCase()]
                : inputDirection;

        // Validate direction
        if (
            !newDirection ||
            typeof newDirection.x !== "number" ||
            typeof newDirection.y !== "number"
        ) {
            return;
        }

        // Prevent direction changes when game is not running
        if (status !== "playing") {
            return;
        }

        const currentDirection = directionRef.current;

        const pendingDirection = nextDirectionRef.current;

        // Check opposite direction
        const isOpposite = (direction) =>
            direction.x + newDirection.x === 0 &&
            direction.y + newDirection.y === 0;

        // Prevent reversing against current or pending direction
        if (
            isOpposite(currentDirection) ||
            isOpposite(pendingDirection)
        ) {
            return;
        }

        // Update next movement direction
        nextDirectionRef.current = newDirection;

    }, [status]);


    // =====================================
    // KEYBOARD CONTROLS
    // =====================================

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

                W: DIRECTIONS.UP,
                S: DIRECTIONS.DOWN,
                A: DIRECTIONS.LEFT,
                D: DIRECTIONS.RIGHT,
            };

            if (keys[event.key]) {

                event.preventDefault();

                changeDirection(keys[event.key]);

            }

            // Pause / Resume
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


    // =====================================
    // MAIN GAME LOOP
    // =====================================

    useEffect(() => {

        if (status !== "playing") return;

        const timer = setInterval(() => {

            // Apply next direction
            directionRef.current = nextDirectionRef.current;

            // Move snake
            const result = moveSnake(
                snakeRef.current,
                directionRef.current,
                foodRef.current
            );


            // =================================
            // COLLISION DETECTED
            // =================================

            if (result.gameOver) {

                const remainingLives = livesRef.current - 1;

                livesRef.current = remainingLives;

                setLives(remainingLives);


                // No lives remaining
                if (remainingLives <= 0) {

                    setStatus("gameover");

                    return;

                }


                // Respawn snake
                const newSnake = INITIAL_SNAKE;

                const newFood = createFood(newSnake);

                snakeRef.current = newSnake;

                foodRef.current = newFood;

                directionRef.current = DIRECTIONS.RIGHT;

                nextDirectionRef.current = DIRECTIONS.RIGHT;

                setSnake(newSnake);

                setFood(newFood);

                // Preserve score after losing one life
                return;

            }


            // =================================
            // UPDATE SNAKE POSITION
            // =================================

            snakeRef.current = result.snake;

            setSnake(result.snake);


            // =================================
            // FOOD COLLISION
            // =================================

            if (result.ateFood) {

                setScore((currentScore) => {

                    const newScore = currentScore + 10;

                    setHighScore((previous) => {

                        const best = Math.max(previous, newScore);

                        try {
                            localStorage.setItem(
                                "snakeHighScore",
                                String(best)
                            );
                        } catch (error) {
                            console.error(
                                "Unable to save Snake high score:",
                                error
                            );
                        }

                        return best;

                    });

                    return newScore;

                });


                // Generate new food
                const newFood = createFood(result.snake);

                foodRef.current = newFood;

                setFood(newFood);

            }

        }, speed);

        return () => clearInterval(timer);

    }, [status, speed]);


    // =====================================
    // LEVEL AND SPEED
    // =====================================

    useEffect(() => {

        setLevel(Math.floor(score / 100) + 1);

        setSpeed(
            Math.max(65, 140 - Math.floor(score / 100) * 8)
        );

    }, [score]);


    // =====================================
    // PAUSE / RESUME
    // =====================================

    const pauseGame = useCallback(() => {

        setStatus("paused");

    }, []);

    const resumeGame = useCallback(() => {

        setStatus("playing");

    }, []);


    // =====================================
    // RETURN GAME DATA
    // =====================================

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
