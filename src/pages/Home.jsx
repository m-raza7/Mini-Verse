import React from "react";
import { Link } from "react-router-dom";
import {
    CheckSquare,
    Coins,
    Trophy,
    Grid3X3,
    ArrowRight,
    IndianRupee,
    Rocket,
    Shield,
    Wifi,
    Zap,
    HandCoins,
    WalletCards,
} from "lucide-react";

// import bgdesktop from "../assets/bg-desktop.png";
// import mobileBg from "../assets/bg-mobile.png";
import newBg from "../assets/new-bg.png";
// import phoneMockup from "../assets/mobile-preview.png";
import Footer from "../components/Footer";
import logo from "../assets/logo.png"

const games = [
    {
        title: "Todo App",
        description: "Manage your daily tasks with ease.",
        path: "/todos",
        icon: CheckSquare,
        color: "from-blue-500 to-cyan-500",
    },
    {
        title: "Expense Tracker",
        description: "Track spending & manage budget.",
        path: "/expense-tracker",
        icon: IndianRupee,
        color: "from-green-500 to-emerald-500",
    },
    {
        title: "Money Tracker",
        description: "Manage income, expenses & savings.",
        path: "/money-tracker",
        icon: WalletCards,
        color: "from-orange-500 to-amber-500",
    },
    {
        title: "Money Recovery",
        description: "Track money given, recoveries & due dates.",
        path: "/money-recovery-tracker",
        icon: HandCoins,
        color: "from-blue-500 to-indigo-500",
    },
    {
        title: "Q & A Game",
        description: "Challenge your mind.",
        path: "/right-wrong",
        icon: Trophy,
        color: "from-orange-500 to-yellow-500",
    },
    {
        title: "Flip Coin",
        description: "Test your luck instantly.",
        path: "/flip-coin",
        icon: Coins,
        color: "from-purple-500 to-pink-500",
    },
    {
        title: "Right Wrong",
        description: "Strategic grid game.",
        path: "/right-wrong-grid",
        icon: Grid3X3,
        color: "from-pink-500 to-purple-500",
    },
];

// const features = [
//     {
//         title: "5+ Apps",
//         icon: Rocket,
//     },
//     {
//         title: "Fast",
//         icon: Zap,
//     },
//     {
//         title: "Offline Ready",
//         icon: Wifi,
//     },
//     {
//         title: "Secure",
//         icon: Shield,
//     },
// ];

export default function Home() {
    return (
        <div className="relative min-h-screen overflow-hidden pt-10">

            {/* =========================================================
        BACKGROUND
    ========================================================== */}

            {/* Desktop Background */}
            <div
                className="
            absolute
            inset-0
            hidden
            bg-cover
            bg-center
            bg-no-repeat
            md:block
        "
                style={{
                    backgroundImage: `url(${newBg})`,
                }}
            />

            {/* Mobile Background */}
            <div
                className="
            absolute
            inset-0
            bg-cover
            bg-center
            bg-no-repeat
            md:hidden
        "
                style={{
                    backgroundImage: `url(${newBg})`,
                }}
            />

            {/* Background Overlay */}
            <div
                className="
            absolute
            inset-0
            bg-[#050816]/65
            backdrop-blur-[2px]
        "
            />

            {/* Subtle Purple Glow */}
            <div
                className="
            pointer-events-none
            absolute
            -top-32
            left-1/2
            h-[420px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-violet-600/[0.12]
            blur-[120px]
        "
            />

            {/* =========================================================
        CONTENT
    ========================================================== */}

            <div
                className="
        relative
        z-10
        mx-auto
        max-w-7xl
        px-4
        pb-16
        pt-0
        sm:px-6
        lg:px-8
        lg:pt-12
    "
            >

                {/* =====================================================
            HERO
        ====================================================== */}

                <section className="mx-auto max-w-3xl text-center">

                    {/* Logo / Brand */}

                    {/* MiniVerse Text - Large Screen */}
                    <h1
                        className="
            hidden
            lg:block
            text-5xl
            font-black
            tracking-[-0.04em]
            text-white
            sm:text-6xl
            md:text-7xl
        "
                    >
                        <span className="text-white">
                            Mini
                        </span>

                        <span
                            className="
                bg-gradient-to-r
                from-violet-400
                via-fuchsia-400
                to-pink-400
                bg-clip-text
                text-transparent
            "
                        >
                            Verse
                        </span>
                    </h1>

                    {/* Logo - Mobile / Tablet */}
                    <div className="flex justify-center lg:hidden">
                        <img
                            src={logo}
                            alt="MiniVerse"
                            className="
    h-20
    w-auto
    object-contain
    sm:h-28
    md:h-32
"
                        />
                    </div>

                    {/* Main Tagline */}
                    <h2
                        className="
            mt-4
            text-2xl
            font-bold
            tracking-tight
            text-white
            sm:text-3xl
        "
                    >
                        Small apps. Big productivity.
                    </h2>

                    {/* Description */}
                    <p
                        className="
            mx-auto
            mt-4
            max-w-2xl
            text-sm
            leading-6
            text-slate-400
            sm:text-base
            sm:leading-7
        "
                    >
                        Simple tools for everyday tasks, money management,
                        productivity, and fun — all in one place.
                    </p>

                </section>


                {/* =====================================================
            APPS SECTION
        ====================================================== */}

                <section className="mt-12 sm:mt-14">

                    {/* Section Header */}
                    <div
                        className="
                    mb-5
                    flex
                    items-end
                    justify-between
                    gap-4
                "
                    >

                        <div>

                            <p
                                className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.18em]
                            text-violet-400
                        "
                            >
                                MiniVerse Apps
                            </p>

                            <h2
                                className="
                            mt-1.5
                            text-xl
                            font-bold
                            tracking-tight
                            text-white
                            sm:text-2xl
                        "
                            >
                                Explore your tools
                            </h2>

                        </div>

                        <div
                            className="
                        hidden
                        text-xs
                        text-slate-500
                        sm:block
                    "
                        >
                            {games.length} apps available
                        </div>

                    </div>


                    {/* =================================================
                APP GRID
            ================================================== */}

                    <div
                        className="
                    grid
                    gap-4
                    sm:grid-cols-2
                    xl:grid-cols-3
                "
                    >

                        {games.map((game) => {

                            const Icon = game.icon;

                            return (
                                <Link
                                    key={game.path}
                                    to={game.path}
                                    className="group block"
                                >

                                    <article
                                        className="
                                    relative
                                    h-full
                                    overflow-hidden
                                    rounded-[24px]
                                    border
                                    border-white/[0.10]
                                    bg-[#111625]/75
                                    p-5
                                    shadow-2xl
                                    shadow-black/20
                                    backdrop-blur-xl
                                    transition-all
                                    duration-300

                                    hover:-translate-y-1
                                    hover:border-white/[0.18]
                                    hover:bg-[#151b2d]/90
                                "
                                    >

                                        {/* Hover Glow */}
                                        <div
                                            className="
                                        pointer-events-none
                                        absolute
                                        -right-16
                                        -top-16
                                        h-32
                                        w-32
                                        rounded-full
                                        bg-violet-500/[0.08]
                                        blur-3xl
                                        transition
                                        duration-300
                                        group-hover:bg-violet-500/[0.14]
                                    "
                                        />

                                        {/* =================================================
                                    ICON
                                ================================================== */}

                                        <div className="relative flex items-start justify-between">

                                            <div
                                                className={`
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-[15px]
                                            bg-gradient-to-br
                                            ${game.color}
                                            shadow-lg
                                            transition-transform
                                            duration-300
                                            group-hover:scale-105
                                        `}
                                            >
                                                <Icon
                                                    size={23}
                                                    className="text-white"
                                                    strokeWidth={2}
                                                />
                                            </div>

                                            {/* Arrow */}
                                            <div
                                                className="
                                            flex
                                            h-8
                                            w-8
                                            items-center
                                            justify-center
                                            rounded-full
                                            border
                                            border-white/[0.08]
                                            bg-white/[0.03]
                                            text-slate-500
                                            transition-all
                                            duration-300
                                            group-hover:border-violet-400/20
                                            group-hover:bg-violet-400/10
                                            group-hover:text-violet-300
                                        "
                                            >
                                                <ArrowRight
                                                    size={15}
                                                    className="
                                                transition-transform
                                                duration-300
                                                group-hover:translate-x-0.5
                                            "
                                                />
                                            </div>

                                        </div>


                                        {/* =================================================
                                    CONTENT
                                ================================================== */}

                                        <div className="relative mt-6">

                                            <h3
                                                className="
                                            text-lg
                                            font-bold
                                            tracking-tight
                                            text-white
                                            sm:text-xl
                                        "
                                            >
                                                {game.title}
                                            </h3>

                                            <p
                                                className="
                                            mt-2
                                            min-h-[44px]
                                            text-sm
                                            leading-5
                                            text-slate-400
                                        "
                                            >
                                                {game.description}
                                            </p>

                                        </div>


                                        {/* =================================================
                                    OPEN APP
                                ================================================== */}

                                        <div
                                            className="
                                        relative
                                        mt-5
                                        flex
                                        items-center
                                        text-sm
                                        font-semibold
                                        text-violet-300
                                        transition-colors
                                        group-hover:text-violet-200
                                    "
                                        >
                                            <span>
                                                Open App
                                            </span>

                                            <ArrowRight
                                                size={16}
                                                className="
                                            ml-1.5
                                            transition-transform
                                            duration-300
                                            group-hover:translate-x-1
                                        "
                                            />
                                        </div>

                                    </article>

                                </Link>
                            );
                        })}

                    </div>

                </section>

            </div>


            {/* =========================================================
        FOOTER
    ========================================================== */}

            <div className="relative z-10">
                <Footer />
            </div>

        </div>
    );
}