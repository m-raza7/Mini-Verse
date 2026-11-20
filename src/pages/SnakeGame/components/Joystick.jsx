
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import {
    Move,
    ArrowUp,
    ArrowDown,
    ArrowLeft,
    ArrowRight,
} from "lucide-react";

const MAX_TRAVEL = 42;
const DEAD_ZONE = 18;

const Joystick = ({ onDirectionChange }) => {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

    const [isActive, setIsActive] = useState(false);

    const activeRef = useRef(false);
    const lastDirectionRef = useRef(null);

    // Determine direction
    const handleMove = (event) => {
        if (!activeRef.current) return;

        const rect = event.currentTarget.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;

        const distance = Math.sqrt(dx * dx + dy * dy);

        // Restrict joystick movement
        const scale =
            distance > MAX_TRAVEL
                ? MAX_TRAVEL / distance
                : 1;

        const x = dx * scale;
        const y = dy * scale;

        setPosition({ x, y });

        // Ignore accidental movement
        if (distance < DEAD_ZONE) return;

        let direction;

        // Select dominant direction
        if (Math.abs(dx) > Math.abs(dy)) {
            direction = dx > 0 ? "RIGHT" : "LEFT";
        } else {
            direction = dy > 0 ? "DOWN" : "UP";
        }

        // Prevent repeated direction updates
        if (lastDirectionRef.current !== direction) {
            lastDirectionRef.current = direction;

            onDirectionChange?.(direction);
        }
    };

    // Start dragging
    const handleStart = (event) => {
        event.preventDefault();

        activeRef.current = true;
        lastDirectionRef.current = null;

        setIsActive(true);

        event.currentTarget.setPointerCapture(event.pointerId);

        handleMove(event);
    };

    // Stop dragging
    const handleEnd = () => {
        activeRef.current = false;
        lastDirectionRef.current = null;

        setIsActive(false);

        setPosition({
            x: 0,
            y: 0,
        });
    };

    return (
        <div className="flex flex-col items-center gap-4">

            {/* Controller heading */}
            <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                    <Move size={17} className="text-purple-400" />

                    <h3 className="text-sm font-extrabold tracking-widest text-white">
                        SNAKE CONTROLLER
                    </h3>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                    Drag the joystick to control your snake
                </p>
            </div>

            {/* Joystick */}
            <motion.div
                animate={{
                    scale: isActive ? 1.04 : 1,
                    borderColor: isActive ? "#c084fc" : "#7c3aed",
                }}
                transition={{ duration: 0.2 }}
                onPointerDown={handleStart}
                onPointerMove={handleMove}
                onPointerUp={handleEnd}
                onPointerCancel={handleEnd}
                className="
          relative flex h-36 w-36
          touch-none select-none
          cursor-grab items-center
          justify-center rounded-full
          border-2 border-purple-600
          bg-gradient-to-br
          from-[#282047] to-[#100d25]
          shadow-[0_0_30px_rgba(139,92,246,0.25)]
          active:cursor-grabbing
        "
            >

                {/* Outer ring */}
                <div className="
          absolute inset-3 rounded-full
          border border-purple-400/20
        " />

                {/* Direction indicators */}
                <div className="
          absolute inset-5 grid
          grid-cols-3 grid-rows-3
          place-items-center
          text-purple-400/40
        ">
                    <span className="col-start-2 row-start-1">
                        <ArrowUp size={14} />
                    </span>

                    <span className="col-start-1 row-start-2">
                        <ArrowLeft size={14} />
                    </span>

                    <span className="col-start-3 row-start-2">
                        <ArrowRight size={14} />
                    </span>

                    <span className="col-start-2 row-start-3">
                        <ArrowDown size={14} />
                    </span>
                </div>

                {/* Draggable knob */}
                <motion.div
                    animate={{
                        x: position.x,
                        y: position.y,
                        scale: isActive ? 1.08 : 1,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        mass: 0.5,
                    }}
                    className="
            relative z-10
            flex h-16 w-16
            items-center justify-center
            rounded-full border-2
            border-purple-200/50
            bg-gradient-to-br
            from-purple-500 via-violet-600
            to-indigo-700
            text-white
            shadow-[0_0_25px_rgba(168,85,247,0.65)]
            pointer-events-none
          "
                >
                    <Move size={25} strokeWidth={2.5} />
                </motion.div>

                {/* Center glow */}
                <div className="
          pointer-events-none absolute
          h-20 w-20 rounded-full
          bg-purple-500/10 blur-xl
        " />

            </motion.div>

            {/* Controller status */}
            <motion.div
                key={isActive ? "active" : "idle"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="
          flex items-center gap-2
          rounded-full border
          border-white/10
          bg-white/[0.04]
          px-4 py-2
        "
            >
                <span className={`
          h-2 w-2 rounded-full
          ${isActive
                        ? "bg-emerald-400 shadow-[0_0_10px_#34d399]"
                        : "bg-purple-400"
                    }
        `} />

                <span className="text-[10px] font-bold tracking-wider text-slate-300">
                    {isActive ? "CONTROLLER ACTIVE" : "READY TO PLAY"}
                </span>
            </motion.div>

        </div>
    );
};

export default Joystick;
