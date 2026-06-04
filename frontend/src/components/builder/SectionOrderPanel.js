// src/components/builder/SectionOrderPanel.js
import React, { useState } from "react";

export function SectionOrderPanel({ order, onChange }) {
  const [dragging, setDragging] = useState(null);
  const [over, setOver]         = useState(null);
  const labels = {
    summary: "📝 Summary",
    experience: "💼 Experience",
    education: "🎓 Education",
    projects: "🚀 Projects",
    certifications: "🏅 Certifications",
    achievements: "⭐ Achievements",
    languages: "🌐 Languages"
  };

  const onDrop = () => {
    if (dragging === null || over === null || dragging === over) {
      setDragging(null);
      setOver(null);
      return;
    }
    const next = [...order];
    const [item] = next.splice(dragging, 1);
    next.splice(over, 0, item);
    onChange(next);
    setDragging(null);
    setOver(null);
  };

  return (
    <div className="section-ordering">
      <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10 }}>Drag to reorder sections</div>
      {order.map((sec, i) => (
        <div
          key={sec}
          className={`drag-item ${dragging === i ? "dragging" : ""} ${over === i && dragging !== i ? "drag-over" : ""}`}
          draggable
          onDragStart={() => setDragging(i)}
          onDragOver={e => {
            e.preventDefault();
            setOver(i);
          }}
          onDrop={onDrop}
          onDragEnd={() => {
            setDragging(null);
            setOver(null);
          }}
        >
          <span className="drag-handle">⠿</span> {labels[sec] || sec}
        </div>
      ))}
    </div>
  );
}

export default SectionOrderPanel;
