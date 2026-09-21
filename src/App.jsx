import React, { useEffect, useState } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";

import { App as CapacitorApp } from "@capacitor/app";

import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

import AppLoader from "./components/AppLoader";

import IntroVideo from "./components/IntroVideo";

import Home from "./pages/Home";

import TodoApp from "./pages/TodoApp";

import FlipCoinApp from "./pages/FlipCoinApp";

import RightWrongGame from "./pages/RightWrongGame";

import RightWrongGrid from "./pages/RightWrongGrid";

import TermsConditions from "./pages/TermsConditions";

import Policy from "./pages/Policy";

import ExpenseTracker from "./pages/ExpenseTracker/ExpenseTracker";

// Money Tracker
import MoneyTracker from "./pages/MoneyTracker/MoneyTracker";

import MoneyRecoveryTracker from "./pages/Money-Recovery-Tracker/MoneyRecoveryTracker";

const App = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Intro Loader
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

  // Android Hardware Back Button
  useEffect(() => {
    let backButtonListener = null;

    const setupBackButton = async () => {
      backButtonListener = await CapacitorApp.addListener(
        "backButton",
        ({ canGoBack }) => {
          if (canGoBack) {
            navigate(-1);
          }
        }
      );
    };

    setupBackButton();

    return () => {
      backButtonListener?.remove();
    };
  }, [navigate]);

  if (loading && !showIntro) {
    return null;
  }

  if (showIntro) {
    return <AppLoader />;
  }

  return (
    <main>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/todos"
          element={<TodoApp />}
        />

        <Route
          path="/flip-coin"
          element={<FlipCoinApp />}
        />

        <Route
          path="/right-wrong"
          element={<RightWrongGame />}
        />

        <Route
          path="/right-wrong-grid"
          element={<RightWrongGrid />}
        />

        <Route
          path="/terms-conditions"
          element={<TermsConditions />}
        />

        <Route
          path="/policy"
          element={<Policy />}
        />

        <Route
          path="/money-recovery-tracker"
          element={<MoneyRecoveryTracker />}
        />

        {/* OLD Expense Tracker */}
        <Route
          path="/expense-tracker"
          element={<ExpenseTracker />}
        />

        {/* NEW Money Tracker */}
        <Route
          path="/money-tracker/*"
          element={<MoneyTracker />}
        />
      </Routes>

      {/* <Footer /> */}
    </main>
  );
};

export default App;