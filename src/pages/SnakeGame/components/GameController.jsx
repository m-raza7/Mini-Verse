
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
    Move,
    Gamepad2,
    ArrowUp,
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    Repeat2,
} from "lucide-react";

import Joystick from "./Joystick";

const STORAGE_KEY = "miniverse-snake-controller";

const GameController = ({
    onDirectionChange,
    disabled = false,
}) => {
    const [mode, setMode] = useState(() => {
        return localStorage.getItem(STORAGE_KEY) || "buttons";
    });

    const toggleMode = () => {
        const nextMode = mode === "buttons" ? "joystick" : "buttons";

        setMode(nextMode);
        localStorage.setItem(STORAGE_KEY, nextMode);
    };

    const directions = [
        { direction: "UP", icon: ArrowUp, position: "col-start-2 row-start-1" },
        { direction: "LEFT", icon: ArrowLeft, position: "col-start-1 row-start-2" },
        { direction: "RIGHT", icon: ArrowRight, position: "col-start-3 row-start-2" },
        { direction: "DOWN", icon: ArrowDown, position: "col-start-2 row-start-3" },
    ];

    return (
        <div className="flex flex-col items-center gap-4">

            {/* Controller heading */}
            <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                    {mode === "buttons" ? (
                        <Gamepad2 size={18} className="text-purple-400" />
                    ) : (
                        <Move size={18} className="text-purple-400" />
                    )}

                    <h3 className="text-sm font-extrabold tracking-widest text-white">
                        SNAKE CONTROLLER
                    </h3>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                    {mode === "buttons"
                        ? "Use arrow buttons to move"
                        : "Drag the joystick to move"}
                </p>
            </div>

            {/* One controller + toggle beside it */}
            <div className="flex items-center justify-center gap-4">

                <div className="relative flex min-h-[150px] min-w-[150px] items-center justify-center">

                    <AnimatePresence mode="wait">
                        {mode === "buttons" ? (
                            <motion.div
                                key="buttons"
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.85 }}
                                transition={{ duration: 0.2 }}
                                className="grid h-36 w-36 grid-cols-3 grid-rows-3 gap-2"
                            >
                                {directions.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <button
                                            key={item.direction}
                                            type="button"
                                            disabled={disabled}
                                            onClick={() =>
                                                onDirectionChange?.(item.direction)
                                            }
                                            className={`
                                                ${item.position}
                                                flex items-center justify-center
                                                rounded-xl border border-purple-400/30
                                                bg-gradient-to-br from-purple-600 to-indigo-800
                                                text-white shadow-lg
                                                transition-all active:scale-90
                                                hover:from-purple-500 hover:to-indigo-600
                                                disabled:cursor-not-allowed disabled:opacity-40
                                            `}
                                        >
                                            <Icon size={23} />
                                        </button>
                                    );
                                })}

                                <div className="col-start-2 row-start-2 flex items-center justify-center rounded-xl border border-white/10 bg-[#17132a]">
                                    <Gamepad2
                                        size={23}
                                        className="text-purple-400"
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="joystick"
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.85 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Joystick
                                    onDirectionChange={onDirectionChange}
                                    disabled={disabled}
                                    compact
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Toggle button beside controller */}
                <button
                    type="button"
                    onClick={toggleMode}
                    className="
                        flex h-11 w-11 shrink-0 items-center justify-center
                        rounded-xl border border-purple-400/30
                        bg-purple-500/15 text-purple-300
                        shadow-lg shadow-purple-900/20
                        transition-all hover:scale-105
                        hover:bg-purple-500/30 active:scale-95
                    "
                    title={
                        mode === "buttons"
                            ? "Switch to joystick"
                            : "Switch to arrow buttons"
                    }
                >
                    <Repeat2 size={21} />
                </button>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                <span
                    className={`h-2 w-2 rounded-full ${disabled
                            ? "bg-slate-500"
                            : "bg-emerald-400 shadow-[0_0_10px_#34d399]"
                        }`}
                />

                <span className="text-[10px] font-bold tracking-wider text-slate-300">
                    {disabled
                        ? "CONTROLLER DISABLED"
                        : mode === "buttons"
                            ? "ARROW BUTTON MODE"
                            : "JOYSTICK MODE"}
                </span>
            </div>
        </div>
    );
};

export default GameController;
