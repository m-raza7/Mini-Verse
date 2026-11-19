
import React from "react";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "motion/react";
import {
    Routes,
    useLocation,
} from "react-router-dom";

/* -----------------------------------------
   PAGE TRANSITION VARIANTS
----------------------------------------- */

const transitions = {
    // Simple fade
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    },

    // Blur + Fade + Scale
    blur: {
        initial: {
            opacity: 0,
            scale: 0.97,
            filter: "blur(14px)",
        },
        animate: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
        },
        exit: {
            opacity: 0,
            scale: 1.02,
            filter: "blur(10px)",
        },
    },

    // Bottom to top
    slideUp: {
        initial: { opacity: 0, y: 55 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 },
    },

    // Top to bottom
    slideDown: {
        initial: { opacity: 0, y: -55 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 30 },
    },

    // Right to left
    slideLeft: {
        initial: { opacity: 0, x: 70 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    },

    // Left to right
    slideRight: {
        initial: { opacity: 0, x: -70 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 50 },
    },

    // Zoom
    zoom: {
        initial: {
            opacity: 0,
            scale: 0.82,
        },
        animate: {
            opacity: 1,
            scale: 1,
        },
        exit: {
            opacity: 0,
            scale: 1.12,
        },
    },

    // 3D Flip
    flip: {
        initial: {
            opacity: 0,
            rotateY: 75,
        },
        animate: {
            opacity: 1,
            rotateY: 0,
        },
        exit: {
            opacity: 0,
            rotateY: -75,
        },
    },

    // Rotate + Scale
    rotate: {
        initial: {
            opacity: 0,
            rotate: -8,
            scale: 0.92,
        },
        animate: {
            opacity: 1,
            rotate: 0,
            scale: 1,
        },
        exit: {
            opacity: 0,
            rotate: 8,
            scale: 0.94,
        },
    },

    // Circular / Mask Reveal
    clip: {
        initial: {
            opacity: 0,
            clipPath: "inset(0 0 100% 0 round 30px)",
        },
        animate: {
            opacity: 1,
            clipPath: "inset(0 0 0% 0 round 0px)",
        },
        exit: {
            opacity: 0,
            clipPath: "inset(100% 0 0 0 round 30px)",
        },
    },

    // Diagonal
    diagonal: {
        initial: {
            opacity: 0,
            x: 50,
            y: 35,
            scale: 0.96,
        },
        animate: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
        },
        exit: {
            opacity: 0,
            x: -40,
            y: -25,
            scale: 0.97,
        },
    },

    // Spring
    spring: {
        initial: {
            opacity: 0,
            scale: 0.7,
            y: 35,
        },
        animate: {
            opacity: 1,
            scale: 1,
            y: 0,
        },
        exit: {
            opacity: 0,
            scale: 0.85,
        },
    },

    // Blur + Slide
    blurSlide: {
        initial: {
            opacity: 0,
            filter: "blur(12px)",
            y: 35,
        },
        animate: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
        },
        exit: {
            opacity: 0,
            filter: "blur(8px)",
            y: -25,
        },
    },

    // Scale + Slide
    scaleSlide: {
        initial: {
            opacity: 0,
            scale: 0.92,
            x: 35,
        },
        animate: {
            opacity: 1,
            scale: 1,
            x: 0,
        },
        exit: {
            opacity: 0,
            scale: 0.96,
            x: -30,
        },
    },
};

/* -----------------------------------------
   TRANSITION SETTINGS
----------------------------------------- */

const transitionSettings = {
    fade: {
        duration: 0.35,
        ease: "easeInOut",
    },

    blur: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
    },

    slideUp: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
    },

    slideDown: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
    },

    slideLeft: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
    },

    slideRight: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
    },

    zoom: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
    },

    flip: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
    },

    rotate: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
    },

    clip: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
    },

    diagonal: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
    },

    spring: {
        type: "spring",
        stiffness: 180,
        damping: 18,
    },

    blurSlide: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
    },

    scaleSlide: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
    },
};

/* -----------------------------------------
   ROUTE ANIMATION CONFIGURATION
----------------------------------------- */

const routeAnimations = {
    "/": "clip",

    "/todos": "slideUp",

    "/flip-coin": "spring",

    "/right-wrong": "flip",

    "/right-wrong-grid": "zoom",

    "/expense-tracker": "scaleSlide",

    "/money-recovery-tracker": "blurSlide",

    "/terms-conditions": "fade",

    "/policy": "fade",
};

/* -----------------------------------------
   GET ANIMATION FOR CURRENT ROUTE
----------------------------------------- */

const getRouteAnimation = (pathname) => {
    // Nested Money Tracker pages
    if (pathname.startsWith("/money-tracker")) {
        return "slideLeft";
    }

    return routeAnimations[pathname] || "blur";
};

/* -----------------------------------------
   ANIMATED ROUTES COMPONENT
----------------------------------------- */

export default function AnimatedRoutes({ children }) {
    const location = useLocation();
    const shouldReduceMotion = useReducedMotion();

    const animationType = getRouteAnimation(location.pathname);

    const variants = shouldReduceMotion
        ? transitions.fade
        : transitions[animationType];

    const transition = shouldReduceMotion
        ? { duration: 0.01 }
        : transitionSettings[animationType];

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.main
                key={location.pathname}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                style={{
                    transformPerspective: 1200,
                    transformStyle: "preserve-3d",
                }}
                className="min-h-screen w-full"
            >
                <Routes location={location}>
                    {children}
                </Routes>
            </motion.main>
        </AnimatePresence>
    );
}
