// src/App.js
import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Builder from "./pages/Builder";

function AppShell() {
  const { user, loading }       = useAuth();
  const [view, setView]         = useState("dashboard"); // "dashboard" | "editor"
  const [activeResumeId, setId] = useState(null);
  const [activeTemplate, setActiveTemplate] = useState("modern");
  const [toast, setToast]       = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const openEditor = (id = null, defaultTpl = "modern") => {
    setId(id);
    setActiveTemplate(defaultTpl);
    setView("editor");
  };

  const goBack = () => {
    setId(null);
    setView("dashboard");
    window.history.replaceState({}, "", window.location.pathname);
  };

  // Check URL params on mount/auth to open resume directly
  useEffect(() => {
    if (!user) return;
    const params = new URLSearchParams(window.location.search);
    const resumeId = params.get("resume");
    if (resumeId) {
      setId(resumeId);
      setView("editor");
    }
  }, [user]);

  if (loading) return (
    <div className="auth-overlay">
      <div style={{ color: "#fff", fontSize: 18, opacity: .7 }}>Loading…</div>
    </div>
  );

  if (!user) return <LandingPage />;

  return (
    <>
      {view === "dashboard" && <Dashboard onNew={(tpl) => openEditor(null, tpl)} onOpen={(id) => openEditor(id)} />}
      {view === "editor"    && <Builder resumeId={activeResumeId} initialTemplate={activeTemplate} onBack={goBack} onToast={showToast} />}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}