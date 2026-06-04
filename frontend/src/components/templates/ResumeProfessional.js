// src/components/templates/ResumeProfessional.js
import React from "react";
import {
  renderSummarySection,
  renderExperienceSectionPro,
  renderEducationSectionPro,
  renderProjectsSectionPro,
  renderCertificationsSectionPro,
} from "./sectionRenderers";

export function ResumeProfessional({ data, sectionOrder }) {
  const { personal, skills, photo } = data;

  const renderSection = (key) => {
    if (key === "summary")        return renderSummarySection(data, "Professional Summary");
    if (key === "experience")     return renderExperienceSectionPro(data);
    if (key === "education")      return renderEducationSectionPro(data);
    if (key === "projects")       return renderProjectsSectionPro(data);
    if (key === "certifications") return renderCertificationsSectionPro(data);
    if (key === "achievements")   return data.achievements.length > 0 ? (
      <div key="achievements">
        <div className="r-section-title">Achievements</div>
        {data.achievements.map((a, i) => (
          <div key={i} style={{ fontSize: 12.5, color: "#555", marginBottom: 4 }}>• {a}</div>
        ))}
      </div>
    ) : null;
    if (key === "languages") return data.languages.length > 0 ? (
      <div key="languages">
        <div className="r-section-title">Languages</div>
        {data.languages.map((l, i) => (
          <div key={i} style={{ fontSize: 12.5, color: "#555", marginBottom: 4 }}>• {l}</div>
        ))}
      </div>
    ) : null;
    return null;
  };

  return (
    <div className="resume professional">
      <div className="r-header">
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          {photo && <img src={photo} alt="" className="r-photo" />}
          <div>
            <div className="r-name">{personal.name || "Your Name"}</div>
            {personal.title && <div className="r-title">{personal.title}</div>}
          </div>
        </div>
        <div className="r-contact">
          {personal.email    && <div>{personal.email}</div>}
          {personal.phone    && <div>{personal.phone}</div>}
          {personal.address  && <div>{personal.address}</div>}
          {personal.linkedin && <div>in {personal.linkedin}</div>}
          {personal.github   && <div>⌥ {personal.github}</div>}
        </div>
      </div>
      <div className="r-body">
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
    </div>
  );
}

export default ResumeProfessional;
