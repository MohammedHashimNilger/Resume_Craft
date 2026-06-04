// src/constants/index.js

export const TEMPLATES = [
  { id: "modern",       label: "Modern",       accent: "#c8622a", bg: "#1a1a1a" },
  { id: "professional", label: "Professional", accent: "#2a6bc8", bg: "#1a1a2e" },
  { id: "minimal",      label: "Minimal",      accent: "#222",    bg: "#f5f5f5" },
  { id: "creative",     label: "Creative",     accent: "#2d1b69", bg: "#2d1b69" },
];

export const DEFAULT_RESUME = {
  personal: { name: "", title: "", email: "", phone: "", address: "", linkedin: "", github: "" },
  summary: "",
  skills: [],
  education: [],
  experience: [],
  projects: [],
  certifications: [],
  achievements: [],
  languages: [],
  photo: null,
  accentColor: "",
};

export const SECTION_ORDER_DEFAULT = [
  "summary",
  "experience",
  "education",
  "projects",
  "certifications",
  "achievements",
  "languages"
];

export const TEMPLATE_COLORS = {
  modern: "#c8622a",
  professional: "#2a6bc8",
  minimal: "#222222",
  creative: "#2d1b69",
};

export const MODERN_LEFT = ["skills", "education", "certifications", "languages", "achievements"];
export const MODERN_RIGHT = ["summary", "experience", "projects"];

export const CREATIVE_LEFT = ["summary", "experience", "projects"];
export const CREATIVE_RIGHT = ["skills", "education", "certifications", "languages", "achievements"];
