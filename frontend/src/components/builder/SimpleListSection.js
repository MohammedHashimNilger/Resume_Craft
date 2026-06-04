// src/components/builder/SimpleListSection.js
import React, { useState } from "react";

export function SimpleListSection({ title, icon, items, onChange, placeholder }) {
  const [input, setInput] = useState("");
  const add = () => {
    const s = input.trim();
    if (s) {
      onChange([...items, s]);
      setInput("");
    }
  };

  return (
    <div className="form-section">
      <div className="form-section-title"><span className="icon">{icon}</span> {title}</div>
      <div className="tag-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && add()}
          placeholder={placeholder}
        />
        <button className="btn btn-primary btn-sm" onClick={add}>Add</button>
      </div>
      <div className="skill-tags">
        {items.map((s, i) => (
          <span key={i} className="skill-tag">
            {s}
            <button onClick={() => onChange(items.filter((_, j) => j !== i))}>×</button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default SimpleListSection;
