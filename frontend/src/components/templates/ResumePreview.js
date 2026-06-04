// src/components/templates/ResumePreview.js
import React from "react";
import ResumeModern from "./ResumeModern";
import ResumeProfessional from "./ResumeProfessional";
import ResumeMinimal from "./ResumeMinimal";
import ResumeCreative from "./ResumeCreative";
import { TEMPLATE_COLORS } from "../../constants";

export function ResumePreview({ data, template, sectionOrder, previewRef }) {
  const C = {
    modern: ResumeModern,
    professional: ResumeProfessional,
    minimal: ResumeMinimal,
    creative: ResumeCreative
  }[template] || ResumeModern;
  
  const accent = data.accentColor || TEMPLATE_COLORS[template] || "#2a6bc8";

  const getLightAccent = (hex) => {
    let h = hex.replace("#", "");
    if (h.length === 3) h = h.split("").map(c => c + c).join("");
    const r = parseInt(h.slice(0, 2), 16) || 42;
    const g = parseInt(h.slice(2, 4), 16) || 107;
    const b = parseInt(h.slice(4, 6), 16) || 200;
    return `rgba(${r}, ${g}, ${b}, 0.08)`;
  };

  const getBorderAccent = (hex) => {
    let h = hex.replace("#", "");
    if (h.length === 3) h = h.split("").map(c => c + c).join("");
    const r = parseInt(h.slice(0, 2), 16) || 42;
    const g = parseInt(h.slice(2, 4), 16) || 107;
    const b = parseInt(h.slice(4, 6), 16) || 200;
    return `rgba(${r}, ${g}, ${b}, 0.22)`;
  };

  const getCreativeSecondary = (hex) => {
    return "#1b4d8e";
  };

  const style = {
    "--resume-accent": accent,
    "--resume-accent-light": getLightAccent(accent),
    "--resume-accent-border": getBorderAccent(accent),
    "--resume-accent-secondary": getCreativeSecondary(accent),
  };

  return (
    <div ref={previewRef} id="resume-preview" style={style}>
      <C data={data} sectionOrder={sectionOrder} />
    </div>
  );
}

export default ResumePreview;
