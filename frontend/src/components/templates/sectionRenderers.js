// src/components/templates/sectionRenderers.js
import React from "react";
import { parseDesc } from "../../utils/helpers";

export function renderSummarySection(data, label = "About") {
  if (!data.summary) return null;
  return (
    <div key="summary">
      <div className="r-section-title">{label}</div>
      <div className="r-summary">{data.summary}</div>
    </div>
  );
}

export function renderExperienceSection(data) {
  if (!data.experience.length) return null;
  return (
    <div key="experience">
      <div className="r-section-title">Experience</div>
      {data.experience.map(e => (
        <div key={e.id} className="r-entry">
          <div className="r-entry-title">{e.role}</div>
          <div className="r-entry-sub">{e.company}</div>
          <div className="r-entry-date">{e.from}{e.to ? ` – ${e.to}` : ""}</div>
          <div className="r-entry-desc">{parseDesc(e.desc)}</div>
        </div>
      ))}
    </div>
  );
}

export function renderExperienceSectionPro(data) {
  if (!data.experience.length) return null;
  return (
    <div key="experience">
      <div className="r-section-title">Experience</div>
      {data.experience.map(e => (
        <div key={e.id} className="r-entry">
          <div className="r-entry-header">
            <div>
              <div className="r-entry-title">{e.role}</div>
              <div className="r-entry-sub">{e.company}</div>
            </div>
            <div className="r-entry-date">{e.from}{e.to ? ` – ${e.to}` : ""}</div>
          </div>
          <div className="r-entry-desc">{parseDesc(e.desc)}</div>
        </div>
      ))}
    </div>
  );
}

export function renderEducationSection(data) {
  if (!data.education.length) return null;
  return (
    <div key="education">
      <div className="r-section-title">Education</div>
      {data.education.map(e => (
        <div key={e.id} className="r-entry">
          <div className="r-entry-title" style={{ fontSize: 13 }}>{e.school}</div>
          <div className="r-entry-sub">{e.degree}</div>
          <div className="r-entry-date">{e.year}{e.gpa ? ` · GPA ${e.gpa}` : ""}</div>
        </div>
      ))}
    </div>
  );
}

export function renderEducationSectionPro(data) {
  if (!data.education.length) return null;
  return (
    <div key="education">
      <div className="r-section-title">Education</div>
      {data.education.map(e => (
        <div key={e.id} className="r-entry">
          <div className="r-entry-header">
            <div>
              <div className="r-entry-title">{e.degree}</div>
              <div className="r-entry-sub">{e.school}</div>
            </div>
            <div className="r-entry-date">{e.year}{e.gpa ? ` · GPA ${e.gpa}` : ""}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function renderEducationSectionMinimal(data) {
  if (!data.education.length) return null;
  return (
    <div key="education">
      <div className="r-section-title">Education</div>
      {data.education.map(e => (
        <div key={e.id} className="r-entry">
          <div className="r-entry-meta">{e.year}</div>
          <div>
            <div className="r-entry-title">{e.degree}</div>
            <div className="r-entry-sub">{e.school}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function renderProjectsSection(data) {
  if (!data.projects.length) return null;
  return (
    <div key="projects">
      <div className="r-section-title">Projects</div>
      {data.projects.map(p => (
        <div key={p.id} className="r-entry">
          <div className="r-entry-title">{p.name}</div>
          {p.tech && <div className="r-entry-sub">{p.tech}</div>}
          <div className="r-entry-desc">{p.desc}</div>
          {p.link && <div className="r-chip" style={{ marginTop: 4, fontSize: 10 }}>{p.link}</div>}
        </div>
      ))}
    </div>
  );
}

export function renderProjectsSectionPro(data) {
  if (!data.projects.length) return null;
  return (
    <div key="projects">
      <div className="r-section-title">Projects</div>
      {data.projects.map(p => (
        <div key={p.id} className="r-entry">
          <div className="r-entry-header">
            <div className="r-entry-title">{p.name}</div>
            {p.tech && <div style={{ fontSize: 12, color: "#888" }}>{p.tech}</div>}
          </div>
          <div className="r-entry-desc">{p.desc}</div>
        </div>
      ))}
    </div>
  );
}

export function renderProjectsSectionMinimal(data) {
  if (!data.projects.length) return null;
  return (
    <div key="projects">
      <div className="r-section-title">Projects</div>
      {data.projects.map(p => (
        <div key={p.id} className="r-entry">
          <div className="r-entry-meta" style={{ fontSize: 10 }}>{p.tech || ""}</div>
          <div>
            <div className="r-entry-title">{p.name}</div>
            <div className="r-entry-desc">{p.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function renderCertificationsSection(data) {
  if (!data.certifications.length) return null;
  return (
    <div key="certifications">
      <div className="r-section-title">Certifications</div>
      {data.certifications.map(c => (
        <div key={c.id} className="r-entry">
          <div className="r-entry-title" style={{ fontSize: 12 }}>{c.name}</div>
          <div className="r-entry-sub">{c.issuer} · {c.year}</div>
        </div>
      ))}
    </div>
  );
}

export function renderCertificationsSectionPro(data) {
  if (!data.certifications.length) return null;
  return (
    <div key="certifications">
      <div className="r-section-title">Certifications</div>
      {data.certifications.map(c => (
        <div key={c.id} className="r-entry">
          <div className="r-entry-header">
            <div className="r-entry-title">{c.name}</div>
            <div className="r-entry-date">{c.year}</div>
          </div>
          <div style={{ fontSize: 12, color: "#888" }}>{c.issuer}</div>
        </div>
      ))}
    </div>
  );
}

export function renderAchievementsSection(data) {
  if (!data.achievements.length) return null;
  return (
    <div key="achievements">
      <div className="r-section-title">Achievements</div>
      {data.achievements.map((a, i) => (
        <div key={i} className="r-entry-sub" style={{ marginBottom: 4, fontSize: 12 }}>✓ {a}</div>
      ))}
    </div>
  );
}

export function renderLanguagesSection(data) {
  if (!data.languages.length) return null;
  return (
    <div key="languages">
      <div className="r-section-title">Languages</div>
      {data.languages.map((l, i) => (
        <div key={i} className="r-entry-sub" style={{ marginBottom: 4, fontSize: 12 }}>{l}</div>
      ))}
    </div>
  );
}

const sectionRenderers = {
  renderSummarySection,
  renderExperienceSection,
  renderExperienceSectionPro,
  renderEducationSection,
  renderEducationSectionPro,
  renderEducationSectionMinimal,
  renderProjectsSection,
  renderProjectsSectionPro,
  renderProjectsSectionMinimal,
  renderCertificationsSection,
  renderCertificationsSectionPro,
  renderAchievementsSection,
  renderLanguagesSection,
};

export default sectionRenderers;
