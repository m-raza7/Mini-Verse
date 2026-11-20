
import React, {
  useEffect,
  useState,
  lazy,
  Suspense,
} from "react";

import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import { App as CapacitorApp } from "@capacitor/app";

// Static components
import Navbar from "./components/Navbar";
import AppLoader from "./components/AppLoader";

// =====================================
// LAZY LOADED PAGES
// =====================================

const Home = lazy(() => import("./pages/Home"));

const TodoApp = lazy(() => import("./pages/TodoApp"));

const FlipCoinApp = lazy(() => import("./pages/FlipCoinApp"));

const RightWrongGame = lazy(
  () => import("./pages/RightWrongGame")
);

const RightWrongGrid = lazy(
  () => import("./pages/RightWrongGrid")
);

const TermsConditions = lazy(
  () => import("./pages/TermsConditions")
);

const Policy = lazy(() => import("./pages/Policy"));

// Expense Tracker
const ExpenseTracker = lazy(
  () => import("./pages/ExpenseTracker/ExpenseTracker")
);

// Money Tracker
const MoneyTracker = lazy(
  () => import("./pages/MoneyTracker/MoneyTracker")
);

// Money Recovery Tracker
const MoneyRecoveryTracker = lazy(
  () => import("./pages/Money-Recovery-Tracker/MoneyRecoveryTracker")
);

// Snake Game
const SnakeGame = lazy(
  () => import("./pages/SnakeGame/components/SnakeGame")
);

// Dots & Boxes
const DotsAndBoxes = lazy(
  () => import("./pages/DotsAndBoxes/DotsAndBoxes")
);


// =====================================
// PAGE LOADING FALLBACK
// =====================================

const PageLoader = () => {
  return (
    <div className="
      flex min-h-[70vh] w-full
      items-center justify-center
      bg-[#080B18] px-4
    ">

      <div className="flex flex-col items-center gap-5">

        {/* Animated Loader */}
        <div className="relative flex h-16 w-16 items-center justify-center">

          <div className="
            absolute inset-0 rounded-2xl
            border-2 border-purple-500/20
          " />

          <div className="
            absolute inset-0 rounded-2xl
            border-2 border-transparent
            border-t-purple-500
            border-r-violet-400
            animate-spin
          " />

          <div className="
            flex h-10 w-10 items-center
            justify-center rounded-xl
            bg-gradient-to-br
            from-purple-600 to-violet-700
            shadow-lg shadow-purple-500/30
          ">
            <span className="
              text-lg font-black text-white
            ">
              M
            </span>
          </div>

        </div>

        {/* Loading Text */}
        <div className="text-center">

          <h3 className="
            text-sm font-bold
            tracking-wider text-white
          ">
            MiniVerse
          </h3>

          <p className="
            mt-2 text-xs text-slate-400
          ">
            Loading your experience...
          </p>

        </div>

        {/* Loading Progress Animation */}
        <div className="
          h-1 w-32 overflow-hidden
          rounded-full bg-white/10
        ">
          <div className="
            h-full w-1/2 rounded-full
            bg-gradient-to-r
            from-purple-500 to-violet-400
            animate-pulse
          " />
        </div>

      </div>

    </div>
  );
};


// =====================================
// MAIN APP
// =====================================

const App = () => {

  const [showIntro, setShowIntro] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  // =====================================
  // INTRO LOADER
  // =====================================

  useEffect(() => {

    const introPlayed = sessionStorage.getItem("introPlayed");

    if (introPlayed) {
      setLoading(false);
      return;
    }

    setShowIntro(true);

    const timer = setTimeout(() => {

      sessionStorage.setItem("introPlayed", "true");

      setShowIntro(false);
      setLoading(false);

    }, 3000);

    return () => clearTimeout(timer);

  }, []);


  // =====================================
  // ANDROID HARDWARE BACK BUTTON
  // =====================================

  useEffect(() => {

    let backButtonListener = null;
    let active = true;

    const setupBackButton = async () => {

      try {

        const listener = await CapacitorApp.addListener(
          "backButton",
          ({ canGoBack }) => {

            if (canGoBack) {
              navigate(-1);
            }

          }
        );

        if (active) {
          backButtonListener = listener;
        } else {
          listener.remove();
        }

      } catch (error) {
        console.error(
          "Android back button error:",
          error
        );
      }

    };

    setupBackButton();

    return () => {
      active = false;
      backButtonListener?.remove();
    };

  }, [navigate]);


  // =====================================
  // INITIAL LOADING
  // =====================================

  if (loading && !showIntro) {
    return null;
  }

  // =====================================
  // INTRO SCREEN
  // =====================================

  if (showIntro) {
    return <AppLoader />;
  }


  // =====================================
  // APPLICATION ROUTES
  // =====================================

  return (

    <main className="min-h-screen w-full">

      {/* Navbar remains loaded */}
      <Navbar />

      {/* Lazy Loaded Pages */}
      <Suspense fallback={<PageLoader />}>

        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* TODO */}
          <Route
            path="/todos"
            element={<TodoApp />}
          />

          {/* FLIP COIN */}
          <Route
            path="/flip-coin"
            element={<FlipCoinApp />}
          />

          {/* RIGHT WRONG */}
          <Route
            path="/right-wrong"
            element={<RightWrongGame />}
          />

          {/* RIGHT WRONG GRID */}
          <Route
            path="/right-wrong-grid"
            element={<RightWrongGrid />}
          />

          {/* TERMS & CONDITIONS */}
          <Route
            path="/terms-conditions"
            element={<TermsConditions />}
          />

          {/* PRIVACY POLICY */}
          <Route
            path="/policy"
            element={<Policy />}
          />

          {/* MONEY RECOVERY TRACKER */}
          <Route
            path="/money-recovery-tracker"
            element={<MoneyRecoveryTracker />}
          />

          {/* EXPENSE TRACKER */}
          <Route
            path="/expense-tracker"
            element={<ExpenseTracker />}
          />

          {/* MONEY TRACKER */}
          <Route
            path="/money-tracker/*"
            element={<MoneyTracker />}
          />

          {/* SNAKE GAME */}
          <Route
            path="/games/snake"
            element={<SnakeGame />}
          />

          {/* DOTS & BOXES */}
          <Route
            path="/games/dots-and-boxes"
            element={<DotsAndBoxes />}
          />

        </Routes>

      </Suspense>

      {/* Footer can be added here if required */}

    </main>

  );

};

export default App;
