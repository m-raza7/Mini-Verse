
import React, { memo, useCallback } from "react";

import {
    Pause,
    Play,
    Keyboard,
} from "lucide-react";

import {
    motion,
    AnimatePresence,
} from "motion/react";

import SnakeCanvas from "./SnakeCanvas";
import GameMenu from "./GameMenu";

function GameBoard({
    snake,
    food,
    status,
    theme = "forest",
    backgroundImage,
    onPause,
    onResume,
    onPlay,
    onEnvironment, // ADD THIS
    onModes,
    onLeaderboard,
    onSettings,
}) {
    const isPlaying = status === "playing";
    const isPaused = status === "paused";
    const isMenu = status === "menu";

    const handlePauseToggle = useCallback(() => {
        if (isPlaying) {
            onPause?.();
        } else if (isPaused) {
            onResume?.();
        }
    }, [isPlaying, isPaused, onPause, onResume]);

    return (
        <div className="game-board-wrapper flex w-full min-w-0 flex-col gap-4">

            {/* GAME BOARD */}
            <div
                className={`
          game-board
          environment-${theme}
          relative isolate
          h-[320px] w-full
          overflow-hidden
          rounded-2xl
          border-2 border-purple-500
          bg-[#071b13]
          shadow-[0_0_25px_rgba(168,85,247,0.4)]
          sm:h-[400px]
          lg:h-[480px]
        `}
                style={{
                    backgroundColor: "#071b13",
                }}
                aria-label={`${theme} snake game board`}
            >

                {/* ENVIRONMENT BACKGROUND */}
                <AnimatePresence mode="sync">
                    <motion.div
                        key={backgroundImage || theme}
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{
                            backgroundImage: backgroundImage
                                ? `url("${backgroundImage}")`
                                : undefined,
                        }}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    />
                </AnimatePresence>

                {/* BACKGROUND OVERLAY */}
                <div className="
          pointer-events-none
          absolute inset-0 z-[1]
          bg-black/10
        " />

                {/* ENVIRONMENT EFFECTS */}
                <div
                    className={`
            environment-effects
            effects-${theme}
            pointer-events-none
            absolute inset-0 z-[2]
          `}
                />

                {/* SNAKE CANVAS */}
                <div className="absolute inset-0 z-10">
                    <SnakeCanvas
                        snake={snake}
                        food={food}
                        theme={theme}
                    />
                </div>

                {/* MAIN MENU */}
                <AnimatePresence>
                    {isMenu && (
                        <motion.div
                            key="game-menu"
                            className="
                absolute inset-0 z-30
                flex items-center justify-center
                overflow-y-auto
                p-3 sm:p-5
              "
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <GameMenu
                                onPlay={onPlay}
                                onEnvironment={onEnvironment}
                                onModes={onModes}
                                onLeaderboard={onLeaderboard}
                                onSettings={onSettings}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* PAUSE OVERLAY */}
                <AnimatePresence>
                    {isPaused && (
                        <motion.div
                            key="pause-overlay"
                            className="
                absolute inset-0 z-40
                flex items-center justify-center
                bg-[#080817]/75
                p-4 text-center
                backdrop-blur-md
              "
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.85,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.85,
                                    y: 15,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 220,
                                    damping: 18,
                                }}
                                className="
                  flex w-full max-w-[340px]
                  flex-col items-center gap-4
                  rounded-3xl
                  border border-purple-400/25
                  bg-[#111026]/95
                  px-6 py-7
                  shadow-[0_0_60px_rgba(139,92,246,0.2)]
                  backdrop-blur-xl
                "
                            >
                                <div className="
                  flex h-16 w-16
                  items-center justify-center
                  rounded-2xl
                  border border-purple-400/30
                  bg-purple-500/15
                  text-purple-300
                ">
                                    <Pause size={30} />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-black text-white">
                                        Game Paused
                                    </h2>
                                    <p className="mt-2 text-sm text-white/50">
                                        Your adventure is waiting!
                                    </p>
                                </div>

                                <motion.button
                                    type="button"
                                    onClick={onResume}
                                    whileHover={{ scale: 1.04, y: -2 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="
                    flex w-full items-center justify-center gap-2
                    rounded-xl
                    bg-gradient-to-r from-purple-600 to-fuchsia-600
                    px-7 py-3
                    font-bold text-white
                  "
                                >
                                    <Play size={18} fill="currentColor" />
                                    Resume Game
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* GAME CONTROLS */}
            <div className="
        game-controls-hint
        flex flex-wrap
        items-center justify-center
        gap-3 sm:gap-5
        rounded-xl
        border border-white/10
        bg-[#0b0c1d]/75
        px-3 py-3 sm:px-5
        text-xs text-white/65
        backdrop-blur-xl
      ">
                <div className="flex items-center gap-2">
                    <Keyboard size={17} className="text-purple-400" />
                    <span className="font-medium">Use Arrow Keys</span>
                </div>

                <div className="keyboard-keys flex flex-col items-center gap-1">
                    <span className="
            flex h-6 w-7 items-center justify-center
            rounded-md border border-white/15
            bg-white/10 font-bold text-white
          ">
                        ↑
                    </span>

                    <div className="flex gap-1">
                        {["←", "↓", "→"].map((key) => (
                            <span
                                key={key}
                                className="
                  flex h-6 w-7 items-center justify-center
                  rounded-md border border-white/15
                  bg-white/10 font-bold text-white
                "
                            >
                                {key}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="hidden h-8 w-px bg-white/15 sm:block" />

                <motion.button
                    type="button"
                    onClick={handlePauseToggle}
                    disabled={!isPlaying && !isPaused}
                    whileHover={
                        isPlaying || isPaused ? { scale: 1.08 } : undefined
                    }
                    whileTap={
                        isPlaying || isPaused ? { scale: 0.94 } : undefined
                    }
                    className="
            flex h-9 w-9 items-center justify-center
            rounded-lg border border-white/15
            bg-white/10 text-white
            hover:border-purple-400/50
            hover:bg-purple-500/20
            disabled:cursor-not-allowed disabled:opacity-40
          "
                    aria-label={isPlaying ? "Pause game" : "Resume game"}
                >
                    {isPlaying ? <Pause size={17} /> : <Play size={17} />}
                </motion.button>

                <span>ESC to Pause</span>
            </div>
        </div>
    );
}

export default memo(GameBoard);
