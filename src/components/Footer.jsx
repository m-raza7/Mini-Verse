
import { Link } from "react-router-dom";
import {
    Shield,
    FileText,
    Mail,
    ArrowUpRight,
    Sparkles,
    Gamepad2,
    Heart,
} from "lucide-react";
import {
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaYoutube,
} from "react-icons/fa";

import logo from "../assets/logo.png";

const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Todo App", path: "/todos" },
    { name: "Expense Tracker", path: "/expense-tracker" },
    { name: "Money Tracker", path: "/money-tracker" },
    { name: "Flip Coin", path: "/flip-coin" },
];

const supportLinks = [
    { name: "Privacy Policy", path: "/policy", icon: Shield },
    { name: "Terms & Conditions", path: "/terms-conditions", icon: FileText },
];

const socialLinks = [
    {
        name: "GitHub",
        icon: FaGithub,
        href: "#",
        hover: "hover:text-white hover:border-white/30",
    },
    {
        name: "LinkedIn",
        icon: FaLinkedin,
        href: "#",
        hover: "hover:text-blue-400 hover:border-blue-400/30",
    },
    {
        name: "Instagram",
        icon: FaInstagram,
        href: "#",
        hover: "hover:text-pink-400 hover:border-pink-400/30",
    },
    {
        name: "YouTube",
        icon: FaYoutube,
        href: "#",
        hover: "hover:text-red-400 hover:border-red-400/30",
    },
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-12 border-t border-white/[0.06] bg-[#080B18]">

            {/* BACKGROUND GLOW */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-violet-600/[0.06] blur-[100px]" />
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-600/[0.05] blur-[90px]" />
            </div>

            <div className="relative mx-auto max-w-[1400px] px-5 py-9 sm:px-8 lg:px-10">

                {/* MAIN FOOTER */}

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

                    {/* BRAND */}

                    <div>

                        <Link to="/" className="group inline-flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-violet-500/20 bg-[#11152A] shadow-lg shadow-violet-500/10 transition duration-300 group-hover:border-violet-400/50 group-hover:shadow-violet-500/20">

                                <img
                                    src={logo}
                                    alt="MiniVerse"
                                    className="h-full w-full object-contain p-1.5"
                                />

                            </div>

                            <div>
                                <h2 className="text-xl font-black tracking-tight text-white">
                                    Mini<span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Verse</span>
                                </h2>

                                <p className="mt-0.5 text-[9px] font-semibold tracking-[0.2em] text-slate-500">
                                    YOUR DIGITAL UNIVERSE
                                </p>
                            </div>

                        </Link>

                        <p className="mt-5 max-w-xs text-xs leading-6 text-slate-500">
                            One universe. Endless possibilities. Explore productivity
                            tools, money management applications and exciting mini games.
                        </p>

                        {/* SOCIAL LINKS */}

                        <div className="mt-5 flex items-center gap-2">

                            {socialLinks.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        aria-label={social.name}
                                        title={social.name}
                                        className={`flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06] ${social.hover}`}
                                    >
                                        <Icon size={15} />
                                    </a>
                                );
                            })}

                        </div>

                    </div>

                    {/* QUICK LINKS */}

                    <div>

                        <div className="mb-5 flex items-center gap-2">
                            <Gamepad2 size={15} className="text-violet-400" />
                            <h3 className="text-[10px] font-bold tracking-[0.18em] text-slate-300">
                                EXPLORE
                            </h3>
                        </div>

                        <div className="space-y-3">

                            {quickLinks.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="group flex w-fit items-center gap-2 text-xs text-slate-500 transition-colors hover:text-violet-300"
                                >
                                    {item.name}

                                    <ArrowUpRight
                                        size={12}
                                        className="opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                                    />
                                </Link>
                            ))}

                        </div>

                    </div>

                    {/* SUPPORT */}

                    <div>

                        <div className="mb-5 flex items-center gap-2">
                            <Shield size={15} className="text-violet-400" />

                            <h3 className="text-[10px] font-bold tracking-[0.18em] text-slate-300">
                                INFORMATION
                            </h3>
                        </div>

                        <div className="space-y-3">

                            {supportLinks.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className="group flex w-fit items-center gap-2 text-xs text-slate-500 transition-colors hover:text-violet-300"
                                    >
                                        <Icon size={14} />
                                        {item.name}
                                    </Link>
                                );
                            })}

                        </div>

                    </div>

                    {/* CONTACT */}

                    <div>

                        <div className="mb-5 flex items-center gap-2">
                            <Mail size={15} className="text-violet-400" />

                            <h3 className="text-[10px] font-bold tracking-[0.18em] text-slate-300">
                                GET IN TOUCH
                            </h3>
                        </div>

                        <p className="max-w-[220px] text-xs leading-6 text-slate-500">
                            Have an idea, suggestion or feedback? Let's connect.
                        </p>

                        <a
                            href="https://portfolio-frontend-sand-delta.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-violet-500/25 bg-violet-500/10 px-3 py-2 text-[11px] font-semibold text-violet-300 transition-all duration-300 hover:border-violet-400/50 hover:bg-violet-500/20 hover:text-white"
                        >
                            Visit Portfolio
                            <ArrowUpRight size={13} />
                        </a>

                    </div>

                </div>

                {/* BOTTOM DIVIDER */}

                <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent" />

                {/* BOTTOM BAR */}

                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">

                    <p className="text-center text-[10px] text-slate-600 sm:text-left">
                        © {currentYear}{" "}
                        <span className="font-bold text-slate-400">
                            MiniVerse
                        </span>
                        . All rights reserved.
                    </p>

                    <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
                        Made for everyday moments
                        <Heart size={11} className="fill-violet-500/50 text-violet-400" />
                    </div>

                    <div className="flex items-center gap-1.5 text-[9px] font-semibold tracking-widest text-violet-400/70">
                        <Sparkles size={12} />
                        MINI APPS. ONE UNIVERSE.
                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;
