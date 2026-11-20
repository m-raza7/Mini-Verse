
import React from "react";
import { motion } from "motion/react";

import {
    Sparkles,
    Zap,
    Gamepad2,
    Layers3,
    Rocket,
    Orbit,
} from "lucide-react";

import logo from "../assets/logo.png";
import desktopBg from "../assets/bg-desktop.png";
import mobileBg from "../assets/bg-mobile.png";

const AppLoader = () => {
    const floatingIcons = [
        {
            Icon: Gamepad2,
            position: "left-[12%] top-[25%]",
            delay: 0,
        },
        {
            Icon: Zap,
            position: "right-[13%] top-[32%]",
            delay: 0.5,
        },
        {
            Icon: Layers3,
            position: "left-[18%] bottom-[25%]",
            delay: 1,
        },
        {
            Icon: Sparkles,
            position: "right-[17%] bottom-[22%]",
            delay: 1.5,
        },
    ];

    return (
        <div className="
      fixed inset-0 z-[9999]
      flex min-h-screen items-center justify-center
      overflow-hidden bg-[#080615] text-white
      selection:bg-purple-500/30
    ">

            {/* =================================
          BACKGROUND IMAGES
      ================================= */}

            <img
                src={desktopBg}
                alt=""
                className="
          absolute inset-0 hidden
          h-full w-full object-cover md:block
        "
            />

            <img
                src={mobileBg}
                alt=""
                className="
          absolute inset-0 h-full w-full
          object-cover md:hidden
        "
            />

            {/* Dark overlay */}

            <div className="
        absolute inset-0
        bg-gradient-to-b
        from-[#080615]/70
        via-[#100927]/75
        to-[#080615]/95
      " />

            {/* Background grid */}

            <div
                className="
          absolute inset-0 opacity-[0.12]
          pointer-events-none
        "
                style={{
                    backgroundImage: `
            linear-gradient(rgba(167,139,250,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167,139,250,0.15) 1px, transparent 1px)
          `,
                    backgroundSize: "45px 45px",
                    maskImage:
                        "radial-gradient(ellipse at center, black 10%, transparent 75%)",
                }}
            />

            {/* =================================
          AMBIENT GLOW
      ================================= */}

            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.25, 0.5, 0.25],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
          absolute left-1/2 top-1/2
          h-[350px] w-[350px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full bg-purple-600/30
          blur-[120px]
          pointer-events-none
        "
            />

            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
          absolute left-[-100px] top-[10%]
          h-64 w-64 rounded-full
          bg-blue-600/15 blur-[100px]
        "
            />

            <motion.div
                animate={{
                    x: [0, -40, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
          absolute bottom-[5%] right-[-100px]
          h-72 w-72 rounded-full
          bg-fuchsia-600/20 blur-[110px]
        "
            />

            {/* =================================
          FLOATING ICONS
      ================================= */}

            {floatingIcons.map(({ Icon, position, delay }, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: [0.2, 0.7, 0.2],
                        y: [0, -18, 0],
                        rotate: [0, 10, 0],
                    }}
                    transition={{
                        duration: 4,
                        delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className={`
            absolute ${position}
            hidden sm:flex
            h-12 w-12 items-center
            justify-center rounded-2xl
            border border-white/10
            bg-white/[0.04]
            text-purple-300
            backdrop-blur-xl
            shadow-[0_0_25px_rgba(139,92,246,0.15)]
          `}
                >
                    <Icon size={21} />
                </motion.div>
            ))}

            {/* =================================
          MAIN CONTENT
      ================================= */}

            <div className="
        relative z-10
        flex w-full max-w-xl
        flex-col items-center
        px-6 py-10 text-center
      ">

                {/* Top badge */}

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="
            mb-9 flex items-center gap-2
            rounded-full border border-purple-400/20
            bg-purple-500/[0.08]
            px-4 py-2
            shadow-[0_0_30px_rgba(139,92,246,0.1)]
            backdrop-blur-xl
          "
                >
                    <Sparkles
                        size={14}
                        className="text-purple-300"
                    />

                    <span className="
            text-[10px] font-bold
            tracking-[3px] text-purple-200
          ">
                        YOUR DIGITAL UNIVERSE
                    </span>

                    <span className="
            h-1.5 w-1.5 rounded-full
            bg-emerald-400
            shadow-[0_0_10px_#34d399]
          " />
                </motion.div>

                {/* =================================
            LOGO WITH ORBIT ANIMATION
        ================================= */}

                <motion.div
                    initial={{ opacity: 0, scale: 0.65, y: 25 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        type: "spring",
                        stiffness: 100,
                    }}
                    className="
            relative flex items-center
            justify-center
          "
                >

                    {/* Outer orbit */}

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="
              absolute h-[280px] w-[280px]
              sm:h-[350px] sm:w-[350px]
              rounded-full border border-dashed
              border-purple-400/20
            "
                    >
                        <span className="
              absolute left-1/2 top-0
              h-2 w-2 rounded-full
              bg-purple-300
              shadow-[0_0_15px_#c084fc]
            " />

                        <span className="
              absolute bottom-8 right-5
              h-2 w-2 rounded-full
              bg-blue-400
              shadow-[0_0_15px_#60a5fa]
            " />
                    </motion.div>

                    {/* Inner orbit */}

                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="
              absolute h-[240px] w-[240px]
              sm:h-[300px] sm:w-[300px]
              rounded-full border
              border-purple-300/20
            "
                    />

                    {/* Logo glow */}

                    <motion.div
                        animate={{
                            scale: [0.9, 1.15, 0.9],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                        }}
                        className="
              absolute h-40 w-40
              rounded-full bg-violet-500/30
              blur-[65px]
            "
                    />

                    {/* Actual logo */}

                    <motion.img
                        src={logo}
                        alt="MiniVerse"
                        animate={{
                            y: [0, -8, 0],
                            filter: [
                                "drop-shadow(0 0 20px rgba(168,85,247,0.35))",
                                "drop-shadow(0 0 45px rgba(168,85,247,0.75))",
                                "drop-shadow(0 0 20px rgba(168,85,247,0.35))",
                            ],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="
              relative z-10
              w-52 sm:w-64 md:w-72
              object-contain
            "
                    />

                </motion.div>

                {/* =================================
            HEADING
        ================================= */}

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-12"
                >

                    <h1 className="
            text-3xl sm:text-4xl
            font-black tracking-tight
            text-white
          ">
                        Welcome to{" "}
                        <span className="
              bg-gradient-to-r
              from-violet-300
              via-fuchsia-400
              to-pink-400
              bg-clip-text text-transparent
            ">
                            MiniVerse
                        </span>
                    </h1>

                    <p className="
            mx-auto mt-3 max-w-sm
            text-sm leading-6
            text-white/55
          ">
                        Your world of creativity, productivity
                        and endless possibilities.
                    </p>

                </motion.div>

                {/* =================================
            LOADING PROGRESS
        ================================= */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-12 w-full max-w-sm"
                >

                    {/* Loading status */}

                    <div className="
            mb-3 flex items-center
            justify-between gap-3
          ">
                        <div className="flex items-center gap-2">

                            <motion.span
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            >
                                <Orbit
                                    size={15}
                                    className="text-purple-300"
                                />
                            </motion.span>

                            <span className="
                text-xs font-semibold
                tracking-wide text-white/80
              ">
                                Preparing your universe
                            </span>

                        </div>

                        <span className="
              text-[10px] font-bold
              tracking-widest text-purple-300
            ">
                            LOADING
                        </span>

                    </div>

                    {/* Progress track */}

                    <div className="
            relative h-2 w-full
            overflow-hidden rounded-full
            border border-white/10
            bg-white/[0.07]
          ">

                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                absolute inset-y-0 left-0
                w-1/2 rounded-full
                bg-gradient-to-r
                from-violet-600
                via-fuchsia-400
                to-pink-400
                shadow-[0_0_20px_#c084fc]
              "
                        />

                    </div>

                    {/* Loading details */}

                    <div className="
            mt-4 flex items-center
            justify-center gap-2
          ">

                        <Rocket
                            size={13}
                            className="text-purple-300"
                        />

                        <p className="
              text-[10px] tracking-wide
              text-white/40
            ">
                            Something amazing is getting ready...
                        </p>

                    </div>

                </motion.div>

                {/* =================================
            BOTTOM BRANDING
        ================================= */}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="
            mt-14 flex items-center
            gap-2 text-[9px]
            font-bold tracking-[3px]
            text-white/30
          "
                >
                    <span className="
            h-px w-8 bg-gradient-to-r
            from-transparent to-purple-400/50
          " />

                    EXPLORE YOUR UNIVERSE

                    <span className="
            h-px w-8 bg-gradient-to-l
            from-transparent to-purple-400/50
          " />

                </motion.div>

            </div>

        </div>
    );
};

export default AppLoader;
