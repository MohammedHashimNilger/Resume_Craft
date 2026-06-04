// src/components/dashboard/DashboardCard.js
import React from "react";
import { timeAgo } from "../../utils/helpers";

export function DashboardCard({
  resume,
  renamingId,
  renameVal,
  setRenameVal,
  setRenaming,
  handleRename,
  handleDuplicate,
  handleDelete,
  onOpen
}) {
  const r = resume;

  return (
    <div className="dash-card">
      <div className="dash-card-icon">📄</div>
      <div className="dash-card-body">
        {renamingId === r._id ? (
          <div className="rename-row">
            <input
              className="rename-input"
              value={renameVal}
              onChange={e => setRenameVal(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") handleRename(r._id);
                if (e.key === "Escape") setRenaming(null);
              }}
              autoFocus
            />
            <button className="btn btn-primary btn-sm" onClick={() => handleRename(r._id)}>Save</button>
            <button className="btn btn-ghost btn-sm"   onClick={() => setRenaming(null)}>✕</button>
          </div>
        ) : (
          <div className="dash-card-label">{r.label}</div>
        )}
        <div className="dash-card-meta">
          <span className="dash-chip">{r.template || "modern"}</span>
          <span className="dash-card-time">saved {timeAgo(r.updatedAt)}</span>
        </div>
      </div>
      <div className="dash-card-actions">
        <button className="btn btn-primary btn-sm"  onClick={() => onOpen(r._id)}>Open</button>
        <button className="btn btn-ghost btn-sm"    onClick={() => { setRenaming(r._id); setRenameVal(r.label); }}>Rename</button>
        <button className="btn btn-ghost btn-sm"    onClick={() => handleDuplicate(r)}>Duplicate</button>
        <button className="btn btn-ghost btn-sm"    style={{ color: "#c0392b" }} onClick={() => handleDelete(r._id)}>Delete</button>
      </div>
    </div>
  );
}

export default DashboardCard;
