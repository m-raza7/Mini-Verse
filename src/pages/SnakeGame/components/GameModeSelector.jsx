
import React from "react";

import {
    Crown,
    Clock3,
    Infinity,
    Flag,
    X,
    Check,
    Gamepad2,
} from "lucide-react";

import { motion } from "motion/react";

const modes = [
    {
        name: "Classic",
        icon: Crown,
        description: "Classic snake gameplay",
        color: "text-yellow-400",
    },
    {
        name: "Time Attack",
        icon: Clock3,
        description: "Beat the clock",
        color: "text-blue-400",
    },
    {
        name: "Endless",
        icon: Infinity,
        description: "Keep growing",
        color: "text-green-400",
    },
    {
        name: "Challenge",
        icon: Flag,
        description: "Complete missions",
        color: "text-pink-400",
    },
];

export default function GameModeSelector({
    selectedMode,
    onSelect,
    onClose,
}) {
    return (
        <motion.div
            className="
                fixed inset-0 z-[110]
                flex items-center justify-center
                bg-black/75
                p-4
                backdrop-blur-md
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="mode-title"
                onClick={(event) => event.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.25 }}
                className="
                    relative w-full max-w-[520px]
                    overflow-hidden
                    rounded-3xl
                    border border-purple-400/30
                    bg-[#100d20]/95
                    p-5 text-white
                    shadow-[0_0_70px_rgba(147,51,234,0.2)]
                    backdrop-blur-2xl
                    sm:p-7
                "
            >
                {/* DECORATIVE GLOW */}
                <div className="
                    pointer-events-none absolute
                    -right-20 -top-20
                    h-52 w-52 rounded-full
                    bg-purple-600/15 blur-[70px]
                " />

                {/* CLOSE BUTTON */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close game mode selector"
                    className="
                        absolute right-4 top-4 z-10
                        flex h-9 w-9 items-center justify-center
                        rounded-xl border border-white/10
                        bg-white/5 text-white/60
                        transition
                        hover:border-red-400/40
                        hover:bg-red-500/15
                        hover:text-red-400
                    "
                >
                    <X size={19} />
                </button>

                {/* HEADER */}
                <div className="relative mb-7 text-center">

                    <div className="
                        mx-auto mb-4
                        flex h-16 w-16 items-center justify-center
                        rounded-2xl
                        border border-purple-400/30
                        bg-purple-500/15
                        shadow-lg shadow-purple-500/10
                    ">
                        <Gamepad2
                            size={30}
                            className="text-purple-300"
                        />
                    </div>

                    <h2
                        id="mode-title"
                        className="text-2xl font-black sm:text-3xl"
                    >
                        Select <span className="text-purple-400">Game Mode</span>
                    </h2>

                    <p className="mt-2 text-sm text-white/50">
                        Choose your adventure and challenge yourself.
                    </p>
                </div>

                {/* MODE CARDS */}
                <div className="
                    relative grid grid-cols-1
                    gap-3 sm:grid-cols-2
                ">
                    {modes.map((mode, index) => {
                        const Icon = mode.icon;
                        const isSelected = selectedMode === mode.name;

                        return (
                            <motion.button
                                key={mode.name}
                                type="button"
                                onClick={() => onSelect(mode.name)}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.06 }}
                                whileHover={{ y: -3 }}
                                whileTap={{ scale: 0.97 }}
                                className={`
                                    relative flex min-h-[125px]
                                    flex-col items-start
                                    justify-center gap-3
                                    rounded-2xl border
                                    p-4 text-left
                                    transition-all duration-200
                                    ${isSelected
                                        ? "border-purple-400 bg-purple-500/15 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                                        : "border-white/10 bg-white/[0.035] hover:border-purple-400/40 hover:bg-purple-500/10"
                                    }
                                `}
                            >
                                {/* ICON + SELECTED CHECK */}
                                <div className="flex w-full items-center justify-between">
                                    <div className="
                                        flex h-10 w-10 items-center justify-center
                                        rounded-xl border border-white/10
                                        bg-white/5
                                    ">
                                        <Icon
                                            size={21}
                                            className={mode.color}
                                        />
                                    </div>

                                    {isSelected && (
                                        <div className="
                                            flex h-7 w-7 items-center justify-center
                                            rounded-full bg-purple-500
                                            text-white
                                        ">
                                            <Check size={16} strokeWidth={3} />
                                        </div>
                                    )}
                                </div>

                                {/* MODE DETAILS */}
                                <div>
                                    <h3 className="text-sm font-bold text-white">
                                        {mode.name}
                                    </h3>

                                    <p className="mt-1 text-xs text-white/45">
                                        {mode.description}
                                    </p>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* FOOTER */}
                <div className="
                    relative mt-6 flex items-center
                    justify-between gap-3
                    border-t border-white/10 pt-5
                ">
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-purple-300">
                            Selected Mode
                        </p>

                        <p className="mt-1 text-sm font-bold text-white">
                            {selectedMode}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            rounded-xl border border-white/10
                            bg-white/5 px-5 py-2.5
                            text-xs font-bold text-white/70
                            transition hover:bg-white/10
                            hover:text-white
                        "
                    >
                        Close
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
