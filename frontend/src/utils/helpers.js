// src/utils/helpers.js
import React from "react";

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export function parseDesc(desc) {
  if (!desc) return null;
  const lines = desc.split("\n").map(l => l.trim()).filter(Boolean);
  if (lines.length <= 1) {
    return <p style={{ fontSize: "inherit", lineHeight: "inherit" }}>{desc}</p>;
  }
  return (
    <ul>
      {lines.map((l, i) => (
        <li key={i}>{l.replace(/^[-•*]\s*/, "")}</li>
      ))}
    </ul>
  );
}

export function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
