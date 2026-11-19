
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Crown,
    UserRound,
    Swords,
} from "lucide-react";

const PlayerCard = ({
    name,
    color,
    score,
    active,
    winner,
    playerNumber,
}) => {
    const isBlue = color === "blue";

    return (
        <motion.div
            animate={{
                scale: active ? 1.035 : 1,
                y: active ? -3 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className={`relative flex-1 overflow-hidden rounded-2xl border p-3 sm:p-5 transition-colors duration-300 ${isBlue
                    ? active
                        ? "border-blue-400/70 bg-blue-500/15 shadow-[0_0_30px_#4388ff25]"
                        : "border-blue-400/20 bg-blue-500/[0.05]"
                    : active
                        ? "border-rose-400/70 bg-rose-500/15 shadow-[0_0_30px_#ff527725]"
                        : "border-rose-400/20 bg-rose-500/[0.05]"
                }`}
        >
            {/* Background decoration */}
            <div
                className={`absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl opacity-20 ${isBlue ? "bg-blue-400" : "bg-rose-400"
                    }`}
            />

            <div className="relative z-10">
                {/* Player information */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <div
                        className={`flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl ${isBlue
                                ? "bg-gradient-to-br from-blue-400 to-blue-700"
                                : "bg-gradient-to-br from-rose-400 to-rose-700"
                            }`}
                    >
                        <UserRound size={20} className="text-white" />
                    </div>

                    <div className="min-w-0">
                        <h3 className="truncate text-xs sm:text-sm font-extrabold text-white">
                            {name}
                        </h3>

                        <p
                            className={`mt-1 text-[9px] font-bold tracking-wider ${isBlue ? "text-blue-300" : "text-rose-300"
                                }`}
                        >
                            PLAYER {playerNumber}
                        </p>
                    </div>
                </div>

                {/* Score */}
                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <p className="text-[9px] font-bold tracking-widest text-slate-400">
                            BOXES WON
                        </p>

                        <AnimatePresence mode="popLayout">
                            <motion.p
                                key={score}
                                initial={{ opacity: 0, y: 12, scale: 0.7 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.7 }}
                                transition={{ duration: 0.2 }}
                                className={`mt-1 text-3xl sm:text-4xl font-black ${isBlue ? "text-blue-300" : "text-rose-300"
                                    }`}
                            >
                                {score}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {winner && (
                        <Crown
                            size={23}
                            className="mb-1 text-yellow-400"
                        />
                    )}
                </div>

                {/* Active indicator */}
                <div
                    className={`mt-3 flex items-center gap-2 text-[10px] font-bold ${active
                            ? isBlue
                                ? "text-blue-300"
                                : "text-rose-300"
                            : "text-slate-500"
                        }`}
                >
                    <span
                        className={`h-2 w-2 rounded-full ${active
                                ? isBlue
                                    ? "bg-blue-400 animate-pulse"
                                    : "bg-rose-400 animate-pulse"
                                : "bg-slate-600"
                            }`}
                    />

                    {active ? "YOUR TURN" : "WAITING"}
                </div>
            </div>
        </motion.div>
    );
};

const GameScore = ({ scores, currentPlayer, winner }) => {
    return (
        <section className="w-full max-w-2xl mx-auto mt-8">
            <div className="flex items-center gap-2 sm:gap-4">

                <PlayerCard
                    name="Blue Player"
                    color="blue"
                    score={scores.blue}
                    active={currentPlayer === "blue" && !winner}
                    winner={winner === "blue"}
                    playerNumber={1}
                />

                {/* VS */}
                <div className="flex shrink-0 flex-col items-center gap-1">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
                        <Swords size={17} className="text-purple-300" />
                    </div>

                    <span className="text-[9px] font-black tracking-widest text-slate-500">
                        VS
                    </span>
                </div>

                <PlayerCard
                    name="Red Player"
                    color="red"
                    score={scores.red}
                    active={currentPlayer === "red" && !winner}
                    winner={winner === "red"}
                    playerNumber={2}
                />

            </div>
        </section>
    );
};

export default GameScore;
