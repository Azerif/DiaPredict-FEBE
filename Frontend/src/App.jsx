import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ProtectedRoute, PublicRoute } from "./routes";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import HistoriPage from "./pages/HistoriPage";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Education from "./pages/Education";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./lib/scrollToTop";

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <ScrollToTop />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/histori"
          element={
            <ProtectedRoute>
              <HistoriPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/education"
          element={
            <ProtectedRoute>
              <Education />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return <AppRoutes />;
}

export default App;