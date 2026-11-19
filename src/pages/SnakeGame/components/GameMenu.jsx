
import React from "react";
import { motion } from "motion/react";

import {
    Play,
    Gamepad2,
    Trophy,
    Settings,
    Globe,
} from "lucide-react";

export default function GameMenu({
    onPlay,
    onEnvironment,
    onModes,
    onLeaderboard,
    onSettings,
}) {
    const menuItems = [
        {
            label: "Choose Environment",
            icon: Globe,
            action: onEnvironment,
        },
        {
            label: "Game Modes",
            icon: Gamepad2,
            action: onModes,
        },
        {
            label: "Leaderboard",
            icon: Trophy,
            action: onLeaderboard,
        },
        {
            label: "Settings",
            icon: Settings,
            action: onSettings,
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: 0.3 }}
            className="
        relative w-full max-w-[360px]
        rounded-[26px]
        border border-purple-500
        bg-[#0d0b20]/[0.97]
        px-6 py-6
        text-center text-white
        shadow-[0_0_35px_rgba(168,85,247,0.2)]
        backdrop-blur-xl
      "
        >
            {/* SNAKE LOGO */}
            <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
          mx-auto mb-2
          flex h-20 w-20 items-center justify-center
          text-6xl
          drop-shadow-[0_0_18px_rgba(74,222,128,0.6)]
        "
            >
                🐍
            </motion.div>

            {/* TITLE */}
            <h2 className="text-xl font-bold">
                Snake <span className="text-purple-400">Game</span>
            </h2>

            <p className="mb-4 mt-1 text-[10px] text-white/60">
                Enter the jungle. Become the champion.
            </p>

            {/* PLAY BUTTON */}
            <motion.button
                type="button"
                onClick={onPlay}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="
          flex w-full items-center justify-center gap-2
          rounded-full
          bg-gradient-to-r from-purple-600 to-fuchsia-600
          py-3
          text-xs font-bold text-white
          shadow-lg shadow-purple-600/20
        "
            >
                <Play size={17} fill="currentColor" />
                Play Game
            </motion.button>

            {/* MENU BUTTONS */}
            <div className="mt-2 flex flex-col gap-2">
                {menuItems.map(({ label, icon: Icon, action }) => (
                    <motion.button
                        key={label}
                        type="button"
                        onClick={action}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="
              flex w-full items-center justify-center gap-2
              rounded-full
              border border-purple-500/30
              bg-[#211b38]
              py-3
              text-xs font-bold text-white
              transition-colors
              hover:bg-purple-500/20
            "
                    >
                        <Icon size={17} />
                        {label}
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
}
