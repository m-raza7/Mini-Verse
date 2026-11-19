import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    NavLink,
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    LayoutDashboard,
    Gamepad2,
    ListTodo,
    Wallet,
    Coins,
    HandCoins,
    CircleHelp,
    Disc3,
    Grid3X3,
    Search,
    Mic,
    Bell,
    UserRound,
    Menu,
    X,
    ChevronRight,
    Sparkles,
    Command,
    ArrowUpRight,
    Grid2X2,
} from "lucide-react";

import logo from "../assets/logo.png";

// ============================================
// NAVIGATION DATA
// ============================================

const navigationGroups = [
    {
        title: "MAIN",
        links: [
            {
                name: "Home",
                path: "/",
                icon: LayoutDashboard,
                keywords: "home dashboard overview",
            },
        ],
    },
    {
        title: "PRODUCTIVITY",
        links: [
            {
                name: "Todo",
                path: "/todos",
                icon: ListTodo,
                keywords: "todo task tasks list",
            },
            {
                name: "Expense",
                path: "/expense-tracker",
                icon: Wallet,
                keywords: "expense spending budget",
            },
            {
                name: "Money",
                path: "/money-tracker",
                icon: Coins,
                keywords: "money income savings",
            },
            {
                name: "Recovery",
                path: "/money-recovery-tracker",
                icon: HandCoins,
                keywords: "recovery loan dues",
            },
        ],
    },
    {
        title: "GAMES",
        links: [
            {
                name: "Q & A",
                path: "/right-wrong",
                icon: CircleHelp,
                keywords: "quiz questions answers",
            },
            {
                name: "Flip Coin",
                path: "/flip-coin",
                icon: Disc3,
                keywords: "coin toss flip",
            },
            {
                name: "Grid Game",
                path: "/right-wrong-grid",
                icon: Grid3X3,
                keywords: "grid strategy right wrong",
            },
            {
                name: "Snake",
                path: "/games/snake",
                icon: Gamepad2,
                keywords: "snake arcade snake game",
            },
            {
                name: "Dots & Boxes",
                path: "/games/dots-and-boxes",
                icon: Grid2X2,
                keywords: "dots boxes multiplayer connect lines puzzle",
            },
        ],
    },
];

const allLinks = navigationGroups.flatMap((group) => group.links);

// ============================================
// REUSABLE NAVIGATION LINK
// ============================================

const NavigationLink = ({ item, mobile = false, onNavigate }) => {
    const Icon = item.icon;

    return (
        <NavLink
            to={item.path}
            end={item.path === "/"}
            onClick={onNavigate}
            className={({ isActive }) =>
                [
                    "group relative flex shrink-0 items-center gap-2 rounded-xl font-semibold transition-all duration-200",
                    mobile ? "w-full px-4 py-3 text-xs" : "px-3 py-2.5 text-[11px]",
                    isActive
                        ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-950/30"
                        : "text-slate-400 hover:bg-white/[0.06] hover:text-white",
                ].join(" ")
            }
        >
            {({ isActive }) => (
                <>
                    <Icon
                        size={mobile ? 17 : 15}
                        strokeWidth={1.9}
                        className={
                            isActive
                                ? "text-white"
                                : "text-slate-500 transition-colors group-hover:text-violet-300"
                        }
                    />
                    <span>{item.name}</span>
                    {mobile && isActive && (
                        <ChevronRight size={15} className="ml-auto text-violet-200" />
                    )}
                </>
            )}
        </NavLink>
    );
};

// ============================================
// SEARCH RESULTS
// ============================================

const SearchResults = ({
    search,
    filteredLinks,
    voiceMessage,
    onOpenApp,
    className = "",
}) => {
    if (!search.trim() && !voiceMessage) return null;

    return (
        <div
            className={`absolute left-0 right-0 top-[calc(100%+8px)] z-[130] max-h-80 overflow-y-auto rounded-xl border border-violet-500/20 bg-[#101225] p-2 shadow-2xl shadow-black/60 ${className}`}
        >
            {voiceMessage && (
                <p className="px-3 py-2 text-[10px] leading-5 text-violet-300">
                    {voiceMessage}
                </p>
            )}

            {search.trim() &&
                (filteredLinks.length > 0 ? (
                    <>
                        <p className="px-3 py-2 text-[9px] font-bold tracking-widest text-slate-500">
                            APPLICATIONS
                        </p>
                        {filteredLinks.map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.path}
                                    type="button"
                                    onClick={() => onOpenApp(item.path)}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs text-slate-300 transition hover:bg-violet-500/10 hover:text-white"
                                >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300">
                                        <Icon size={16} />
                                    </span>
                                    <span className="min-w-0 flex-1 truncate font-medium">
                                        {item.name}
                                    </span>
                                    <ArrowUpRight size={14} className="shrink-0 text-slate-500" />
                                </button>
                            );
                        })}
                    </>
                ) : (
                    <p className="px-3 py-5 text-center text-xs text-slate-500">
                        No applications found.
                    </p>
                ))}
        </div>
    );
};

// ============================================
// SEARCH INPUT
// ============================================

const SearchInput = ({
    value,
    onChange,
    onFocus,
    onClear,
    onVoice,
    listening,
    inputRef,
    mobile = false,
    searchOpen,
}) => (
    <div
        className={`flex h-10 min-w-0 items-center gap-2 rounded-xl border px-3 transition-all duration-300 ${searchOpen
                ? "border-violet-500/50 bg-[#15152B] shadow-[0_0_18px_rgba(139,92,246,0.10)]"
                : "border-white/[0.08] bg-white/[0.035]"
            } ${mobile ? "h-11" : ""}`}
    >
        <Search size={16} className="shrink-0 text-slate-500" />

        <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onFocus={onFocus}
            placeholder="Search applications..."
            aria-label="Search applications"
            className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-slate-500"
        />

        {value && (
            <button
                type="button"
                onClick={onClear}
                className="shrink-0 text-slate-500 transition hover:text-white"
                aria-label="Clear search"
            >
                <X size={14} />
            </button>
        )}

        <button
            type="button"
            onClick={onVoice}
            title={listening ? "Stop voice search" : "Voice search"}
            aria-label={listening ? "Stop voice search" : "Voice search"}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${listening
                    ? "animate-pulse bg-red-500/20 text-red-400"
                    : "text-slate-400 hover:bg-violet-500/15 hover:text-violet-300"
                }`}
        >
            <Mic size={16} />
        </button>
    </div>
);

// ============================================
// NAVBAR COMPONENT
// ============================================

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [listening, setListening] = useState(false);
    const [voiceMessage, setVoiceMessage] = useState("");

    const recognitionRef = useRef(null);
    const searchRef = useRef(null);
    const mobileSearchRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();

    // Search filtering
    const filteredLinks = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return [];

        return allLinks.filter((item) => {
            const searchable = `${item.name} ${item.keywords} ${item.path}`.toLowerCase();
            return searchable.includes(query);
        });
    }, [search]);

    // Open application
    const openApp = useCallback(
        (path) => {
            recognitionRef.current?.stop();
            recognitionRef.current = null;
            navigate(path);
            setSearch("");
            setSearchOpen(false);
            setMobileOpen(false);
            setVoiceMessage("");
            setListening(false);
        },
        [navigate]
    );

    // Close menus when route changes
    useEffect(() => {
        setMobileOpen(false);
        setSearchOpen(false);
        setSearch("");
        setVoiceMessage("");
        setListening(false);
    }, [location.pathname]);

    // Keyboard shortcuts and Escape handling
    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
                event.preventDefault();
                if (window.matchMedia("(min-width: 768px)").matches) {
                    searchRef.current?.focus();
                } else {
                    mobileSearchRef.current?.focus();
                }
                setSearchOpen(true);
            }

            if (event.key === "Escape") {
                setSearchOpen(false);
                setMobileOpen(false);
                setVoiceMessage("");
                recognitionRef.current?.stop();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Voice recognition cleanup
    useEffect(() => {
        return () => {
            recognitionRef.current?.abort();
            recognitionRef.current = null;
        };
    }, []);

    // Voice search
    const startVoiceSearch = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setVoiceMessage("Voice search is not supported in this browser.");
            setSearchOpen(true);
            return;
        }

        recognitionRef.current?.stop();

        const recognition = new SpeechRecognition();
        recognition.lang = "en-IN";
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognitionRef.current = recognition;

        setListening(true);
        setSearchOpen(true);
        setVoiceMessage("Listening... Speak an application name.");

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.trim().toLowerCase();
            setSearch(transcript);
            setVoiceMessage(`You said: "${transcript}"`);

            const exactMatch = allLinks.find(
                (item) =>
                    item.name.toLowerCase() === transcript ||
                    item.path.toLowerCase() === transcript
            );

            const partialMatches = allLinks.filter((item) => {
                const searchable = `${item.name} ${item.keywords}`.toLowerCase();
                return (
                    searchable.includes(transcript) ||
                    transcript.includes(item.name.toLowerCase())
                );
            });

            if (exactMatch) {
                openApp(exactMatch.path);
            } else if (partialMatches.length === 1) {
                openApp(partialMatches[0].path);
            }
        };

        recognition.onerror = (event) => {
            setListening(false);

            if (event.error === "not-allowed") {
                setVoiceMessage("Microphone permission denied. Please allow access.");
            } else if (event.error === "no-speech") {
                setVoiceMessage("No speech detected. Please try again.");
            } else if (event.error !== "aborted") {
                setVoiceMessage("Voice search failed. Please try again.");
            }
        };

        recognition.onend = () => {
            setListening(false);
            recognitionRef.current = null;
        };

        try {
            recognition.start();
        } catch {
            setListening(false);
            setVoiceMessage("Unable to start voice search.");
        }
    };

    const stopVoiceSearch = () => {
        recognitionRef.current?.stop();
        setListening(false);
    };

    const handleSearchChange = (value) => {
        setSearch(value);
        setSearchOpen(true);
        setVoiceMessage("");
    };

    const handleClearSearch = (input) => {
        setSearch("");
        setVoiceMessage("");
        input?.current?.focus();
    };

    const handleVoiceButton = () => {
        if (listening) stopVoiceSearch();
        else startVoiceSearch();
    };

    return (
        <>
            {/* ========================================
          RESPONSIVE TOP NAVBAR
      ======================================== */}
            <header className="sticky top-0 z-[100] w-full min-w-0 border-b border-white/[0.07] bg-[#080B18]/95 px-3 py-3 shadow-lg shadow-black/10 backdrop-blur-2xl sm:px-5 lg:px-8">
                <div className="mx-auto w-full max-w-[1600px] min-w-0">
                    {/* TOP ROW */}
                    <div className="flex min-h-[44px] min-w-0 items-center gap-2 sm:gap-4 lg:gap-5">
                        {/* LOGO */}
                        <NavLink to="/" className="flex shrink-0 items-center gap-2.5">
                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-violet-400/20 bg-[#15152A] shadow-lg shadow-violet-500/10">
                                <img
                                    src={logo}
                                    alt="MiniVerse"
                                    className="h-full w-full object-contain p-1"
                                />
                            </div>

                            <div className="hidden sm:block">
                                <h1 className="text-base font-black tracking-tight text-white">
                                    Mini
                                    <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                                        Verse
                                    </span>
                                </h1>
                                <p className="text-[8px] font-semibold tracking-[0.2em] text-slate-500">
                                    YOUR DIGITAL UNIVERSE
                                </p>
                            </div>
                        </NavLink>

                        {/* DESKTOP SEARCH */}
                        <div className="relative ml-auto hidden w-full min-w-0 max-w-[480px] md:block">
                            <SearchInput
                                inputRef={searchRef}
                                value={search}
                                onChange={handleSearchChange}
                                onFocus={() => setSearchOpen(true)}
                                onClear={() => handleClearSearch(searchRef)}
                                onVoice={handleVoiceButton}
                                listening={listening}
                                searchOpen={searchOpen}
                            />
                            {searchOpen && (search.trim() || voiceMessage) && (
                                <SearchResults
                                    search={search}
                                    filteredLinks={filteredLinks}
                                    voiceMessage={voiceMessage}
                                    onOpenApp={openApp}
                                />
                            )}
                        </div>

                        {/* KEYBOARD SHORTCUT */}
                        <span className="hidden h-9 shrink-0 items-center gap-1 rounded-lg border border-white/[0.08] px-2 text-[9px] text-slate-500 xl:flex">
                            <Command size={11} /> K
                        </span>

                        {/* NOTIFICATIONS */}
                        <button
                            type="button"
                            aria-label="Notifications"
                            title="Notifications"
                            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-slate-400 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
                        >
                            <Bell size={16} />
                            <span className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 ring-2 ring-[#080B18]" />
                        </button>

                        {/* PROFILE */}
                        <button
                            type="button"
                            aria-label="User profile"
                            title="Profile"
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-violet-400/40 bg-gradient-to-br from-violet-500/30 to-fuchsia-600/20 text-violet-200 transition hover:scale-105"
                        >
                            <UserRound size={17} />
                        </button>

                        {/* MOBILE MENU BUTTON */}
                        <button
                            type="button"
                            onClick={() => setMobileOpen((value) => !value)}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-navigation-drawer"
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-slate-300 transition hover:bg-violet-500/10 hover:text-white lg:hidden"
                        >
                            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>

                    {/* MOBILE SEARCH - FULL WIDTH ON SMALL SCREENS */}
                    <div className="relative mt-3 w-full md:hidden">
                        <SearchInput
                            inputRef={mobileSearchRef}
                            value={search}
                            onChange={handleSearchChange}
                            onFocus={() => setSearchOpen(true)}
                            onClear={() => handleClearSearch(mobileSearchRef)}
                            onVoice={handleVoiceButton}
                            listening={listening}
                            mobile
                            searchOpen={searchOpen}
                        />
                        {searchOpen && (search.trim() || voiceMessage) && (
                            <SearchResults
                                search={search}
                                filteredLinks={filteredLinks}
                                voiceMessage={voiceMessage}
                                onOpenApp={openApp}
                            />
                        )}
                    </div>

                    {/* DESKTOP NAVIGATION */}
                    <nav className="mt-3 hidden items-center gap-1 overflow-x-auto border-t border-white/[0.05] pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex">
                        {allLinks.map((item) => (
                            <NavigationLink key={item.path} item={item} />
                        ))}

                        <div className="ml-auto hidden shrink-0 items-center gap-1 px-3 text-[9px] font-semibold text-violet-400 xl:flex">
                            <Sparkles size={12} />
                            MINI APPS. ONE UNIVERSE.
                        </div>
                    </nav>
                </div>
            </header>

            {/* SEARCH BACKDROP */}
            {searchOpen && (search.trim() || voiceMessage) && (
                <button
                    type="button"
                    aria-label="Close search results"
                    className="fixed inset-0 z-[90] cursor-default bg-transparent"
                    onClick={() => setSearchOpen(false)}
                />
            )}

            {/* ========================================
          MOBILE NAVIGATION DRAWER
      ======================================== */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm lg:hidden"
                    onClick={() => setMobileOpen(false)}
                >
                    <aside
                        id="mobile-navigation-drawer"
                        className="absolute right-0 top-0 flex h-full w-[min(340px,88vw)] flex-col border-l border-white/10 bg-[#0B0E1D] px-5 pb-5 pt-6 shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {/* DRAWER HEADER */}
                        <div className="mb-6 flex shrink-0 items-center justify-between">
                            <NavLink
                                to="/"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2.5"
                            >
                                <img src={logo} alt="MiniVerse" className="h-10 w-10 object-contain" />
                                <span className="text-base font-black text-white">
                                    Mini<span className="text-violet-400">Verse</span>
                                </span>
                            </NavLink>

                            <button
                                type="button"
                                onClick={() => setMobileOpen(false)}
                                className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                                aria-label="Close menu"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* DRAWER SEARCH */}
                        <div className="relative mb-5 shrink-0">
                            <SearchInput
                                inputRef={null}
                                value={search}
                                onChange={handleSearchChange}
                                onFocus={() => setSearchOpen(true)}
                                onClear={() => setSearch("")}
                                onVoice={handleVoiceButton}
                                listening={listening}
                                mobile
                                searchOpen={searchOpen}
                            />
                            {searchOpen && (search.trim() || voiceMessage) && (
                                <SearchResults
                                    search={search}
                                    filteredLinks={filteredLinks}
                                    voiceMessage={voiceMessage}
                                    onOpenApp={openApp}
                                    className="max-h-56"
                                />
                            )}
                        </div>

                        {voiceMessage && (
                            <p className="mb-3 shrink-0 text-[10px] leading-5 text-violet-300">
                                {voiceMessage}
                            </p>
                        )}

                        {/* NAVIGATION GROUPS */}
                        <nav className="min-h-0 flex-1 space-y-7 overflow-y-auto overscroll-contain pb-4">
                            {navigationGroups.map((group) => (
                                <div key={group.title}>
                                    <p className="mb-3 px-3 text-[9px] font-bold tracking-[0.2em] text-slate-500">
                                        {group.title}
                                    </p>

                                    <div className="space-y-1">
                                        {group.links.map((item) => (
                                            <NavigationLink
                                                key={item.path}
                                                item={item}
                                                mobile
                                                onNavigate={() => {
                                                    setMobileOpen(false);
                                                    setSearch("");
                                                    setSearchOpen(false);
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </nav>

                        {/* DRAWER FOOTER */}
                        <div className="mt-4 shrink-0 rounded-xl border border-violet-500/15 bg-violet-500/[0.07] p-4">
                            <div className="flex items-center gap-2">
                                <Sparkles size={15} className="text-violet-300" />
                                <span className="text-xs font-bold text-white">Your Universe</span>
                            </div>
                            <p className="mt-2 text-[10px] leading-5 text-slate-400">
                                Explore productivity tools, manage your finances and enjoy exciting games.
                            </p>
                        </div>
                    </aside>
                </div>
            )}
        </>
    );
};

export default Navbar;
