
import React from "react";
import { motion } from "motion/react";

const GameBoard = ({ game, connectDots }) => {
    const { size, edges, boxes, gameOver } = game;

    const cells = [];

    for (let row = 0; row <= size * 2; row++) {
        for (let col = 0; col <= size * 2; col++) {

            // DOTS
            if (row % 2 === 0 && col % 2 === 0) {
                cells.push(
                    <div
                        key={`dot-${row}-${col}`}
                        className="relative z-20 flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-white shadow-[0_0_12px_#c4b5fd]"
                        />
                    </div>
                );
            }

            // HORIZONTAL LINES
            else if (row % 2 === 0 && col % 2 !== 0) {
                const r = row / 2;
                const c = (col - 1) / 2;
                const id = `h-${r}-${c}`;
                const owner = edges[id];

                cells.push(
                    <button
                        key={id}
                        type="button"
                        aria-label={`Horizontal line ${r}-${c}`}
                        disabled={!!owner || gameOver}
                        onClick={() => connectDots("h", r, c)}
                        className="group relative flex items-center justify-center min-w-0 min-h-0 cursor-pointer disabled:cursor-default"
                    >
                        <span className="absolute h-2 w-full rounded-full bg-white/10 transition-all group-hover:bg-purple-400/60 group-hover:shadow-[0_0_12px_#a78bfa]" />

                        {owner && (
                            <motion.span
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className={`absolute z-10 h-2 w-full rounded-full origin-left ${owner === "blue"
                                        ? "bg-gradient-to-r from-blue-400 to-cyan-300 shadow-[0_0_12px_#4388ff]"
                                        : "bg-gradient-to-r from-rose-500 to-pink-300 shadow-[0_0_12px_#ff5277]"
                                    }`}
                            />
                        )}
                    </button>
                );
            }

            // VERTICAL LINES
            else if (row % 2 !== 0 && col % 2 === 0) {
                const r = (row - 1) / 2;
                const c = col / 2;
                const id = `v-${r}-${c}`;
                const owner = edges[id];

                cells.push(
                    <button
                        key={id}
                        type="button"
                        aria-label={`Vertical line ${r}-${c}`}
                        disabled={!!owner || gameOver}
                        onClick={() => connectDots("v", r, c)}
                        className="group relative flex items-center justify-center min-w-0 min-h-0 cursor-pointer disabled:cursor-default"
                    >
                        <span className="absolute h-full w-2 rounded-full bg-white/10 transition-all group-hover:bg-purple-400/60 group-hover:shadow-[0_0_12px_#a78bfa]" />

                        {owner && (
                            <motion.span
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className={`absolute z-10 h-full w-2 rounded-full origin-top ${owner === "blue"
                                        ? "bg-gradient-to-b from-blue-400 to-cyan-300 shadow-[0_0_12px_#4388ff]"
                                        : "bg-gradient-to-b from-rose-500 to-pink-300 shadow-[0_0_12px_#ff5277]"
                                    }`}
                            />
                        )}
                    </button>
                );
            }

            // BOXES
            else {
                const r = (row - 1) / 2;
                const c = (col - 1) / 2;
                const owner = boxes[`${r}-${c}`];

                cells.push(
                    <motion.div
                        key={`box-${r}-${c}`}
                        initial={false}
                        animate={{
                            scale: owner ? [0.75, 1.08, 1] : 1,
                            opacity: owner ? 1 : 0.3,
                        }}
                        transition={{ duration: 0.35 }}
                        className={`flex items-center justify-center rounded-lg m-0.5 transition-colors ${owner === "blue"
                                ? "bg-blue-500/25 shadow-[inset_0_0_20px_#4388ff35]"
                                : owner === "red"
                                    ? "bg-rose-500/25 shadow-[inset_0_0_20px_#ff527735]"
                                    : "bg-white/[0.015]"
                            }`}
                    >
                        {owner && (
                            <motion.span
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className={`text-sm sm:text-xl font-black ${owner === "blue"
                                        ? "text-blue-300"
                                        : "text-rose-300"
                                    }`}
                            >
                                {owner === "blue" ? "B" : "R"}
                            </motion.span>
                        )}
                    </motion.div>
                );
            }
        }
    }

    return (
        <div className="w-full max-w-[520px] mx-auto">
            <div className="relative rounded-2xl border border-white/10 bg-[#0c0b1d] p-3 sm:p-5 shadow-[0_20px_60px_#00000050]">

                <div
                    className="grid w-full aspect-square"
                    style={{
                        gridTemplateColumns: `repeat(${size * 2 + 1}, minmax(0, 1fr))`,
                        gridTemplateRows: `repeat(${size * 2 + 1}, minmax(0, 1fr))`,
                    }}
                >
                    {cells}
                </div>

            </div>
        </div>
    );
};

export default GameBoard;
