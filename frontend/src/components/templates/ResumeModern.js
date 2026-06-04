// src/components/templates/ResumeModern.js
import React from "react";
import { MODERN_LEFT, MODERN_RIGHT } from "../../constants";
import {
  renderSummarySection,
  renderExperienceSection,
  renderEducationSection,
  renderProjectsSection,
  renderCertificationsSection,
  renderLanguagesSection,
  renderAchievementsSection,
} from "./sectionRenderers";

export function ResumeModern({ data, sectionOrder }) {
  const { personal, skills, photo } = data;

  const renderLeft = (key) => {
    if (key === "skills" && skills.length > 0) return (
      <div key="skills">
        <div className="r-section-title">Skills</div>
        {skills.map((s, i) => (
          <div key={i} className="r-skill-bar">
            <div className="r-skill-name">{s}</div>
            <div className="r-skill-track">
              <div className="r-skill-fill" style={{ width: `${65 + (i * 7) % 35}%` }} />
            </div>
          </div>
        ))}
      </div>
    );
    if (key === "education")      return renderEducationSection(data);
    if (key === "certifications") return renderCertificationsSection(data);
    if (key === "languages")      return renderLanguagesSection(data);
    if (key === "achievements")   return renderAchievementsSection(data);
    return null;
  };

  const renderRight = (key) => {
    if (key === "summary")    return renderSummarySection(data, "About");
    if (key === "experience") return renderExperienceSection(data);
    if (key === "projects")   return renderProjectsSection(data);
    return null;
  };

  return (
    <div className="resume modern">
      <div className="r-header">
        <div>
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
      </div>
      <div className="r-body">
        <div className="r-left">
          {photo && <img src={photo} alt="" className="r-photo" />}
          {sectionOrder.filter(s => MODERN_LEFT.includes(s)).map(s => renderLeft(s))}
        </div>
        <div className="r-right">
          {sectionOrder.filter(s => MODERN_RIGHT.includes(s)).map(s => renderRight(s))}
        </div>
      </div>
    </div>
  );
}

export default ResumeModern;
