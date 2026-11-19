
import React from "react";

import {
    Volume2,
    VolumeX,
    Maximize,
    Settings,
    Crown,
} from "lucide-react";

import { motion } from "motion/react";

export default function GameHeader({
    gameMode,
    sound,
    setSound,
    onSettings,
    onLeaderboard,
}) {
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    };

    const actions = [
        {
            label: sound ? "Mute sound" : "Enable sound",
            icon: sound ? Volume2 : VolumeX,
            action: () => setSound((prev) => !prev),
        },
        {
            label: "Fullscreen",
            icon: Maximize,
            action: toggleFullscreen,
        },
        {
            label: "Settings",
            icon: Settings,
            action: onSettings,
        },
        {
            label: "Leaderboard",
            icon: Crown,
            action: onLeaderboard,
        },
    ];

    return (
        <header className="
            relative z-20
            mx-auto flex w-full max-w-[1600px]
            flex-wrap items-center justify-between
            gap-4 px-4 py-4
            sm:px-6
            lg:flex-nowrap lg:px-6 lg:py-5
        ">

            {/* LEFT: GAME BRAND */}
            <div className="
                flex min-w-0 items-center gap-3
                order-1
            ">
                <div className="
                    flex h-12 w-12 shrink-0
                    items-center justify-center
                    rounded-2xl
                    border border-purple-400/30
                    bg-purple-500/15
                    text-3xl
                    shadow-lg shadow-purple-500/10
                ">
                    🐍
                </div>

                <h1 className="
                    whitespace-nowrap
                    text-xl font-black
                    tracking-tight text-white
                    sm:text-2xl
                ">
                    Snake <span className="text-purple-400">Game</span>
                </h1>
            </div>

            {/* CENTER: GAME MODE */}
            <motion.div
                whileHover={{ scale: 1.04 }}
                className="
                    order-3 flex w-full
                    items-center justify-center
                    gap-3 rounded-full
                    border border-purple-400/30
                    bg-[#171329]/90
                    px-6 py-3
                    text-sm font-bold text-white
                    shadow-lg shadow-purple-950/20
                    sm:order-2 sm:w-auto
                "
            >
                <Crown
                    size={19}
                    className="text-yellow-400"
                />

                <span className="whitespace-nowrap">
                    {gameMode} Mode
                </span>
            </motion.div>

            {/* RIGHT: ACTION BUTTONS */}
            <div className="
                order-2 ml-auto
                flex shrink-0 items-center gap-2
                sm:order-3 sm:gap-3
            ">
                {actions.map((item) => {
                    const Icon = item.icon;

                    return (
                        <motion.button
                            key={item.label}
                            type="button"
                            onClick={item.action}
                            whileHover={{
                                scale: 1.08,
                                y: -2,
                            }}
                            whileTap={{ scale: 0.92 }}
                            title={item.label}
                            aria-label={item.label}
                            className="
                                flex h-10 w-10
                                items-center justify-center
                                rounded-full
                                border border-purple-400/20
                                bg-[#171329]/90
                                text-white
                                shadow-lg shadow-black/20
                                transition-colors duration-200
                                hover:border-purple-400/60
                                hover:bg-purple-500/20
                                hover:text-purple-200
                                sm:h-12 sm:w-12
                            "
                        >
                            <Icon size={19} />
                        </motion.button>
                    );
                })}
            </div>
        </header>
    );
}
