
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// Components
import GameHeader from "./GameHeader";
import GameHUD from "./GameHUD";
import GameBoard from "./GameBoard";
import PowerUps from "./PowerUps";
import GameModeSelector from "./GameModeSelector";
import GameSettings from "./GameSettings";
import GameOver from "./GameOver";
import EnvironmentSelector from "./EnvironmentSelector";
import GameController from "./GameController";

// Hooks
import useSnakeGame from "../hooks/useSnakeGame";
import useSwipeControls from "../hooks/useSwipeControls";

// Configuration
import { environments, getEnvironment } from "../config/environments";

// Styles
import "../styles/SnakeGame.css";

export default function SnakeGame() {
    const game = useSnakeGame();

    // UI STATES
    const [showModes, setShowModes] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [showEnvironments, setShowEnvironments] = useState(false);
    const [sound, setSound] = useState(true);

    // SELECTED ENVIRONMENT
    const [selectedTheme, setSelectedTheme] = useState(() => {
        const savedTheme = localStorage.getItem("snakeTheme");

        const isValidTheme = environments.some(
            (environment) => environment.id === savedTheme
        );

        return isValidTheme ? savedTheme : "forest";
    });

    // TOUCH + MOUSE SWIPE CONTROLS
    const swipeControls = useSwipeControls({
        onDirectionChange: game.changeDirection,
        disabled: game.status !== "playing",
    });

    const currentEnvironment = getEnvironment(selectedTheme);

    // SELECT ENVIRONMENT
    const handleEnvironmentSelect = (environment) => {
        const environmentId =
            typeof environment === "string"
                ? environment
                : environment?.id;

        const isValidTheme = environments.some(
            (item) => item.id === environmentId
        );

        if (!isValidTheme) return;

        setSelectedTheme(environmentId);
        localStorage.setItem("snakeTheme", environmentId);

        setShowEnvironments(false);

        // Stay on main menu. Do not start the game.
        game.setStatus("menu");
    };

    // PLAY GAME
    const handlePlayGame = () => {
        game.startGame(game.gameMode);

        setShowEnvironments(false);
        setShowModes(false);
        setShowSettings(false);
        setShowLeaderboard(false);
    };

    // START SELECTED GAME MODE
    const startSelectedMode = (mode = game.gameMode) => {
        game.startGame(mode);

        setShowModes(false);
        setShowEnvironments(false);
    };

    // OPEN ENVIRONMENT SELECTOR
    const openEnvironments = () => {
        setShowEnvironments(true);
    };

    // REPLAY
    const handleReplay = () => {
        game.resetGame();
        game.setStatus("menu");

        setShowModes(false);
        setShowSettings(false);
        setShowLeaderboard(false);
        setShowEnvironments(true);
    };

    // GO HOME
    const goHome = () => {
        game.resetGame();
        game.setStatus("menu");

        setShowModes(false);
        setShowSettings(false);
        setShowLeaderboard(false);
        setShowEnvironments(false);
    };

    return (
        <main
            className={`
                snake-game-page
                theme-${selectedTheme}
                relative min-h-screen overflow-hidden
            `}
            style={{
                backgroundColor:
                    currentEnvironment?.background || "#071b13",
            }}
        >
            {/* ENVIRONMENT BACKGROUND */}
            <motion.div
                key={selectedTheme}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="
                    pointer-events-none
                    absolute inset-0 z-0
                    bg-cover bg-center bg-no-repeat
                "
                style={{
                    backgroundImage: currentEnvironment?.backgroundImage
                        ? `url("${currentEnvironment.backgroundImage}")`
                        : undefined,
                }}
            />

            {/* BACKGROUND OVERLAY */}
            <div className="
                pointer-events-none
                absolute inset-0 z-0
                bg-black/40
            " />

            {/* BACKGROUND DECORATIONS */}
            <div className="jungle-decoration jungle-left" />
            <div className="jungle-decoration jungle-right" />

            {/* MAIN CONTENT */}
            <div className="relative z-10">

                {/* GAME HEADER */}
                <GameHeader
                    gameMode={game.gameMode}
                    sound={sound}
                    setSound={setSound}
                    onSettings={() => setShowSettings(true)}
                    onLeaderboard={() => setShowLeaderboard(true)}
                />

                {/* MAIN GAME LAYOUT */}
                <div className="
                    mx-auto grid w-full max-w-[1600px]
                    grid-cols-1 items-start gap-5
                    px-4 py-5 sm:px-6
                    lg:grid-cols-[230px_minmax(0,1fr)_220px]
                    lg:gap-6 xl:gap-8
                ">

                    {/* LEFT HUD */}
                    <aside className="order-2 lg:order-1">
                        <GameHUD
                            score={game.score}
                            highScore={game.highScore}
                            level={game.level}
                            lives={game.lives}
                        />
                    </aside>

                    {/* CENTER GAME AREA */}
                    <section className="
                        relative order-1 flex
                        min-w-0 flex-col items-center
                        lg:order-2
                    ">

                        {/* GAME BOARD + SWIPE CONTROLS */}
                        <div
                            {...swipeControls}
                            className="
                                w-full
                                touch-none
                                select-none
                                cursor-crosshair
                            "
                        >
                            <GameBoard
                                snake={game.snake}
                                food={game.food}
                                status={game.status}
                                theme={selectedTheme}
                                backgroundImage={currentEnvironment?.backgroundImage}
                                onPause={game.pauseGame}
                                onResume={game.resumeGame}
                                onPlay={handlePlayGame}
                                onEnvironment={openEnvironments}
                                onModes={() => setShowModes(true)}
                                onLeaderboard={() => setShowLeaderboard(true)}
                                onSettings={() => setShowSettings(true)}
                            />
                        </div>

                        {/* JOYSTICK / ARROW BUTTON CONTROLLER */}
                        <div className="mt-8 mb-6 flex w-full justify-center">
                            <GameController
                                onDirectionChange={game.changeDirection}
                                disabled={game.status !== "playing"}
                            />
                        </div>

                        {/* GAME OVER */}
                        <AnimatePresence>
                            {game.status === "gameover" && (
                                <motion.div
                                    key="game-over"
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="
                                        absolute inset-0 z-30
                                        flex items-center justify-center
                                    "
                                >
                                    <GameOver
                                        score={game.score}
                                        highScore={game.highScore}
                                        onReplay={handleReplay}
                                        onHome={goHome}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>

                    {/* RIGHT POWER-UPS */}
                    <aside className="order-3">
                        <PowerUps />
                    </aside>
                </div>
            </div>

            {/* MODALS */}
            <AnimatePresence mode="wait">

                {/* ENVIRONMENT SELECTOR */}
                {showEnvironments && (
                    <motion.div
                        key="environment-selector"
                        className="
                            fixed inset-0 z-[100]
                            flex items-center justify-center
                            overflow-y-auto
                            bg-black/80 p-3
                            backdrop-blur-md sm:p-6
                        "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowEnvironments(false)}
                    >
                        <div onClick={(event) => event.stopPropagation()}>
                            <EnvironmentSelector
                                selectedEnvironment={selectedTheme}
                                onSelect={handleEnvironmentSelect}
                                onClose={() => setShowEnvironments(false)}
                            />
                        </div>
                    </motion.div>
                )}

                {/* GAME MODE SELECTOR */}
                {showModes && (
                    <motion.div
                        key="game-mode-selector"
                        className="
                            fixed inset-0 z-[100]
                            flex items-center justify-center
                            overflow-y-auto bg-black/75
                            p-4 backdrop-blur-md
                        "
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                    >
                        <GameModeSelector
                            selectedMode={game.gameMode}
                            onSelect={startSelectedMode}
                            onClose={() => setShowModes(false)}
                        />
                    </motion.div>
                )}

                {/* GAME SETTINGS */}
                {showSettings && (
                    <motion.div
                        key="game-settings"
                        className="
                            fixed inset-0 z-[100]
                            flex items-center justify-center
                            overflow-y-auto bg-black/75
                            p-4 backdrop-blur-md
                        "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <GameSettings
                            sound={sound}
                            setSound={setSound}
                            onClose={() => setShowSettings(false)}
                        />
                    </motion.div>
                )}

                {/* LEADERBOARD */}
                {showLeaderboard && (
                    <motion.div
                        key="game-leaderboard"
                        className="
                            fixed inset-0 z-[100]
                            flex items-center justify-center
                            overflow-y-auto bg-black/75
                            p-4 backdrop-blur-md
                        "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setShowLeaderboard(false)}
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                                scale: 0.95,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                y: 20,
                                scale: 0.95,
                            }}
                            onClick={(event) => event.stopPropagation()}
                            className="
                                relative w-full max-w-md
                                rounded-3xl border border-white/10
                                bg-[#151326] p-6 text-white
                                shadow-2xl sm:p-8
                            "
                        >
                            <button
                                type="button"
                                className="
                                    absolute right-4 top-4
                                    flex h-9 w-9 items-center
                                    justify-center rounded-full
                                    bg-white/10 text-xl
                                    transition hover:bg-white/20
                                "
                                onClick={() => setShowLeaderboard(false)}
                                aria-label="Close leaderboard"
                            >
                                ×
                            </button>

                            <div className="mb-6 text-center">
                                <div className="mb-3 text-4xl">🏆</div>

                                <h2 className="text-2xl font-bold">
                                    Leaderboard
                                </h2>

                                <p className="mt-2 text-sm text-white/50">
                                    Your personal gaming record
                                </p>
                            </div>

                            <div className="
                                flex items-center justify-between
                                rounded-2xl border border-yellow-400/20
                                bg-yellow-400/10 p-5
                            ">
                                <span className="text-sm font-medium text-white/80">
                                    🏆 Your Best Score
                                </span>

                                <strong className="text-2xl font-bold text-yellow-400">
                                    {game.highScore}
                                </strong>
                            </div>

                            <p className="
                                mt-5 text-center text-xs text-white/40
                            ">
                                Your personal best is saved on this device.
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
