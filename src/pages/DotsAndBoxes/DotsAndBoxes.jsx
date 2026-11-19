
import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

import GameHeader from "./components/GameHeader";
import GameBoard from "./components/GameBoard";
import GameControls from "./components/GameControls";
import GameScore from "./components/GameScore";
import GameResult from "./components/GameResult";

import useDotsAndBoxes from "./hooks/useDotsAndBoxes";

const DotsAndBoxes = () => {
    const [boardSize, setBoardSize] = useState(4);

    const { game, connectDots, resetGame } =
        useDotsAndBoxes(boardSize);

    const handleBoardSizeChange = (size) => {
        setBoardSize(size);
        resetGame(size);
    };

    const handleRestart = () => {
        resetGame(boardSize);
    };

    const handleHome = () => {
        window.history.back();
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#100e22] px-4 py-6 text-white sm:px-6">

            {/* Background effects */}
            <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]" />

            <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-purple-600/15 blur-[130px]" />

            <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-rose-600/10 blur-[120px]" />

            <div className="relative z-10 mx-auto max-w-6xl">

                {/* Header */}
                <GameHeader onBack={handleHome} />

                {/* Introduction */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-auto mt-12 max-w-2xl text-center"
                >
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-xs font-bold tracking-widest text-purple-300">
                        <Sparkles size={14} />
                        MINI VERSE ARCADE
                    </div>

                    <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
                        Connect the dots.
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-rose-400 bg-clip-text text-transparent">
                            Own the boxes.
                        </span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-400">
                        Challenge your opponent, connect the lines and capture
                        as many boxes as possible.
                    </p>
                </motion.section>

                {/* Player Scores */}
                <GameScore
                    scores={game.scores}
                    currentPlayer={game.currentPlayer}
                    winner={
                        game.gameOver
                            ? game.scores.blue > game.scores.red
                                ? "blue"
                                : game.scores.red > game.scores.blue
                                    ? "red"
                                    : "draw"
                            : null
                    }
                />

                {/* Current turn */}
                <div className="my-7 flex justify-center">
                    <motion.div
                        key={game.currentPlayer}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3"
                    >
                        <span
                            className={`h-2.5 w-2.5 rounded-full ${game.currentPlayer === "blue"
                                    ? "bg-blue-400 shadow-[0_0_15px_#4388ff]"
                                    : "bg-rose-400 shadow-[0_0_15px_#ff5277]"
                                }`}
                        />

                        <span className="text-xs font-extrabold tracking-widest text-white">
                            {game.gameOver
                                ? "MATCH COMPLETED"
                                : `${game.currentPlayer.toUpperCase()} PLAYER'S TURN`}
                        </span>
                    </motion.div>
                </div>

                {/* Game board */}
                <section className="mx-auto max-w-2xl">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-extrabold text-white">
                                Game Arena
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Select an empty connection to draw a line
                            </p>
                        </div>

                        <span className="rounded-lg border border-purple-400/20 bg-purple-500/10 px-3 py-2 text-xs font-bold text-purple-300">
                            {game.size} × {game.size}
                        </span>
                    </div>

                    <GameBoard
                        game={game}
                        connectDots={connectDots}
                    />

                    <div className="mt-4 flex justify-between text-xs text-slate-400">
                        <span>
                            {Object.keys(game.boxes).length} boxes captured
                        </span>

                        <span>
                            {game.totalBoxes - Object.keys(game.boxes).length} remaining
                        </span>
                    </div>
                </section>

                {/* Game Controls */}
                <GameControls
                    boardSize={boardSize}
                    onBoardSizeChange={handleBoardSizeChange}
                    onRestart={handleRestart}
                />

            </div>

            {/* Winner screen */}
            <GameResult
                open={game.gameOver}
                scores={game.scores}
                onPlayAgain={handleRestart}
                onHome={handleHome}
            />

        </main>
    );
};

export default DotsAndBoxes;
