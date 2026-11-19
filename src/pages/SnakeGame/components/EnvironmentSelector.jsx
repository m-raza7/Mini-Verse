
import React from "react";

import { motion } from "motion/react";

import {
    X,
    Check,
    Play,
    Globe2,
    Lock,
    Sparkles,
} from "lucide-react";

import { environments } from "../config/environments";

export default function EnvironmentSelector({
    selectedTheme,
    onSelect,
    onStart,
    onClose,
}) {
    const selectedEnvironment = environments.find(
        (environment) => environment.id === selectedTheme
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.96 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            className="
                relative mx-auto
                flex max-h-[92vh] w-full max-w-5xl
                flex-col overflow-hidden
                rounded-3xl
                border border-purple-400/30
                bg-[#100d20]/95
                text-white
                shadow-[0_0_70px_rgba(147,51,234,0.2)]
                backdrop-blur-2xl
            "
        >
            {/* ======================================
                HEADER
            ====================================== */}

            <div className="
                flex shrink-0 items-start justify-between
                gap-4 border-b border-white/[0.07]
                p-4 sm:p-6 lg:px-8
            ">
                <div>
                    <div className="mb-3 flex items-center gap-2">

                        <span className="
                            flex h-9 w-9 items-center
                            justify-center rounded-xl
                            border border-purple-400/30
                            bg-purple-500/15 text-purple-300
                        ">
                            <Globe2 size={20} />
                        </span>

                        <span className="
                            text-xs font-bold uppercase
                            tracking-[0.2em] text-purple-300
                        ">
                            World Selection
                        </span>
                    </div>

                    <h2 className="
                        text-2xl font-black tracking-tight
                        sm:text-3xl
                    ">
                        Choose Your{" "}
                        <span className="text-purple-400">
                            World
                        </span>
                    </h2>

                    <p className="
                        mt-2 text-xs leading-5
                        text-white/50 sm:text-sm
                    ">
                        Select an environment for your next adventure.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close environment selector"
                    className="
                        flex h-10 w-10 shrink-0
                        items-center justify-center
                        rounded-xl border border-white/10
                        bg-white/5 text-white/60
                        transition-all duration-200
                        hover:border-red-400/40
                        hover:bg-red-500/15
                        hover:text-red-300
                    "
                >
                    <X size={20} />
                </button>
            </div>

            {/* ======================================
                SELECTED ENVIRONMENT
            ====================================== */}

            <div className="
                mx-4 mt-4 flex shrink-0
                flex-wrap items-center justify-between
                gap-3 rounded-xl
                border border-purple-400/20
                bg-purple-500/10 px-4 py-3
                sm:mx-6 lg:mx-8
            ">
                <div className="flex items-center gap-3">

                    <span className="text-2xl">
                        {selectedEnvironment?.icon || "🌍"}
                    </span>

                    <div>
                        <p className="
                            text-[10px] font-semibold
                            uppercase tracking-wider
                            text-purple-300
                        ">
                            Currently Selected
                        </p>

                        <p className="text-sm font-bold text-white">
                            {selectedEnvironment?.name || "Choose a world"}
                        </p>
                    </div>
                </div>

                <span className="
                    rounded-full border border-green-400/20
                    bg-green-400/10 px-3 py-1
                    text-[10px] font-semibold
                    text-green-300 sm:text-xs
                ">
                    <Check size={12} className="mr-1 inline" />
                    Environment Ready
                </span>
            </div>

            {/* ======================================
                ENVIRONMENT CARDS
            ====================================== */}

            <div className="
                min-h-0 flex-1 overflow-y-auto
                px-4 py-4 sm:px-6 lg:px-8
                [scrollbar-width:thin]
                [scrollbar-color:#7543a8_transparent]
            ">
                <div className="
                    grid grid-cols-1 gap-4
                    sm:grid-cols-2 lg:grid-cols-3
                ">
                    {environments.map((environment, index) => {
                        const isSelected =
                            selectedTheme === environment.id;

                        const isLocked = !environment.unlocked;

                        return (
                            <motion.button
                                key={environment.id}
                                type="button"
                                disabled={isLocked}
                                aria-pressed={isSelected}
                                aria-label={`Select ${environment.name} environment`}
                                onClick={() => onSelect(environment.id)}
                                initial={{
                                    opacity: 0,
                                    y: 15,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: index * 0.06,
                                    duration: 0.3,
                                }}
                                whileHover={
                                    !isLocked
                                        ? {
                                            y: -4,
                                            scale: 1.015,
                                        }
                                        : undefined
                                }
                                whileTap={
                                    !isLocked
                                        ? { scale: 0.98 }
                                        : undefined
                                }
                                className={`
                                    group relative
                                    h-44 overflow-hidden
                                    rounded-2xl border-2
                                    text-left
                                    transition-all duration-300
                                    sm:h-48

                                    ${isSelected
                                        ? "border-purple-400 shadow-[0_0_22px_rgba(168,85,247,0.4)]"
                                        : "border-white/10 hover:border-purple-400/60"
                                    }

                                    ${isLocked
                                        ? "cursor-not-allowed opacity-50"
                                        : "cursor-pointer"
                                    }
                                `}
                            >
                                {/* BACKGROUND IMAGE */}

                                <div
                                    className="
                                        absolute inset-0
                                        bg-cover bg-center
                                        transition-transform
                                        duration-700
                                        group-hover:scale-110
                                    "
                                    style={{
                                        backgroundColor:
                                            environment.background,

                                        backgroundImage:
                                            environment.backgroundImage
                                                ? `url("${environment.backgroundImage}")`
                                                : undefined,
                                    }}
                                />

                                {/* IMAGE OVERLAY */}

                                <div className="
                                    absolute inset-0
                                    bg-gradient-to-t
                                    from-[#090713]
                                    via-black/30
                                    to-black/5
                                " />

                                {/* SELECTED GLOW */}

                                {isSelected && (
                                    <div className="
                                        absolute inset-0
                                        bg-purple-500/10
                                    " />
                                )}

                                {/* SELECTED CHECK */}

                                {isSelected && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale: 0.5,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        className="
                                            absolute right-3 top-3
                                            flex h-8 w-8
                                            items-center justify-center
                                            rounded-full
                                            bg-purple-500 text-white
                                            shadow-lg
                                            shadow-purple-500/40
                                        "
                                    >
                                        <Check
                                            size={18}
                                            strokeWidth={3}
                                        />
                                    </motion.div>
                                )}

                                {/* LOCKED ICON */}

                                {isLocked && (
                                    <div className="
                                        absolute right-3 top-3
                                        flex h-8 w-8
                                        items-center justify-center
                                        rounded-full bg-black/60
                                        text-white
                                    ">
                                        <Lock size={16} />
                                    </div>
                                )}

                                {/* CARD CONTENT */}

                                <div className="
                                    absolute inset-x-0 bottom-0 p-4
                                ">
                                    <div className="
                                        mb-2 flex
                                        items-center justify-between gap-2
                                    ">
                                        <span className="
                                            text-2xl drop-shadow-lg
                                        ">
                                            {environment.icon}
                                        </span>

                                        <span className="
                                            rounded-full border
                                            border-white/15
                                            bg-black/40 px-2.5 py-1
                                            text-[10px] font-semibold
                                            text-white/80
                                            backdrop-blur-md
                                        ">
                                            {environment.weather}
                                        </span>
                                    </div>

                                    <h3 className="
                                        text-base font-extrabold
                                        text-white drop-shadow-lg
                                    ">
                                        {environment.name}
                                    </h3>

                                    <p className="
                                        mt-1 line-clamp-1
                                        text-xs text-white/65
                                    ">
                                        {environment.description}
                                    </p>
                                </div>

                                {/* SELECTION LABEL */}

                                {isSelected && (
                                    <div className="
                                        absolute left-3 top-3
                                        rounded-full
                                        bg-purple-500 px-3 py-1
                                        text-[10px] font-bold
                                        uppercase tracking-wider
                                        text-white
                                    ">
                                        Selected
                                    </div>
                                )}

                                {/* LOCKED LABEL */}

                                {isLocked && (
                                    <div className="
                                        absolute inset-0
                                        flex items-center
                                        justify-center
                                        bg-black/20
                                    ">
                                        <span className="
                                            rounded-full
                                            border border-white/20
                                            bg-black/60 px-4 py-2
                                            text-xs font-bold
                                            text-white
                                            backdrop-blur-md
                                        ">
                                            <Lock
                                                size={12}
                                                className="mr-2 inline"
                                            />
                                            Coming Soon
                                        </span>
                                    </div>
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* ======================================
                FOOTER
            ====================================== */}

            <div className="
                flex shrink-0 flex-col-reverse
                items-center justify-between
                gap-4 border-t border-white/10
                px-4 py-4 sm:flex-row
                sm:px-6 lg:px-8
            ">
                <div className="
                    flex items-center gap-2
                    text-center text-xs
                    text-white/40 sm:text-left
                ">
                    <Sparkles
                        size={14}
                        className="shrink-0 text-purple-400"
                    />

                    <span>
                        {selectedEnvironment
                            ? `${selectedEnvironment.name} selected. Ready to explore!`
                            : "Choose your world and begin your adventure."}
                    </span>
                </div>

                <button
                    type="button"
                    disabled={!selectedEnvironment || !selectedEnvironment.unlocked}
                    onClick={onStart}
                    className="
                        flex w-full shrink-0
                        items-center justify-center gap-3
                        rounded-xl
                        bg-gradient-to-r
                        from-purple-600 to-fuchsia-600
                        px-8 py-3.5
                        text-sm font-extrabold text-white
                        shadow-lg shadow-purple-600/25
                        transition-all duration-300
                        hover:-translate-y-1
                        hover:shadow-purple-500/40
                        active:scale-95
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        sm:w-auto
                    "
                >
                    <Check size={17} strokeWidth={2.5} />

                    Apply Environment
                </button>
            </div>
        </motion.div>
    );
}
