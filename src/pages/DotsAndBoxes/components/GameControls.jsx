
import React from "react";
import { motion } from "motion/react";
import {
    RotateCcw,
    Grid2X2,
    Sparkles,
    ChevronRight,
} from "lucide-react";

const GameControls = ({
    boardSize = 4,
    onBoardSizeChange,
    onRestart,
}) => {
    const boardSizes = [3, 4, 5, 6];

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl mx-auto mt-6 mb-12"
        >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#17142d]/90 p-5 sm:p-7 shadow-2xl shadow-purple-950/20">

                <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-7">

                    {/* Header */}
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-2">
                                <Sparkles size={17} className="text-purple-400" />
                                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                                    Game Settings
                                </h3>
                            </div>

                            <p className="mt-1 text-xs sm:text-sm text-slate-400">
                                Customize your game experience
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-500/10">
                            <Grid2X2 size={21} className="text-purple-400" />
                        </div>
                    </div>

                    {/* Board sizes */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold tracking-widest text-slate-300">
                                BOARD SIZE
                            </span>

                            <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-300">
                                {boardSize} × {boardSize}
                            </span>
                        </div>

                        <div className="grid grid-cols-4 gap-2 sm:gap-3">
                            {boardSizes.map((size) => {
                                const active = boardSize === size;

                                return (
                                    <motion.button
                                        key={size}
                                        type="button"
                                        onClick={() => onBoardSizeChange?.(size)}
                                        whileHover={{ y: -3 }}
                                        whileTap={{ scale: 0.94 }}
                                        aria-pressed={active}
                                        className={`relative flex flex-col items-center justify-center gap-2 rounded-2xl border p-3 sm:p-4 transition-all duration-300 ${active
                                                ? "border-purple-400 bg-gradient-to-br from-purple-600 to-violet-700 shadow-lg shadow-purple-600/30"
                                                : "border-white/10 bg-white/[0.03] hover:border-purple-400/40 hover:bg-purple-500/10"
                                            }`}
                                    >
                                        <Grid2X2
                                            size={21}
                                            className={active ? "text-white" : "text-slate-400"}
                                        />

                                        <span className={`text-sm sm:text-base font-extrabold ${active ? "text-white" : "text-slate-300"
                                            }`}>
                                            {size} × {size}
                                        </span>

                                        {active && (
                                            <motion.div
                                                layoutId="active-board-size"
                                                className="absolute inset-0 rounded-2xl border-2 border-purple-300/50 pointer-events-none"
                                            />
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>

                        <p className="text-xs text-slate-500">
                            Larger boards provide more challenging gameplay.
                        </p>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    {/* Restart */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h4 className="text-sm font-bold text-white">
                                Start a fresh match
                            </h4>

                            <p className="text-xs text-slate-400 mt-1">
                                Reset scores and clear the board.
                            </p>
                        </div>

                        <motion.button
                            type="button"
                            onClick={onRestart}
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-600/20 hover:from-purple-500 hover:to-violet-500"
                        >
                            <RotateCcw
                                size={17}
                                className="transition-transform duration-500 group-hover:-rotate-180"
                            />

                            Restart Game

                            <ChevronRight size={16} />
                        </motion.button>
                    </div>

                    {/* Info */}
                    <div className="flex items-center gap-2 rounded-xl border border-purple-400/10 bg-purple-500/[0.06] p-3">
                        <Sparkles size={16} className="shrink-0 text-purple-400" />

                        <p className="text-xs leading-relaxed text-slate-400">
                            Capture more boxes than your opponent to become the Dots & Boxes champion!
                        </p>
                    </div>

                </div>
            </div>
        </motion.section>
    );
};

export default GameControls;
