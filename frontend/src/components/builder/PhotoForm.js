// src/components/builder/PhotoForm.js
import React from "react";

export function PhotoForm({ photo, onChange }) {
  const handleFile = e => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1.5 * 1024 * 1024) {
      alert("Image is too large! Please choose an image smaller than 1.5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => onChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="form-section">
      <div className="form-section-title"><span className="icon">📷</span> Photo (optional)</div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {photo && (
          <img
            src={photo}
            alt=""
            style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--accent)" }}
          />
        )}
        <input type="file" accept="image/*" onChange={handleFile} style={{ fontSize: 12 }} />
        {photo && <button className="btn btn-ghost btn-sm" onClick={() => onChange(null)}>Remove</button>}
      </div>
    </div>
  );
}

export default PhotoForm;
