
import React from "react";
import { motion } from "motion/react";
import {
    ArrowLeft,
    Grid2X2,
    Sparkles,
    Wifi,
} from "lucide-react";

const GameHeader = ({ onBack }) => {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-6xl mx-auto flex items-center justify-between gap-3"
        >
            {/* Back button */}
            <motion.button
                type="button"
                onClick={onBack}
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.92 }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
                aria-label="Go back"
            >
                <ArrowLeft size={20} />
            </motion.button>

            {/* Branding */}
            <div className="flex flex-1 items-center gap-3">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-violet-700 shadow-lg shadow-purple-600/30">
                    <Grid2X2 size={23} className="text-white" />

                    <Sparkles
                        size={12}
                        className="absolute -right-1 -top-1 text-yellow-300"
                    />
                </div>

                <div>
                    <h1 className="text-base sm:text-xl font-black tracking-tight text-white">
                        Dots <span className="text-purple-400">&</span> Boxes
                    </h1>

                    <p className="text-[10px] sm:text-xs text-slate-400">
                        MINI VERSE ARCADE
                    </p>
                </div>
            </div>

            {/* Game status */}
            <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-2">
                <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>

                <span className="hidden sm:block text-[10px] font-bold tracking-wider text-emerald-300">
                    LOCAL MATCH
                </span>

                <Wifi size={14} className="text-emerald-400 sm:hidden" />
            </div>
        </motion.header>
    );
};

export default GameHeader;
