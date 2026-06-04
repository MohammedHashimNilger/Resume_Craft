// src/pages/LandingPage.js
import React, { useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/landing.css";

// ─── ICONS ────────────────────────────────────────────────────────────────────
const IconUser = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const IconLock = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconEye = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const IconArrow = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
       strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconAlert = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSection({ onGetStarted }) {
  return (
    <section className="hero-section">
      <div className="hero-grid">
        <div className="hero-content">
          <span className="hero-eyebrow">Resume Builder</span>

          <h1 className="hero-title">
            A resume that reads<br />
            like a person wrote it.
          </h1>

          <p className="hero-subheading">
            Select an elegant layout, detail your professional milestones, and export a beautifully typeset resume that captures your true career narrative. Simple, distraction-free, and crafted for readability.
          </p>

          <div className="hero-actions">
            <button className="btn btn-dark-solid" onClick={onGetStarted}>
              Get started
            </button>
            <a
              href="#auth-section"
              className="btn btn-ghost-plain"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("auth-section")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              I already have an account
            </a>
          </div>

          <ul className="hero-checklist">
            <li>Real templates designed for reading</li>
            <li>Export to PDF or JSON</li>
            <li>Save and edit unlimited resumes</li>
          </ul>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="resume-mock">
            <div className="resume-mock-header">
              <div className="resume-mock-name">Mohammed Hashim</div>
              <div className="resume-mock-role">Senior Frontend Architect</div>
              <div className="resume-mock-contact">hashimrangrezz786@gmail.com · Chittorgarh, Rajasthan, India · hashim.dev</div>
            </div>

            <div className="resume-mock-section">
              <div className="resume-mock-section-title">Experience</div>
              <div className="resume-mock-entry">
                <div className="resume-mock-entry-head">
                  <span>Frontend Architect · Razorpay</span>
                  <span>2022 – Present</span>
                </div>
                <div className="resume-mock-line" style={{ width: "92%" }} />
                <div className="resume-mock-line" style={{ width: "78%" }} />
                <div className="resume-mock-line" style={{ width: "64%" }} />
              </div>
              <div className="resume-mock-entry">
                <div className="resume-mock-entry-head">
                  <span>Senior Engineer · BrowserStack</span>
                  <span>2019 – 2022</span>
                </div>
                <div className="resume-mock-line" style={{ width: "85%" }} />
                <div className="resume-mock-line" style={{ width: "60%" }} />
              </div>
            </div>

            <div className="resume-mock-section">
              <div className="resume-mock-section-title">Education</div>
              <div className="resume-mock-line" style={{ width: "70%" }} />
              <div className="resume-mock-line" style={{ width: "50%" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── AUTHENTICATION SECTION ───────────────────────────────────────────────────
function AuthSectionComponent() {
  const { register, login } = useAuth();
  const [mode, setMode]         = useState("login");
  const [email, setEmail]       = useState("");
  const [pass, setPass]         = useState("");
  const [name, setName]         = useState("");
  const [error, setError]       = useState("");
  const [busy, setBusy]         = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);

  const switchMode = (next) => {
    if (next === mode) return;
    setMode(next);
    setError("");
    setName("");
    setEmail("");
    setPass("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);

    try {
      if (mode === "login") {
        await login(email, pass);
      } else {
        await register(name, email, pass);
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="auth-section" id="auth-section">
      <div className="auth-wrapper">
        <div className="auth-form-side">
          <div className="auth-header">
            <span className="auth-eyebrow">Get started in seconds</span>
            <h2 className="auth-title">
              {mode === "login" ? "Sign in to your account" : "Create your account"}
            </h2>
            <p className="auth-subtitle">
              {mode === "login"
                ? "Welcome back. Continue building your resume."
                : "Join free — it takes about a minute."}
            </p>
          </div>

          <div className="auth-card">
            <div className="auth-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={mode === "login"}
                className={`auth-tab ${mode === "login" ? "active" : ""}`}
                onClick={() => switchMode("login")}
              >
                Sign in
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "register"}
                className={`auth-tab ${mode === "register" ? "active" : ""}`}
                onClick={() => switchMode("register")}
              >
                Create account
              </button>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="auth-fields">
                {mode === "register" && (
                  <div className="auth-field">
                    <label htmlFor="lp-name" className="auth-label">
                      Full name
                    </label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon"><IconUser /></span>
                      <input
                        id="lp-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                        autoComplete="name"
                      />
                    </div>
                  </div>
                )}

                <div className="auth-field">
                  <label htmlFor="lp-email" className="auth-label">
                    Email address
                  </label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon"><IconMail /></span>
                    <input
                      id="lp-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      autoFocus={mode === "login"}
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label htmlFor="lp-pass" className="auth-label">
                    Password
                  </label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon"><IconLock /></span>
                    <input
                      id="lp-pass"
                      type={showPass ? "text" : "password"}
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      placeholder="At least 6 characters"
                      required
                      minLength={6}
                      autoComplete={mode === "login" ? "current-password" : "new-password"}
                    />
                    <button
                      type="button"
                      className="auth-pass-toggle"
                      onClick={() => setShowPass((v) => !v)}
                      aria-label={showPass ? "Hide password" : "Show password"}
                      tabIndex={-1}
                    >
                      {showPass ? <IconEyeOff /> : <IconEye />}
                    </button>
                  </div>
                </div>

                {mode === "login" && (
                  <div className="auth-field-row">
                    <label className="auth-checkbox">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                      />
                      <span className="auth-checkbox-text">Remember me</span>
                    </label>
                    <a href="#forgot" className="auth-link" onClick={(e) => e.preventDefault()}>
                      Forgot password?
                    </a>
                  </div>
                )}
              </div>

              {error && (
                <div className="auth-error" role="alert">
                  <IconAlert />
                  <span>{error}</span>
                </div>
              )}

              <button className="btn-auth-submit" type="submit" disabled={busy}>
                <span>{busy ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}</span>
                {!busy && <IconArrow />}
                {busy && <span className="btn-spinner" aria-hidden="true" />}
              </button>

              <p className="auth-foot">
                {mode === "login" ? "New here? " : "Already have an account? "}
                <button
                  type="button"
                  className="auth-foot-link"
                  onClick={() => switchMode(mode === "login" ? "register" : "login")}
                >
                  {mode === "login" ? "Create an account" : "Sign in instead"}
                </button>
              </p>
            </form>
          </div>
        </div>

        <aside className="auth-side">
          <h3 className="auth-side-title">Why bother with another resume builder?</h3>
          <ul className="auth-side-list">
            <li>
              <span className="auth-side-num">01</span>
              <div>
                <strong>Templates that don&rsquo;t look like templates.</strong>
                <p>Designed by people who&rsquo;ve actually read a resume or two. Clean type, sensible spacing, no clip art.</p>
              </div>
            </li>
            <li>
              <span className="auth-side-num">02</span>
              <div>
                <strong>Save once, edit forever.</strong>
                <p>Come back next week, next month, or when your job finally makes you update it. It&rsquo;ll be right where you left it.</p>
              </div>
            </li>
            <li>
              <span className="auth-side-num">03</span>
              <div>
                <strong>Get a PDF that prints nicely.</strong>
                <p>No weird margins, no broken icons, no &ldquo;this only works in Chrome&rdquo; nonsense. Just a file recruiters can open.</p>
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

// ─── LANDING PAGE (main export) ───────────────────────────────────────────────
export default function LandingPage() {
  const handleGetStarted = useCallback(() => {
    const section = document.getElementById("auth-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="landing-page">
      <HeroSection onGetStarted={handleGetStarted} />
      <AuthSectionComponent />
      <footer style={{
        textAlign: "center",
        padding: "48px 24px 24px",
        fontSize: "12px",
        color: "var(--muted)",
        borderTop: "1px solid var(--border)",
        background: "var(--bg)"
      }}>
        Designed & crafted by Mohammed Hashim · Chittorgarh, Rajasthan, India
      </footer>
    </div>
  );
}
