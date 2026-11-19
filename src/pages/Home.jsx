
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

import {
    ArrowUpRight,
    ArrowRight,
    Gamepad2,
    Wallet,
    Coins,
    ListTodo,
    HandCoins,
    Trophy,
    Sparkles,
    Clock3,
    Layers3,
    Play,
    Zap,
    Grid3X3,
    Plus,
    Compass,
} from "lucide-react";

import newBg from "../assets/new-bg.png";
import logo from "../assets/logo.png";

import Footer from "../components/Footer";

import todo from "../assets/Todo-App-img.png";
import expenseTracker from "../assets/Expense-Tracker-img.png";
import moneyTracker from "../assets/Money-Tracker-img.png";
import moneyRecovery from "../assets/Money-Recovery-img.png";
import qAGame from "../assets/Q&A-Game-img.png";
import flipCoin from "../assets/Flip-Coin-img.png";
import rightWrong from "../assets/Right-Wrong-img.png";
import snakeGame from "../assets/Neon Snake Arcade Icon.png";

// =====================================================
// APPLICATION DATA
// =====================================================

const apps = [
    {
        id: "todo",
        title: "Todo App",
        description: "Manage your daily tasks with ease.",
        path: "/todos",
        image: todo,
        category: "Productivity",
        color: "blue",
        icon: ListTodo,
    },
    {
        id: "expense",
        title: "Expense Tracker",
        description: "Track spending and manage your budget.",
        path: "/expense-tracker",
        image: expenseTracker,
        category: "Finance",
        color: "emerald",
        icon: Wallet,
    },
    {
        id: "money",
        title: "Money Tracker",
        description: "Manage income, expenses and savings.",
        path: "/money-tracker",
        image: moneyTracker,
        category: "Finance",
        color: "orange",
        icon: Coins,
    },
    {
        id: "recovery",
        title: "Money Recovery",
        description: "Track money given, recoveries and due dates.",
        path: "/money-recovery-tracker",
        image: moneyRecovery,
        category: "Finance",
        color: "cyan",
        icon: HandCoins,
    },
    {
        id: "qa",
        title: "Q & A Game",
        description: "Challenge your mind with questions.",
        path: "/right-wrong",
        image: qAGame,
        category: "Games",
        color: "amber",
        icon: Trophy,
    },
    {
        id: "flip",
        title: "Flip Coin",
        description: "Test your luck instantly.",
        path: "/flip-coin",
        image: flipCoin,
        category: "Games",
        color: "purple",
        icon: Coins,
    },
    {
        id: "grid",
        title: "Right Wrong",
        description: "Challenge yourself with a strategic grid.",
        path: "/right-wrong-grid",
        image: rightWrong,
        category: "Games",
        color: "pink",
        icon: Grid3X3,
    },
    {
        id: "snake",
        title: "Snake Game",
        description: "Eat, grow and beat your highest score.",
        path: "/games/snake",
        image: snakeGame,
        category: "Arcade",
        color: "violet",
        icon: Gamepad2,
        featured: true,
    },
];

const categories = [
    {
        name: "All Applications",
        description: "Explore everything",
        icon: Layers3,
        count: apps.length,
        color: "violet",
    },
    {
        name: "Productivity",
        description: "Organize your daily life",
        icon: ListTodo,
        count: 1,
        color: "blue",
    },
    {
        name: "Finance",
        description: "Manage your money",
        icon: Wallet,
        count: 3,
        color: "emerald",
    },
    {
        name: "Games",
        description: "Play and have fun",
        icon: Gamepad2,
        count: 4,
        color: "fuchsia",
    },
];

// =====================================================
// ANIMATION CONFIG
// =====================================================

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 24,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

// =====================================================
// SMALL SECTION HEADER
// =====================================================

const SectionHeader = ({
    eyebrow,
    title,
    description,
    action,
}) => {
    return (
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">

            <div>
                {eyebrow && (
                    <p className="mb-1.5 text-[9px] font-bold tracking-[0.2em] text-violet-400 sm:text-[10px]">
                        {eyebrow}
                    </p>
                )}

                <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                    {title}
                </h2>

                {description && (
                    <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                        {description}
                    </p>
                )}
            </div>

            {action && (
                <Link
                    to={action.path}
                    className="group flex items-center gap-1.5 text-[10px] font-semibold text-violet-400 transition hover:text-violet-300 sm:text-xs"
                >
                    {action.label}
                    <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                </Link>
            )}

        </div>
    );
};

// =====================================================
// APPLICATION CARD
// =====================================================

const AppCard = ({ app, compact = false, index = 0 }) => {
    const Icon = app.icon;

    return (
        <motion.div variants={fadeUp}>
            <Link
                to={app.path}
                className="group block h-full"
            >
                <article
                    className={`relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101426]/90 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-[#151A30] hover:shadow-xl hover:shadow-violet-950/20 ${compact ? "p-3" : "p-4 sm:p-5"
                        }`}
                >

                    {/* CARD GLOW */}

                    <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-violet-500/[0.06] blur-3xl transition group-hover:bg-violet-500/[0.15]" />

                    <div className="relative flex items-start justify-between gap-3">

                        {/* APP IMAGE */}

                        <div
                            className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.035] transition duration-300 group-hover:scale-105 ${compact ? "h-11 w-11" : "h-14 w-14"
                                }`}
                        >
                            <img
                                src={app.image}
                                alt={app.title}
                                loading="lazy"
                                className="h-full w-full object-contain"
                            />
                        </div>

                        {/* ARROW */}

                        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] text-slate-500 transition-all group-hover:border-violet-400/30 group-hover:bg-violet-500/15 group-hover:text-violet-300">
                            <ArrowUpRight size={14} />
                        </div>

                    </div>

                    {/* CONTENT */}

                    <div className={`relative ${compact ? "mt-3" : "mt-5"}`}>

                        <div className="flex flex-wrap items-center gap-2">
                            <h3
                                className={`font-bold text-white transition-colors group-hover:text-violet-200 ${compact ? "text-xs" : "text-sm"
                                    }`}
                            >
                                {app.title}
                            </h3>

                            {app.featured && !compact && (
                                <span className="rounded-md border border-violet-400/20 bg-violet-500/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-violet-300">
                                    FEATURED
                                </span>
                            )}
                        </div>

                        {!compact && (
                            <p className="mt-1.5 min-h-[34px] text-[10px] leading-5 text-slate-500 sm:text-[11px]">
                                {app.description}
                            </p>
                        )}

                    </div>

                    {/* FOOTER */}

                    <div className={`relative flex items-center justify-between border-t border-white/[0.06] ${compact ? "mt-3 pt-2" : "mt-4 pt-3"
                        }`}>

                        <span className="text-[9px] font-medium text-slate-500">
                            {app.category}
                        </span>

                        <span className="flex items-center gap-1 text-[9px] font-semibold text-violet-300 transition-all group-hover:gap-2">
                            Open App
                            <ArrowRight size={11} />
                        </span>

                    </div>

                </article>
            </Link>
        </motion.div>
    );
};

// =====================================================
// MAIN HOME DASHBOARD
// =====================================================

export default function Home() {

    const featuredApp = apps.find((app) => app.id === "snake");

    const utilityApps = apps.filter(
        (app) => app.category !== "Games" && app.category !== "Arcade"
    );

    const gameApps = apps.filter(
        (app) => app.category === "Games" || app.category === "Arcade"
    );

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#080B18] text-white">

            {/* =====================================================
          BACKGROUND EFFECTS
      ====================================================== */}

            <div className="pointer-events-none fixed inset-0 overflow-hidden">

                <div className="absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-violet-600/[0.07] blur-[140px]" />

                <div className="absolute right-0 top-[35%] h-[350px] w-[350px] rounded-full bg-fuchsia-600/[0.035] blur-[130px]" />

                <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-blue-600/[0.035] blur-[120px]" />

            </div>

            {/* =====================================================
          MAIN CONTENT

          Navbar is fixed:
          Desktop sidebar = 250px
          Topbar = 80px
      ====================================================== */}

            <main className="relative z-10 min-h-screen px-4 pb-8 pt-[90px] sm:px-6  lg:px-7 lg:pt-[105px] xl:px-9">

                <div className="mx-auto max-w-[1500px]">

                    {/* =================================================
              TOP WELCOME
          ================================================== */}

                    <motion.section
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"
                    >

                        <div>
                            <div className="flex items-center gap-2">

                                <Sparkles size={15} className="text-violet-400" />

                                <p className="text-[9px] font-bold tracking-[0.2em] text-violet-400 sm:text-[10px]">
                                    YOUR PERSONAL UNIVERSE
                                </p>

                            </div>

                            <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                                Welcome to{" "}
                                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                                    MiniVerse.
                                </span>
                            </h1>

                            <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">
                                Explore, create, manage and play. Everything starts here.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 self-start rounded-xl border border-emerald-400/15 bg-emerald-400/[0.05] px-3 py-2 sm:self-center">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                            <span className="text-[10px] font-semibold text-emerald-300">
                                Universe Online
                            </span>
                        </div>

                    </motion.section>

                    {/* =================================================
              HERO + COLLECTION
          ================================================== */}

                    <section className="grid gap-4 xl:grid-cols-[1.55fr_1fr]">

                        {/* FEATURED HERO */}

                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.65 }}
                            className="group relative min-h-[280px] overflow-hidden rounded-[22px] border border-white/[0.09] bg-[#111326] sm:min-h-[320px]"
                        >

                            {/* BACKGROUND IMAGE */}

                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                                style={{ backgroundImage: `url(${newBg})` }}
                            />

                            <div className="absolute inset-0 bg-gradient-to-r from-[#080B18] via-[#080B18]/90 to-[#080B18]/35" />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#080B18]/90 via-transparent to-transparent" />

                            {/* PURPLE GLOW */}

                            <div className="pointer-events-none absolute -right-20 top-0 h-60 w-60 rounded-full bg-violet-600/20 blur-[100px]" />

                            {/* HERO CONTENT */}

                            <div className="relative flex h-full min-h-[280px] flex-col justify-between p-5 sm:min-h-[320px] sm:p-7 lg:p-8">

                                <div className="flex items-center justify-between gap-3">

                                    <span className="inline-flex items-center gap-1.5 rounded-md border border-violet-400/25 bg-violet-500/15 px-2.5 py-1 text-[8px] font-bold tracking-widest text-violet-300">
                                        <Sparkles size={10} />
                                        FEATURED EXPERIENCE
                                    </span>

                                    <span className="rounded-md border border-white/10 bg-black/20 px-2 py-1 text-[8px] text-slate-300 backdrop-blur-md">
                                        ARCADE
                                    </span>

                                </div>

                                <div className="mt-8 max-w-[450px]">

                                    <p className="text-[9px] font-semibold tracking-[0.22em] text-violet-300">
                                        DISCOVER SOMETHING NEW
                                    </p>

                                    <h2 className="mt-2 text-3xl font-black leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
                                        Explore Your
                                        <br />
                                        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                                            Universe.
                                        </span>
                                    </h2>

                                    <p className="mt-3 max-w-[340px] text-[11px] leading-5 text-slate-300/80 sm:text-xs sm:leading-6">
                                        Discover powerful productivity tools, manage your finances
                                        and experience exciting games in one place.
                                    </p>

                                    <div className="mt-5 flex flex-wrap items-center gap-3">

                                        <Link
                                            to="/games/snake"
                                            className="group/btn inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-[10px] font-bold text-white shadow-lg shadow-violet-950/40 transition-all hover:-translate-y-0.5 hover:shadow-violet-500/20 sm:text-xs"
                                        >
                                            <Play size={13} fill="currentColor" />
                                            Play Snake Game
                                            <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-1" />
                                        </Link>

                                        <Link
                                            to="/"
                                            className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-[10px] font-semibold text-slate-200 backdrop-blur-md transition hover:bg-white/10 sm:text-xs"
                                        >
                                            Explore Apps
                                            <Compass size={13} />
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        </motion.div>

                        {/* MY COLLECTION */}

                        <motion.section
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="rounded-[22px] border border-white/[0.08] bg-[#0D1121]/90 p-4 sm:p-5"
                        >

                            <SectionHeader
                                eyebrow="YOUR LIBRARY"
                                title="My Collection"
                                description="Jump back into your applications."
                                action={{
                                    label: "View All",
                                    path: "/",
                                }}
                            />

                            <div className="space-y-2.5">

                                {apps.slice(0, 5).map((app) => {
                                    const Icon = app.icon;

                                    return (
                                        <motion.div key={app.id} variants={fadeUp}>
                                            <Link
                                                to={app.path}
                                                className="group flex items-center gap-3 rounded-xl border border-white/[0.045] bg-white/[0.02] p-2.5 transition-all duration-300 hover:border-violet-400/20 hover:bg-violet-500/[0.06]"
                                            >

                                                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.04]">
                                                    <img
                                                        src={app.image}
                                                        alt={app.title}
                                                        loading="lazy"
                                                        className="h-full w-full object-contain"
                                                    />
                                                </div>

                                                <div className="min-w-0 flex-1">

                                                    <h3 className="truncate text-[11px] font-bold text-slate-200 transition-colors group-hover:text-white">
                                                        {app.title}
                                                    </h3>

                                                    <p className="mt-1 truncate text-[9px] text-slate-500">
                                                        {app.category}
                                                    </p>

                                                </div>

                                                <ArrowUpRight
                                                    size={14}
                                                    className="shrink-0 text-slate-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-300"
                                                />

                                            </Link>
                                        </motion.div>
                                    );
                                })}

                            </div>

                        </motion.section>

                    </section>

                    {/* =================================================
              STATS
          ================================================== */}

                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                        className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4"
                    >

                        {[
                            {
                                label: "TOTAL APPLICATIONS",
                                value: apps.length,
                                description: "Available in your universe",
                                icon: Layers3,
                                color: "violet",
                            },
                            {
                                label: "PRODUCTIVITY",
                                value: utilityApps.length > 0 ? 1 : 0,
                                description: "Task management tools",
                                icon: ListTodo,
                                color: "blue",
                            },
                            {
                                label: "FINANCE TOOLS",
                                value: 3,
                                description: "Money management apps",
                                icon: Wallet,
                                color: "emerald",
                            },
                            {
                                label: "GAMES",
                                value: gameApps.length,
                                description: "Games and arcade experiences",
                                icon: Gamepad2,
                                color: "fuchsia",
                            },
                        ].map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <motion.div
                                    key={stat.label}
                                    variants={fadeUp}
                                    className="rounded-2xl border border-white/[0.07] bg-[#101426]/80 p-4 transition-all hover:border-violet-400/20 sm:p-5"
                                >

                                    <div className="flex items-center justify-between gap-2">

                                        <p className="text-[8px] font-bold tracking-[0.12em] text-slate-500 sm:text-[9px]">
                                            {stat.label}
                                        </p>

                                        <Icon size={16} className="text-violet-400" />

                                    </div>

                                    <h3 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
                                        {stat.value}
                                    </h3>

                                    <p className="mt-1 text-[9px] text-slate-500 sm:text-[10px]">
                                        {stat.description}
                                    </p>

                                </motion.div>
                            );
                        })}

                    </motion.section>

                    {/* =================================================
              APPLICATION CATEGORIES
          ================================================== */}

                    <section className="mt-10">

                        <SectionHeader
                            eyebrow="DISCOVER"
                            title="Explore Categories"
                            description="Find the right experience for your needs."
                        />

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            variants={staggerContainer}
                            className="grid grid-cols-2 gap-3 xl:grid-cols-4"
                        >

                            {categories.map((category) => {
                                const Icon = category.icon;

                                return (
                                    <motion.div key={category.name} variants={fadeUp}>

                                        <div className="group flex h-full items-center gap-3 rounded-2xl border border-white/[0.07] bg-[#101426]/80 p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/25 hover:bg-[#151A30] sm:p-4">

                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/10 text-violet-300 transition group-hover:scale-105 group-hover:bg-violet-500/20">
                                                <Icon size={18} />
                                            </div>

                                            <div className="min-w-0">

                                                <h3 className="truncate text-[10px] font-bold text-white sm:text-xs">
                                                    {category.name}
                                                </h3>

                                                <p className="mt-1 text-[9px] text-slate-500">
                                                    {category.count} applications
                                                </p>

                                            </div>

                                        </div>

                                    </motion.div>
                                );
                            })}

                        </motion.div>

                    </section>

                    {/* =================================================
              PRODUCTIVITY APPS
          ================================================== */}

                    <section className="mt-10">

                        <SectionHeader
                            eyebrow="WORK SMARTER"
                            title="Productivity & Finance"
                            description="Tools designed to make everyday tasks easier."
                            action={{
                                label: "Explore All",
                                path: "/",
                            }}
                        />

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={staggerContainer}
                            className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
                        >

                            {utilityApps.map((app, index) => (
                                <AppCard
                                    key={app.id}
                                    app={app}
                                    index={index}
                                />
                            ))}

                        </motion.div>

                    </section>

                    {/* =================================================
              GAMES SECTION
          ================================================== */}

                    <section className="mt-10">

                        <SectionHeader
                            eyebrow="PLAYGROUND"
                            title="Games & Entertainment"
                            description="Take a break and challenge yourself."
                            action={{
                                label: "Explore Games",
                                path: "/right-wrong",
                            }}
                        />

                        {/* FEATURED SNAKE GAME */}

                        <Link
                            to={featuredApp.path}
                            className="group mb-4 block overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-r from-[#17112D] via-[#11152B] to-[#101426] transition-all duration-300 hover:border-violet-400/40 hover:shadow-xl hover:shadow-violet-950/20"
                        >

                            <div className="flex flex-col items-center gap-4 p-4 sm:flex-row sm:p-5">

                                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-violet-400/20 bg-violet-500/10 transition-transform duration-500 group-hover:scale-105 sm:h-24 sm:w-24">
                                    <img
                                        src={snakeGame}
                                        alt="Snake Game"
                                        className="h-full w-full object-contain"
                                    />
                                </div>

                                <div className="flex-1 text-center sm:text-left">

                                    <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">

                                        <span className="rounded-md bg-violet-500/15 px-2 py-1 text-[8px] font-bold tracking-widest text-violet-300">
                                            ARCADE FEATURED
                                        </span>

                                        <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-[8px] font-semibold text-emerald-300">
                                            AVAILABLE
                                        </span>

                                    </div>

                                    <h3 className="mt-2 text-lg font-black text-white sm:text-xl">
                                        Snake Game
                                    </h3>

                                    <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
                                        Explore different worlds, enjoy beautiful environments
                                        and beat your highest score.
                                    </p>

                                </div>

                                <div className="flex shrink-0 items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-[10px] font-bold text-white transition-all group-hover:bg-violet-500 sm:text-xs">
                                    <Play size={13} fill="currentColor" />
                                    Play Now
                                    <ArrowUpRight size={14} />
                                </div>

                            </div>

                        </Link>

                        {/* OTHER GAMES */}

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={staggerContainer}
                            className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
                        >

                            {gameApps
                                .filter((app) => app.id !== "snake")
                                .map((app, index) => (
                                    <AppCard
                                        key={app.id}
                                        app={app}
                                        index={index}
                                    />
                                ))}

                        </motion.div>

                    </section>

                    {/* =================================================
              BOTTOM CTA
          ================================================== */}

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative mt-10 overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-600/15 via-[#17142D] to-fuchsia-600/10 p-5 sm:p-7"
                    >

                        <div className="pointer-events-none absolute -right-10 -top-20 h-48 w-48 rounded-full bg-violet-500/15 blur-[70px]" />

                        <div className="relative flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">

                            <div>

                                <div className="flex items-center gap-2 text-violet-300">
                                    <Zap size={15} />
                                    <span className="text-[9px] font-bold tracking-[0.18em]">
                                        THE UNIVERSE IS YOURS
                                    </span>
                                </div>

                                <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">
                                    Ready for your next adventure?
                                </h2>

                                <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
                                    Explore your collection and discover something new.
                                </p>

                            </div>

                            <Link
                                to="/games/snake"
                                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-violet-400/25 bg-violet-500/15 px-4 py-3 text-[10px] font-bold text-violet-200 transition-all hover:bg-violet-500/25 sm:text-xs"
                            >
                                Get Started
                                <ArrowRight size={14} />
                            </Link>

                        </div>

                    </motion.section>

                </div>

            </main>

            {/* =====================================================
          FOOTER
      ====================================================== */}

            <div className="relative z-10">
                <Footer />
            </div>

        </div>
    );
}
