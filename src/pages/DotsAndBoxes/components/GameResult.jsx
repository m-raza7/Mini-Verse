
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Trophy,
    RotateCcw,
    Crown,
    Sparkles,
    Home,
    PartyPopper,
} from "lucide-react";

const GameResult = ({
    open,
    scores,
    onPlayAgain,
    onHome,
}) => {
    const winner =
        scores.blue > scores.red
            ? "blue"
            : scores.red > scores.blue
                ? "red"
                : "draw";

    const isDraw = winner === "draw";

    const winnerName =
        winner === "blue"
            ? "BLUE PLAYER"
            : winner === "red"
                ? "RED PLAYER"
                : "IT'S A DRAW";

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#080716]/85 p-4 backdrop-blur-xl"
                >
                    {/* Celebration particles */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        {Array.from({ length: 20 }).map((_, index) => (
                            <motion.div
                                key={index}
                                initial={{
                                    opacity: 0,
                                    y: -30,
                                    x: `${(index * 37) % 100}%`,
                                    rotate: 0,
                                }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    y: ["0vh", "100vh"],
                                    rotate: 360,
                                }}
                                transition={{
                                    duration: 3 + (index % 3),
                                    repeat: Infinity,
                                    delay: index * 0.12,
                                }}
                                className={`absolute top-0 h-2 w-2 rounded-sm ${index % 2 === 0
                                        ? "bg-blue-400"
                                        : "bg-rose-400"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Result Card */}
                    <motion.div
                        initial={{ scale: 0.7, y: 40, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 18,
                        }}
                        className="relative w-full max-w-md overflow-hidden rounded-[30px] border border-purple-400/30 bg-gradient-to-br from-[#28204a] via-[#19142f] to-[#100e22] p-6 sm:p-9 text-center shadow-[0_0_80px_#895cff30]"
                    >
                        {/* Glow */}
                        <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />

                        <div className="relative z-10">

                            {/* Trophy */}
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [-5, 5, -5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                                className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/20 to-orange-500/10 shadow-[0_0_40px_#facc1530]"
                            >
                                {isDraw ? (
                                    <PartyPopper
                                        size={48}
                                        className="text-yellow-300"
                                    />
                                ) : (
                                    <Trophy
                                        size={48}
                                        className="text-yellow-300 drop-shadow-[0_0_12px_#facc15]"
                                    />
                                )}
                            </motion.div>

                            {/* Heading */}
                            <div className="mt-7">
                                <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-[3px] text-purple-300">
                                    <Sparkles size={14} />
                                    MATCH COMPLETED
                                    <Sparkles size={14} />
                                </div>

                                <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white">
                                    {isDraw ? "Well Played!" : "Victory!"}
                                </h2>

                                <p
                                    className={`mt-3 text-sm font-extrabold tracking-widest ${winner === "blue"
                                            ? "text-blue-300"
                                            : winner === "red"
                                                ? "text-rose-300"
                                                : "text-yellow-300"
                                        }`}
                                >
                                    {winnerName}
                                </p>

                                <p className="mt-2 text-xs text-slate-400">
                                    {isDraw
                                        ? "Both players finished with equal scores."
                                        : "Congratulations! You captured the most boxes."}
                                </p>
                            </div>

                            {/* Final score */}
                            <div className="mt-7 grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                                <div>
                                    <p className="text-[10px] font-bold text-blue-300">
                                        BLUE
                                    </p>

                                    <p className="mt-1 text-3xl font-black text-white">
                                        {scores.blue}
                                    </p>
                                </div>

                                <span className="text-xs font-black text-slate-500">
                                    VS
                                </span>

                                <div>
                                    <p className="text-[10px] font-bold text-rose-300">
                                        RED
                                    </p>

                                    <p className="mt-1 text-3xl font-black text-white">
                                        {scores.red}
                                    </p>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="mt-7 flex flex-col gap-3">
                                <motion.button
                                    type="button"
                                    onClick={onPlayAgain}
                                    whileHover={{ scale: 1.04, y: -2 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-purple-600/30 transition hover:from-purple-500 hover:to-violet-500"
                                >
                                    <RotateCcw size={18} />
                                    Play Again
                                </motion.button>

                                {onHome && (
                                    <button
                                        type="button"
                                        onClick={onHome}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
                                    >
                                        <Home size={17} />
                                        Back to MiniVerse
                                    </button>
                                )}
                            </div>

                            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest text-slate-500">
                                <Crown size={13} className="text-yellow-400" />
                                MINI VERSE CHAMPIONSHIP
                            </div>

                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GameResult;
