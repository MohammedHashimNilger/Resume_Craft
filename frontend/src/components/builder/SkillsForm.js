// src/components/builder/SkillsForm.js
import React, { useState } from "react";

export function SkillsForm({ skills, onChange }) {
  const [input, setInput] = useState("");
  const add = () => {
    const s = input.trim();
    if (s && !skills.includes(s)) {
      onChange([...skills, s]);
      setInput("");
    }
  };

  return (
    <div className="form-section">
      <div className="form-section-title"><span className="icon">③</span> Skills</div>
      <div className="tag-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && add()}
          placeholder="Type a skill + Enter"
        />
        <button className="btn btn-primary btn-sm" onClick={add}>Add</button>
      </div>
      <div className="skill-tags">
        {skills.map((s, i) => (
          <span key={i} className="skill-tag">
            {s}
            <button onClick={() => onChange(skills.filter((_, j) => j !== i))}>×</button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillsForm;
