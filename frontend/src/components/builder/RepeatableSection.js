// src/components/builder/RepeatableSection.js
import React from "react";
import { uid } from "../../utils/helpers";

export function RepeatableSection({ title, icon, items, onChange, renderFields }) {
  const add    = () => onChange([...items, { id: uid() }]);
  const update = (id, u) => onChange(items.map(it => it.id === id ? { ...it, ...u } : it));
  const remove = (id)   => onChange(items.filter(it => it.id !== id));
  const move   = (id, dir) => {
    const idx  = items.findIndex(it => it.id === id);
    const next = [...items];
    const [item] = next.splice(idx, 1);
    next.splice(Math.max(0, Math.min(items.length - 1, idx + dir)), 0, item);
    onChange(next);
  };

  return (
    <div className="form-section">
      <div className="form-section-title" style={{ justifyContent: "space-between" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="icon">{icon}</span> {title}
        </span>
        <button className="btn btn-primary btn-sm" onClick={add}>+ Add</button>
      </div>
      {items.length === 0 && (
        <div style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", padding: "12px 0" }}>
          No entries yet. Click Add.
        </div>
      )}
      {items.map((item, idx) => (
        <div key={item.id} className="entry-card">
          <div className="entry-header">
            <span className="entry-title">{renderFields.getLabel(item) || `Entry ${idx + 1}`}</span>
            <div className="entry-actions">
              {idx > 0              && <button className="btn btn-ghost btn-sm" onClick={() => move(item.id, -1)}>↑</button>}
              {idx < items.length - 1 && <button className="btn btn-ghost btn-sm" onClick={() => move(item.id, 1)}>↓</button>}
              <button className="btn btn-ghost btn-sm" style={{ color: "#c0392b" }} onClick={() => remove(item.id)}>×</button>
            </div>
          </div>
          {renderFields.render(item, u => update(item.id, u))}
        </div>
      ))}
    </div>
  );
}

export default RepeatableSection;
