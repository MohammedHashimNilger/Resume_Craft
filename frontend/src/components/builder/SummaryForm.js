// src/components/builder/SummaryForm.js
import React from "react";

export function SummaryForm({ value, onChange }) {
  return (
    <div className="form-section">
      <div className="form-section-title"><span className="icon">②</span> Summary</div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Write a short professional summary…"
        style={{ minHeight: 100 }}
      />
    </div>
  );
}

export default SummaryForm;
