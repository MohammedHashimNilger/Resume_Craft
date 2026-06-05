// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  fetchResumes,
  fetchResume,
  createResume,
  renameResume,
  deleteResume
} from "../services/api";
import { TEMPLATES } from "../constants";
import TemplateThumbnail from "../components/templates/TemplateThumbnail";
import DashboardCard from "../components/dashboard/DashboardCard";
import "../styles/dashboard.css";

export function Dashboard({ onNew, onOpen }) {
  const { user, logout }          = useAuth();
  const [resumes, setResumes]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [renamingId, setRenaming] = useState(null);
  const [renameVal, setRenameVal] = useState("");
  const [error, setError]         = useState("");

  useEffect(() => {
    fetchResumes()
      .then(setResumes)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleRename = async (id) => {
    if (!renameVal.trim()) return;
    try {
      await renameResume(id, renameVal);
      setResumes(r => r.map(x => x._id === id ? { ...x, label: renameVal.trim() } : x));
    } catch (e) { setError(e.message); }
    setRenaming(null); setRenameVal("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resume? This cannot be undone.")) return;
    try {
      await deleteResume(id);
      setResumes(r => r.filter(x => x._id !== id));
    } catch (e) { setError(e.message); }
  };

  const handleDuplicate = async (r) => {
    try {
      const full = await fetchResume(r._id);
      const payload = {
        label: `${r.label} (Copy)`,
        data: full.data,
        template: full.template || "modern",
        sectionOrder: full.sectionOrder || []
      };
      const created = await createResume(payload);
      setResumes(prev => [created, ...prev]);
    } catch (e) {
      setError("Failed to duplicate resume: " + e.message);
    }
  };


  return (
    <div className="dashboard">
      <header className="dash-header">
        <div className="auth-logo" style={{ fontSize: 22 }}>Resume<span>·</span>Craft</div>
        <div className="dash-user">
          <span>👤 {user.name}</span>
          <button className="btn btn-ghost btn-sm" onClick={logout}>Sign Out</button>
        </div>
      </header>

      <div className="dash-body">
        <div className="dash-title-row">
          <h2 className="dash-title">My Resumes</h2>
          <button className="btn btn-primary" onClick={onNew}>+ New Resume</button>
        </div>

        {error && <div className="auth-error" style={{ marginBottom: 16 }}>⚠ {error}</div>}

        {loading && <div className="dash-empty">Loading your resumes…</div>}

        {!loading && resumes.length === 0 && (
          <div className="dash-welcome-section">
            <div className="welcome-banner">
              <h3>Design Your Professional Future </h3>
              <p>Select a layout below to launch the editor and build your resume in minutes.</p>
            </div>
            
            <div className="quick-start-title">Quick Start Layouts</div>
            <div className="quick-start-grid">
              {TEMPLATES.map(t => (
                <div key={t.id} className="quick-template-card" onClick={() => onNew(t.id)}>
                  <div className="quick-template-thumb-wrapper">
                    <TemplateThumbnail template={t} />
                  </div>
                  <div className="quick-template-info">
                    <h4>{t.label} Layout</h4>
                    <span>Start writing →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="dash-grid">
          {resumes.map(r => (
            <DashboardCard
              key={r._id}
              resume={r}
              renamingId={renamingId}
              renameVal={renameVal}
              setRenameVal={setRenameVal}
              setRenaming={setRenaming}
              handleRename={handleRename}
              handleDuplicate={handleDuplicate}
              handleDelete={handleDelete}
              onOpen={onOpen}
            />
          ))}
        </div>
      </div>
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

export default Dashboard;
