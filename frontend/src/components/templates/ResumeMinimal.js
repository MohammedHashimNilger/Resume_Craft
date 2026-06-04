// src/components/templates/ResumeMinimal.js
import React from "react";
import { parseDesc } from "../../utils/helpers";
import {
  renderEducationSectionMinimal,
  renderProjectsSectionMinimal,
} from "./sectionRenderers";

export function ResumeMinimal({ data, sectionOrder }) {
  const { personal, skills, photo } = data;

  const renderSection = (key) => {
    if (key === "summary") return data.summary ? (
      <div key="summary">
        <div className="r-section-title">Summary</div>
        <div className="r-summary" style={{ marginBottom: 16 }}>{data.summary}</div>
      </div>
    ) : null;
    if (key === "experience") return data.experience.length > 0 ? (
      <div key="experience">
        <div className="r-section-title">Experience</div>
        {data.experience.map(e => (
          <div key={e.id} className="r-entry">
            <div className="r-entry-meta">
              {e.from}{e.to ? `–${e.to}` : ""}
              <br />
              <span style={{ color: "#bbb" }}>{e.company}</span>
            </div>
            <div>
              <div className="r-entry-title">{e.role}</div>
              <div className="r-entry-desc">{parseDesc(e.desc)}</div>
            </div>
          </div>
        ))}
      </div>
    ) : null;
    if (key === "education")      return renderEducationSectionMinimal(data);
    if (key === "projects")       return renderProjectsSectionMinimal(data);
    if (key === "certifications") return data.certifications.length > 0 ? (
      <div key="certifications">
        <div className="r-section-title">Certifications</div>
        {data.certifications.map(c => (
          <div key={c.id} className="r-entry">
            <div className="r-entry-meta">{c.year}</div>
            <div>
              <div className="r-entry-title">{c.name}</div>
              <div className="r-entry-sub">{c.issuer}</div>
            </div>
          </div>
        ))}
      </div>
    ) : null;
    if (key === "achievements") return data.achievements.length > 0 ? (
      <div key="achievements">
        <div className="r-section-title">Achievements</div>
        {data.achievements.map((a, i) => (
          <div key={i} style={{ fontSize: 12, color: "#555", marginBottom: 4 }}>— {a}</div>
        ))}
      </div>
    ) : null;
    if (key === "languages") return data.languages.length > 0 ? (
      <div key="languages">
        <div className="r-section-title">Languages</div>
        <div className="r-skills">
          {data.languages.map((l, i) => (
            <span key={i} className="r-chip">{l}</span>
          ))}
        </div>
      </div>
    ) : null;
    return null;
  };

  return (
    <div className="resume minimal">
      <div className="r-header">
        <div>
          <div className="r-name">{personal.name || "Your Name"}</div>
          {personal.title && <div className="r-title">{personal.title}</div>}
          <div className="r-divider" style={{ marginTop: 12, marginBottom: 0 }} />
          <div style={{ fontSize: 11, color: "#888", marginTop: 6, display: "flex", gap: 16 }}>
            {personal.email   && <span>{personal.email}</span>}
            {personal.phone   && <span>{personal.phone}</span>}
            {personal.address && <span>{personal.address}</span>}
          </div>
        </div>
        {photo && <img src={photo} alt="" className="r-photo" />}
      </div>
      <div className="r-divider" />
      {sectionOrder.map(s => renderSection(s))}
      {skills.length > 0 && (
        <div key="skills">
          <div className="r-section-title">Skills</div>
          <div className="r-skills">
            {skills.map((s, i) => (
              <span key={i} className="r-chip">{s}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeMinimal;
