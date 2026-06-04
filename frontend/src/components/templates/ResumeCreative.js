// src/components/templates/ResumeCreative.js
import React from "react";
import { CREATIVE_LEFT, CREATIVE_RIGHT } from "../../constants";
import {
  renderExperienceSection,
  renderProjectsSection,
} from "./sectionRenderers";

export function ResumeCreative({ data, sectionOrder }) {
  const { personal, skills, education, certifications, languages, achievements, photo } = data;

  const renderLeft = (key) => {
    if (key === "summary") return data.summary ? (
      <div key="summary">
        <div className="r-section-title">Profile</div>
        <div className="r-summary" style={{ marginBottom: 20 }}>{data.summary}</div>
      </div>
    ) : null;
    if (key === "experience") return renderExperienceSection(data);
    if (key === "projects")   return renderProjectsSection(data);
    return null;
  };

  const renderRight = (key) => {
    if (key === "skills" && skills.length > 0) return (
      <div key="skills">
        <div className="r-section-title">Skills</div>
        {skills.map((s, i) => (
          <div key={i}>
            <div className="r-skill-name">{s}</div>
            <div className="r-skill-track">
              <div className="r-skill-fill" style={{ width: `${60 + (i * 11) % 38}%` }} />
            </div>
          </div>
        ))}
      </div>
    );
    if (key === "education" && education.length > 0) return (
      <div key="education">
        <div className="r-section-title">Education</div>
        {education.map(e => (
          <div key={e.id} style={{ marginBottom: 12 }}>
            <div className="r-entry-title" style={{ fontSize: 12 }}>{e.degree}</div>
            <div className="r-entry-sub">{e.school}</div>
            <div className="r-entry-date">{e.year}</div>
          </div>
        ))}
      </div>
    );
    if (key === "certifications" && certifications.length > 0) return (
      <div key="certifications">
        <div className="r-section-title">Certifications</div>
        {certifications.map(c => (
          <div key={c.id} style={{ marginBottom: 8, fontSize: 12 }}>
            <strong>{c.name}</strong>
            <br />
            <span style={{ color: "#888" }}>{c.issuer} · {c.year}</span>
          </div>
        ))}
      </div>
    );
    if (key === "languages" && languages.length > 0) return (
      <div key="languages">
        <div className="r-section-title">Languages</div>
        {languages.map((l, i) => (
          <div key={i} style={{ fontSize: 12, marginBottom: 4 }}>{l}</div>
        ))}
      </div>
    );
    if (key === "achievements" && achievements.length > 0) return (
      <div key="achievements">
        <div className="r-section-title">Achievements</div>
        {achievements.map((a, i) => (
          <div key={i} className="r-chip" style={{ display: "block", marginBottom: 4, fontSize: 10 }}>{a}</div>
        ))}
      </div>
    );
    return null;
  };

  return (
    <div className="resume creative">
      <div className="r-header">
        <div className="r-name">{personal.name || "Your Name"}</div>
        {personal.title && <div className="r-title">{personal.title}</div>}
        <div className="r-contact">
          {personal.email    && <span>✉ {personal.email}</span>}
          {personal.phone    && <span>✆ {personal.phone}</span>}
          {personal.address  && <span>⊙ {personal.address}</span>}
          {personal.linkedin && <span>in {personal.linkedin}</span>}
          {personal.github   && <span>⌥ {personal.github}</span>}
        </div>
      </div>
      <div className="r-body">
        <div className="r-left">
          {sectionOrder.filter(s => CREATIVE_LEFT.includes(s)).map(s => renderLeft(s))}
        </div>
        <div className="r-right">
          {photo && <img src={photo} alt="" className="r-photo" />}
          {sectionOrder.filter(s => CREATIVE_RIGHT.includes(s)).map(s => renderRight(s))}
        </div>
      </div>
    </div>
  );
}

export default ResumeCreative;
