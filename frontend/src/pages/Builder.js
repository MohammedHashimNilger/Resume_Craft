// src/pages/Builder.js
import React, { useState, useRef, useEffect } from "react";
import { fetchResume, saveResume, createResume } from "../services/api";
import {
  TEMPLATES,
  SECTION_ORDER_DEFAULT,
  DEFAULT_RESUME,
  TEMPLATE_COLORS
} from "../constants";

import PersonalForm from "../components/builder/PersonalForm";
import PhotoForm from "../components/builder/PhotoForm";
import SummaryForm from "../components/builder/SummaryForm";
import SkillsForm from "../components/builder/SkillsForm";
import SimpleListSection from "../components/builder/SimpleListSection";
import RepeatableSection from "../components/builder/RepeatableSection";
import SectionOrderPanel from "../components/builder/SectionOrderPanel";
import DownloadButtons from "../components/builder/DownloadButtons";
import AIHelper from "../components/builder/AIHelper";

import TemplateThumbnail from "../components/templates/TemplateThumbnail";
import ResumePreview from "../components/templates/ResumePreview";

import "../styles/builder.css";
import "../styles/resume.css";

export function Builder({ resumeId, initialTemplate = "modern", onBack, onToast }) {
  const [currentId, setCurrentId]   = useState(resumeId);
  const [data, setData]             = useState(DEFAULT_RESUME);
  const [template, setTemplate]     = useState(initialTemplate);
  const [sectionOrder, setSO]       = useState(SECTION_ORDER_DEFAULT);
  const [label, setLabel]           = useState("Untitled Resume");
  const [tab, setTab]               = useState("form");
  const [dark, setDark]             = useState(true);
  const [saving, setSaving]         = useState(false);
  const [saveStatus, setSaveStatus] = useState(""); // "saved" | "error" | ""
  const previewRef                  = useRef(null);

  // Sync theme selection to document.body
  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    return () => {
      document.body.classList.remove("dark");
    };
  }, [dark]);

  // Sync prop change to state
  useEffect(() => {
    setCurrentId(resumeId);
  }, [resumeId]);

  // Load existing resume if currentId is set
  useEffect(() => {
    if (!currentId) return;
    fetchResume(currentId).then(r => {
      setData(r.data);
      setTemplate(r.template || "modern");
      setSO(r.sectionOrder?.length ? r.sectionOrder : SECTION_ORDER_DEFAULT);
      setLabel(r.label || "Untitled Resume");
    }).catch(e => onToast("Failed to load resume: " + e.message));
  }, [currentId, onToast]);

  const setP = (k, v) => setData(d => ({ ...d, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("");
    try {
      const payload = { label, data, template, sectionOrder };
      if (currentId) {
        await saveResume(currentId, payload);
      } else {
        const created = await createResume(payload);
        setCurrentId(created._id);
        // update URL so subsequent saves go to PUT not POST
        window.history.replaceState({}, "", `?resume=${created._id}`);
      }
      setSaveStatus("saved");
      onToast("Resume saved ✓");
    } catch (e) {
      setSaveStatus("error");
      onToast("Save failed: " + e.message);
    } finally {
      setSaving(false);
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  const expFields = {
    getLabel: it => it.role || "",
    render: (it, upd) => (
      <div className="form-grid">
        <div className="form-grid form-grid-2">
          <div><label>Role</label><input value={it.role || ""} onChange={e => upd({ role: e.target.value })} placeholder="Software Engineer" /></div>
          <div><label>Company</label><input value={it.company || ""} onChange={e => upd({ company: e.target.value })} placeholder="Acme Corp" /></div>
        </div>
        <div className="form-grid form-grid-2">
          <div><label>From</label><input value={it.from || ""} onChange={e => upd({ from: e.target.value })} placeholder="2021" /></div>
          <div><label>To</label><input value={it.to || ""} onChange={e => upd({ to: e.target.value })} placeholder="Present" /></div>
        </div>
        <div>
          <label>Description (one bullet per line)</label>
          <textarea
            value={it.desc || ""}
            onChange={e => upd({ desc: e.target.value })}
            placeholder={"Built scalable APIs\nReduced latency by 40%"}
            style={{ minHeight: 80 }}
          />
        </div>
      </div>
    ),
  };

  const eduFields = {
    getLabel: it => it.school || "",
    render: (it, upd) => (
      <div className="form-grid">
        <div className="form-grid form-grid-2">
          <div><label>School</label><input value={it.school || ""} onChange={e => upd({ school: e.target.value })} /></div>
          <div><label>Degree</label><input value={it.degree || ""} onChange={e => upd({ degree: e.target.value })} /></div>
        </div>
        <div className="form-grid form-grid-2">
          <div><label>Year</label><input value={it.year || ""} onChange={e => upd({ year: e.target.value })} /></div>
          <div><label>GPA</label><input value={it.gpa || ""} onChange={e => upd({ gpa: e.target.value })} /></div>
        </div>
      </div>
    ),
  };

  const projFields = {
    getLabel: it => it.name || "",
    render: (it, upd) => (
      <div className="form-grid">
        <div><label>Project Name</label><input value={it.name || ""} onChange={e => upd({ name: e.target.value })} /></div>
        <div className="form-grid form-grid-2">
          <div><label>Tech Stack</label><input value={it.tech || ""} onChange={e => upd({ tech: e.target.value })} /></div>
          <div><label>Link</label><input value={it.link || ""} onChange={e => upd({ link: e.target.value })} /></div>
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={it.desc || ""}
            onChange={e => upd({ desc: e.target.value })}
            style={{ minHeight: 60 }}
          />
        </div>
      </div>
    ),
  };

  const certFields = {
    getLabel: it => it.name || "",
    render: (it, upd) => (
      <div className="form-grid">
        <div><label>Name</label><input value={it.name || ""} onChange={e => upd({ name: e.target.value })} /></div>
        <div className="form-grid form-grid-2">
          <div><label>Issuer</label><input value={it.issuer || ""} onChange={e => upd({ issuer: e.target.value })} /></div>
          <div><label>Year</label><input value={it.year || ""} onChange={e => upd({ year: e.target.value })} /></div>
        </div>
      </div>
    ),
  };

  return (
    <div className={`app ${dark ? "dark" : ""}`}>
      <header className="topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="btn btn-ghost btn-sm" onClick={onBack}>← Dashboard</button>
          <div className="topbar-logo">Resume<span>·</span>Craft</div>
        </div>
        {/* Inline resume label editor */}
        <input
          className="label-input"
          value={label}
          onChange={e => setLabel(e.target.value)}
          placeholder="Resume name…"
        />
        <div className="topbar-actions">
          <button
            className={`btn btn-sm ${saveStatus === "saved" ? "btn-success" : saveStatus === "error" ? "btn-danger" : "btn-primary"}`}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving…" : saveStatus === "saved" ? "✓ Saved" : saveStatus === "error" ? "✕ Error" : "💾 Save"}
          </button>
          <DownloadButtons previewRef={previewRef} data={data} onToast={onToast} />
          <button className="btn btn-ghost btn-sm" onClick={() => setDark(d => !d)}>{dark ? "☀" : "☾"}</button>
        </div>
      </header>

      <div className="main-layout">
        <aside className="sidebar">
          <div className="tabs">
            {[["form", "✏ Edit"], ["ai", "✦ AI"], ["templates", "🎨 Style"], ["order", "⠿ Order"]].map(([id, lbl]) => (
              <button key={id} className={`tab ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>{lbl}</button>
            ))}
          </div>

          {tab === "form" && (
            <>
              <PersonalForm data={data.personal} onChange={v => setP("personal", v)} />
              <PhotoForm photo={data.photo} onChange={v => setP("photo", v)} />
              <SummaryForm value={data.summary} onChange={v => setP("summary", v)} />
              <SkillsForm skills={data.skills} onChange={v => setP("skills", v)} />
              <RepeatableSection title="Experience"     icon="💼" items={data.experience}     onChange={v => setP("experience", v)}     renderFields={expFields} />
              <RepeatableSection title="Education"      icon="🎓" items={data.education}      onChange={v => setP("education", v)}      renderFields={eduFields} />
              <RepeatableSection title="Projects"       icon="🚀" items={data.projects}       onChange={v => setP("projects", v)}       renderFields={projFields} />
              <RepeatableSection title="Certifications" icon="🏅" items={data.certifications} onChange={v => setP("certifications", v)} renderFields={certFields} />
              <SimpleListSection title="Achievements"   icon="⭐" items={data.achievements}   onChange={v => setP("achievements", v)} placeholder="Speaker at ReactConf 2024" />
              <SimpleListSection title="Languages"      icon="🌐" items={data.languages}      onChange={v => setP("languages", v)}    placeholder="English (Native)" />
            </>
          )}

          {tab === "ai" && <AIHelper data={data} onApply={(field, val) => { setP(field, val); onToast("Applied to resume!"); }} />}

          {tab === "templates" && (
            <div style={{ padding: "16px 0" }}>
              <div className="form-section-title" style={{ padding: "0 20px", marginBottom: 12 }}><span className="icon">🎨</span> Choose Template</div>
              <div className="template-grid" style={{ padding: "0 20px" }}>
                {TEMPLATES.map(t => (
                  <div
                    key={t.id}
                    className={`template-card ${template === t.id ? "active" : ""}`}
                    onClick={() => { setTemplate(t.id); onToast(`Template: ${t.label}`); }}
                  >
                    <TemplateThumbnail template={t} />
                    <div className="template-name">{t.label}</div>
                  </div>
                ))}
              </div>

              <div className="form-section-title" style={{ padding: "0 20px", marginTop: 24, marginBottom: 12 }}><span className="icon">🌈</span> Accent Color</div>
              <div className="color-picker-grid">
                {[
                  { label: "Default", hex: "" },
                  { label: "Royal Blue", hex: "#2a6bc8" },
                  { label: "Burnt Orange", hex: "#c8622a" },
                  { label: "Emerald", hex: "#10b981" },
                  { label: "Crimson", hex: "#e11d48" },
                  { label: "Amethyst", hex: "#7c3aed" },
                  { label: "Teal", hex: "#0d9488" },
                  { label: "Charcoal", hex: "#334155" },
                ].map(col => (
                  <button
                    key={col.label}
                    className={`color-btn ${(data.accentColor || "") === col.hex ? "active" : ""}`}
                    style={{ background: col.hex || "conic-gradient(from 0deg, red, yellow, green, cyan, blue, magenta, red)" }}
                    title={col.label}
                    onClick={() => {
                      setP("accentColor", col.hex);
                      onToast(`Color: ${col.label}`);
                    }}
                  />
                ))}
                {/* Custom Color Input */}
                <div className={`custom-color-wrapper ${data.accentColor && !["#2a6bc8", "#c8622a", "#10b981", "#e11d48", "#7c3aed", "#0d9488", "#334155"].includes(data.accentColor) ? "active" : ""}`}>
                  <input
                    type="color"
                    value={data.accentColor && data.accentColor.startsWith("#") ? data.accentColor : (TEMPLATE_COLORS[template] || "#2a6bc8")}
                    onChange={(e) => {
                      setP("accentColor", e.target.value);
                    }}
                    title="Custom color"
                  />
                </div>
              </div>
            </div>
          )}

          {tab === "order" && <SectionOrderPanel order={sectionOrder} onChange={setSO} />}
        </aside>

        <main className="preview-area">
          <div className="preview-wrapper">
            <div className="preview-controls">
              <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>Live Preview · {TEMPLATES.find(t => t.id === template)?.label}</div>
              <DownloadButtons previewRef={previewRef} data={data} onToast={onToast} />
            </div>
            <ResumePreview data={data} template={template} sectionOrder={sectionOrder} previewRef={previewRef} />
          </div>
        </main>
      </div>

    </div>
  );
}

export default Builder;
