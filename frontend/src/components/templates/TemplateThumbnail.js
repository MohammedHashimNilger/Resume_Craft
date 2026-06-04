// src/components/templates/TemplateThumbnail.js
import React from "react";

export function TemplateThumbnail({ template }) {
  const { accent, bg } = template;
  const styles = {
    modern: (
      <div className="template-thumb" style={{ background: "#fff", padding: 0 }}>
        <div style={{ background: bg, height: 28, padding: "6px 8px" }}>
          <div className="thumb-line" style={{ width: "60%", height: 6, background: "#fff", opacity: .9 }} />
          <div className="thumb-line" style={{ width: "35%", height: 3, background: accent, marginTop: 3 }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "35% 1fr", flex: 1 }}>
          <div style={{ background: "#f5f3ef", padding: "4px 5px" }}>
            {[70, 55, 80, 45].map((w, i) => (
              <div key={i} className="thumb-line" style={{ width: `${w}%`, height: 3, background: "#ccc", marginBottom: 4 }} />
            ))}
          </div>
          <div style={{ padding: "4px 5px" }}>
            <div className="thumb-line" style={{ width: "40%", height: 2, background: accent, marginBottom: 4 }} />
            {[90, 70, 85].map((w, i) => (
              <div key={i} className="thumb-line" style={{ width: `${w}%`, height: 3, background: "#ddd", marginBottom: 3 }} />
            ))}
          </div>
        </div>
      </div>
    ),
    professional: (
      <div className="template-thumb" style={{ background: "#fff", padding: "8px" }}>
        <div className="thumb-line" style={{ width: "55%", height: 7, background: "#1a1a2e", borderRadius: 2, marginBottom: 3 }} />
        <div className="thumb-line" style={{ width: "35%", height: 3, background: accent, marginBottom: 6 }} />
        <div style={{ height: 2, background: accent, marginBottom: 6 }} />
        {[["30%", accent], ["80%", "#ddd"], ["65%", "#ddd"], ["70%", "#ddd"]].map(([w, c], i) => (
          <div key={i} className="thumb-line" style={{ width: w, height: i === 0 ? 3 : 2.5, background: c, marginBottom: 3 }} />
        ))}
      </div>
    ),
    minimal: (
      <div className="template-thumb" style={{ background: "#fff", padding: "8px 10px" }}>
        <div className="thumb-line" style={{ width: "70%", height: 9, background: "#222", marginBottom: 3 }} />
        <div className="thumb-line" style={{ width: "40%", height: 2, background: "#bbb", marginBottom: 8 }} />
        <div style={{ height: 1, background: "#222", marginBottom: 6 }} />
        <div className="thumb-line" style={{ width: "25%", height: 2, background: "#888", marginBottom: 5 }} />
        {[75, 85, 60].map((w, i) => (
          <div key={i} className="thumb-line" style={{ width: `${w}%`, height: 2, background: "#ddd", marginBottom: 3 }} />
        ))}
      </div>
    ),
    creative: (
      <div className="template-thumb" style={{ background: "#fff", padding: 0 }}>
        <div style={{ background: `linear-gradient(135deg,${bg},#1b4d8e)`, height: 30, padding: "6px 8px" }}>
          <div className="thumb-line" style={{ width: "55%", height: 7, background: "#fff", opacity: .9 }} />
          <div className="thumb-line" style={{ width: "35%", height: 2.5, background: "rgba(255,255,255,.6)", marginTop: 3 }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 32%", flex: 1 }}>
          <div style={{ padding: "5px" }}>
            {[80, 65, 75, 55].map((w, i) => (
              <div key={i} className="thumb-line" style={{ width: `${w}%`, height: 2.5, background: "#ddd", marginBottom: 3.5 }} />
            ))}
          </div>
          <div style={{ background: "#f8f7ff", padding: "5px 4px", borderLeft: "1px solid #e8e5f0" }}>
            {[70, 50, 80].map((w, i) => (
              <div key={i} className="thumb-line" style={{ width: `${w}%`, height: 2.5, background: "#e0ddf5", marginBottom: 4 }} />
            ))}
          </div>
        </div>
      </div>
    ),
  };
  return styles[template.id] || null;
}

export default TemplateThumbnail;
