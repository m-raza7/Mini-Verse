
import React, { useState } from "react";
import {
    X,
    Music2,
    Volume2,
    Gauge,
    Grid3X3,
    Check,
    Settings,
} from "lucide-react";
import { motion } from "motion/react";

export default function GameSettings({ sound, setSound, onClose }) {
    const [music, setMusic] = useState(true);
    const [gameSpeed, setGameSpeed] = useState(140);
    const [gridStyle, setGridStyle] = useState("Neon");

    const gridStyles = ["Neon", "Classic", "Minimal"];

    return (
        <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                role="dialog"
                aria-modal="true"
                onClick={(event) => event.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.25 }}
                className="relative w-full max-w-[480px] max-h-[90vh] overflow-y-auto rounded-3xl border border-purple-400/30 bg-[#100d20]/95 p-5 text-white shadow-[0_0_70px_rgba(147,51,234,0.2)] backdrop-blur-2xl sm:p-7"
            >
                <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-purple-600/15 blur-[70px]" />

                {/* CLOSE */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close settings"
                    className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-400"
                >
                    <X size={19} />
                </button>

                {/* HEADER */}
                <div className="relative mb-7 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-500/15 shadow-lg shadow-purple-500/10">
                        <Settings size={30} className="text-purple-300" />
                    </div>

                    <h2 className="text-2xl font-black sm:text-3xl">
                        Game <span className="text-purple-400">Settings</span>
                    </h2>

                    <p className="mt-2 text-sm text-white/50">
                        Customize your gaming experience.
                    </p>
                </div>

                <div className="relative space-y-3">

                    {/* MUSIC */}
                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                                <Music2 size={21} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold">Background Music</h3>
                                <p className="mt-1 text-xs text-white/40">
                                    Enable game music
                                </p>
                            </div>
                        </div>

                        <input
                            type="checkbox"
                            checked={music}
                            onChange={(e) => setMusic(e.target.checked)}
                            className="h-5 w-5 cursor-pointer accent-purple-500"
                        />
                    </div>

                    {/* SOUND */}
                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                                <Volume2 size={21} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold">Sound Effects</h3>
                                <p className="mt-1 text-xs text-white/40">
                                    Game sounds and alerts
                                </p>
                            </div>
                        </div>

                        <input
                            type="checkbox"
                            checked={sound}
                            onChange={(e) => setSound(e.target.checked)}
                            className="h-5 w-5 cursor-pointer accent-purple-500"
                        />
                    </div>

                    {/* GAME SPEED */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                                    <Gauge size={21} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold">Game Speed</h3>
                                    <p className="mt-1 text-xs text-white/40">
                                        Adjust snake speed
                                    </p>
                                </div>
                            </div>

                            <span className="rounded-lg border border-purple-400/20 bg-purple-500/15 px-3 py-1 text-xs font-bold text-purple-300">
                                {gameSpeed}%
                            </span>
                        </div>

                        <input
                            type="range"
                            min="65"
                            max="200"
                            step="5"
                            value={gameSpeed}
                            onChange={(e) => setGameSpeed(Number(e.target.value))}
                            className="h-2 w-full cursor-pointer accent-purple-500"
                        />

                        <div className="mt-2 flex justify-between text-[10px] text-white/35">
                            <span>Slow</span>
                            <span>Normal</span>
                            <span>Fast</span>
                        </div>
                    </div>

                    {/* GRID STYLE */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                                <Grid3X3 size={21} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold">Grid Style</h3>
                                <p className="mt-1 text-xs text-white/40">
                                    Customize board appearance
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            {gridStyles.map((style) => {
                                const active = gridStyle === style;

                                return (
                                    <button
                                        key={style}
                                        type="button"
                                        onClick={() => setGridStyle(style)}
                                        className={`flex items-center justify-center gap-1.5 rounded-xl border px-2 py-2.5 text-xs font-semibold transition ${active
                                                ? "border-purple-400 bg-purple-500/20 text-purple-300"
                                                : "border-white/10 bg-white/5 text-white/50 hover:border-purple-400/40"
                                            }`}
                                    >
                                        {active && <Check size={13} />}
                                        {style}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="relative mt-6 flex justify-end border-t border-white/10 pt-5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-7 py-3 text-xs font-bold text-white shadow-lg shadow-purple-500/20 transition hover:-translate-y-0.5 hover:shadow-purple-500/40 active:scale-95"
                    >
                        Done
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
