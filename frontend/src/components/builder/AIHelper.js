// src/components/builder/AIHelper.js
import React, { useState } from "react";
import callAI from "../../services/ai";

export function AIHelper({ data, onApply }) {
  const [mode, setMode]     = useState("improve");
  const [input, setInput]   = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const MODES = [
    {
      id: "improve",
      label: "✦ Improve Text",
      prompt: "You are a professional resume writer. Rewrite the following text to be more impactful, professional, and ATS-friendly. Output ONLY the improved text."
    },
    {
      id: "summary",
      label: "✦ Gen Summary",
      prompt: "You are a resume expert. Write a 2-3 sentence professional summary. Output ONLY the summary. Data: " + JSON.stringify({ name: data.personal.name, title: data.personal.title, skills: data.skills })
    },
    {
      id: "bullets",
      label: "✦ Bullet Points",
      prompt: "Convert the following into 3-4 powerful bullet points using strong action verbs. Output ONLY the bullets, one per line."
    },
    {
      id: "keywords",
      label: "✦ Add Keywords",
      prompt: "Rewrite the following resume text to include more relevant industry keywords while keeping the meaning intact. Output ONLY the improved text."
    },
  ];

  const run = async () => {
    const selected = MODES.find(m => m.id === mode);
    setLoading(true);
    setResult("");
    try {
      const text = await callAI(selected.prompt, mode === "summary" ? "Generate the summary." : input);
      setResult(text);
    } catch (err) {
      setResult("⚠ " + (err.message || "AI unavailable."));
    }
    setLoading(false);
  };

  return (
    <div className="ai-panel">
      <div className="ai-panel-title">AI Writing Assistant</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
        {MODES.map(m => (
          <button
            key={m.id}
            className={`btn btn-sm ai-mode-btn ${mode === m.id ? "ai-mode-btn-active" : ""}`}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>
      {mode !== "summary" && (
        <textarea
          className="ai-textarea"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={mode === "improve" ? "Paste text to improve…" : mode === "bullets" ? "Describe your role…" : "Paste text to optimize…"}
        />
      )}
      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
        <button className="btn btn-ai btn-sm" onClick={run} disabled={loading}>{loading ? "Thinking…" : "✦ Generate"}</button>
        {result && (
          <button className="btn btn-sm ai-copy-btn" onClick={() => navigator.clipboard.writeText(result)}>
            Copy
          </button>
        )}
      </div>
      {loading && (
        <div className="ai-loading">
          <div className="ai-dot" />
          <div className="ai-dot" />
          <div className="ai-dot" />
          <span className="ai-loading-label">Crafting…</span>
        </div>
      )}
      {result && !loading && (
        <div className="ai-result">
          <div className="ai-result-label">AI Result</div>
          {result}
          {mode === "summary" && (
            <button className="btn btn-sm btn-success" style={{ marginTop: 8 }} onClick={() => onApply("summary", result)}>
              Apply to Resume
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default AIHelper;