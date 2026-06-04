// src/components/builder/PersonalForm.js
import React from "react";

export function PersonalForm({ data, onChange }) {
  const f = key => ({
    value: data[key] || "",
    onChange: e => onChange({ ...data, [key]: e.target.value })
  });

  return (
    <div className="form-section">
      <div className="form-section-title"><span className="icon">①</span> Personal Info</div>
      <div className="form-grid">
        <div><label>Full Name</label><input {...f("name")} placeholder="Jordan Rivera" /></div>
        <div><label>Job Title</label><input {...f("title")} placeholder="Software Engineer" /></div>
        <div className="form-grid form-grid-2">
          <div><label>Email</label><input {...f("email")} placeholder="you@email.com" /></div>
          <div><label>Phone</label><input {...f("phone")} placeholder="+1 (555) …" /></div>
        </div>
        <div><label>Address</label><input {...f("address")} placeholder="City, State" /></div>
        <div className="form-grid form-grid-2">
          <div><label>LinkedIn</label><input {...f("linkedin")} placeholder="linkedin.com/in/…" /></div>
          <div><label>GitHub</label><input {...f("github")} placeholder="github.com/…" /></div>
        </div>
      </div>
    </div>
  );
}

export default PersonalForm;
