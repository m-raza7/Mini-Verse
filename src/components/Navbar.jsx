import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, User, X } from "lucide-react";
import logo from "../assets/logo.png";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "Todo", path: "/todos" },
    { name: "Expense Tracker", path: "/expense-tracker" },
    { name: "Money Tracker", path: "/money-tracker" },
    { name: "Money Recovery", path: "/money-recovery-tracker" },
    { name: "Q & A Game", path: "/right-wrong" },
    { name: "Flip Coin", path: "/flip-coin" },
    { name: "Grid Game", path: "/right-wrong-grid" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="hidden xl:block fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 md:top-4 md:pt-0">
            <div className="mx-auto max-w-7xl">

                {/* Main Header */}
                <div
                    className="
                flex
                h-14
                items-center
                justify-between
                rounded-2xl
                border
                border-white/10
                bg-slate-950/80
                px-3
                shadow-lg
                shadow-black/20
                backdrop-blur-xl

                sm:h-16
                sm:px-4

                md:rounded-2xl
                md:border-white/[0.12]
                md:bg-slate-950/75
                md:px-5
                md:shadow-xl
            "
                >

                    {/* Logo */}
                    <NavLink
                        to="/"
                        className="
                    flex
                    h-full
                    shrink-0
                    items-center
                    transition-opacity
                    hover:opacity-90
                "
                    >
                        <img
                            src={logo}
                            alt="MiniVerse"
                            className="
                        h-11
                        w-auto
                        object-contain

                        sm:h-12
                        md:h-13
                        lg:h-14
                    "
                        />
                    </NavLink>


                    {/* Desktop Navigation */}
                    <nav
                        className="
                    flex
                    items-center
                    gap-1
                    rounded-xl
                    border
                    border-white/[0.06]
                    bg-white/[0.025]
                    p-1
                "
                    >
                        {navLinks.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `
                            relative
                            rounded-lg
                            px-4
                            py-2
                            text-sm
                            font-medium
                            transition-all
                            duration-200

                            ${isActive
                                        ? `
                                        bg-white/[0.10]
                                        text-white
                                        shadow-sm
                                    `
                                        : `
                                        text-slate-400
                                        hover:bg-white/[0.05]
                                        hover:text-white
                                    `
                                    }
                            `
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>


                    {/* Right Side */}
                    <div className="flex items-center gap-2">

                        {/* Desktop User */}
                        <button
                            type="button"
                            aria-label="Account"
                            className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        text-slate-300
                        transition-all
                        duration-200

                        hover:border-white/15
                        hover:bg-white/[0.08]
                        hover:text-white

                        focus:outline-none
                        focus:ring-2
                        focus:ring-violet-500/50
                    "
                        >
                            <User
                                size={18}
                                strokeWidth={1.8}
                            />
                        </button>


                        {/* Mobile / Tablet Menu */}
                        <button
                            type="button"
                            onClick={() => setOpen(!open)}
                            aria-label={
                                open
                                    ? "Close menu"
                                    : "Open menu"
                            }
                            aria-expanded={open}
                            className="hidden"
                        >
                            {open ? (
                                <X
                                    size={20}
                                    strokeWidth={1.8}
                                />
                            ) : (
                                <Menu
                                    size={20}
                                    strokeWidth={1.8}
                                />
                            )}
                        </button>

                    </div>
                </div>


                {/* Mobile / Tablet Navigation */}
                <div className="hidden">
                    <div
                        className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-slate-950/90
                    p-2
                    shadow-xl
                    shadow-black/30
                    backdrop-blur-2xl
                "
                    >

                        {navLinks.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `
                            flex
                            items-center
                            rounded-xl
                            px-4
                            py-3
                            text-sm
                            font-medium
                            transition-all
                            duration-200

                            ${isActive
                                        ? `
                                        bg-gradient-to-r
                                        from-violet-600/90
                                        to-fuchsia-600/90
                                        text-white
                                        shadow-md
                                        shadow-violet-900/20
                                    `
                                        : `
                                        text-slate-400
                                        hover:bg-white/[0.06]
                                        hover:text-white
                                    `
                                    }
                            `
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}

                    </div>
                </div>

            </div>
        </header>
    );
};

export default Navbar;