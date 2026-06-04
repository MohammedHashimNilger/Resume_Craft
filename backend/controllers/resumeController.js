const Resume = require("../models/Resume");

// GET /resumes — list all resumes for current user (metadata only)
exports.listResumes = async (req, res) => {
  try {
    const resumes = await Resume
      .find({ userId: req.userId })
      .select("label template createdAt updatedAt")
      .sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (err) {
    console.error("GET /resumes:", err);
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
};

// GET /resumes/:id — load one full resume
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.userId });
    if (!resume) return res.status(404).json({ error: "Resume not found" });
    res.json(resume);
  } catch (err) {
    console.error("GET /resumes/:id:", err);
    res.status(500).json({ error: "Failed to load resume" });
  }
};

// POST /resumes — create new resume
exports.createResume = async (req, res) => {
  const { label, data, template, sectionOrder } = req.body;
  if (!data) return res.status(400).json({ error: "Resume data is required" });

  try {
    const resume = await Resume.create({
      userId: req.userId,
      label:        label        || "Untitled Resume",
      data,
      template:     template     || "modern",
      sectionOrder: sectionOrder || [],
    });
    res.status(201).json(resume);
  } catch (err) {
    console.error("POST /resumes:", err);
    res.status(500).json({ error: "Failed to save resume" });
  }
};

// PUT /resumes/:id — overwrite existing resume
exports.updateResume = async (req, res) => {
  const { label, data, template, sectionOrder } = req.body;
  if (!data) return res.status(400).json({ error: "Resume data is required" });

  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { label: label || "Untitled Resume", data, template, sectionOrder },
      { new: true }
    );
    if (!resume) return res.status(404).json({ error: "Resume not found" });
    res.json(resume);
  } catch (err) {
    console.error("PUT /resumes/:id:", err);
    res.status(500).json({ error: "Failed to update resume" });
  }
};

// PATCH /resumes/:id/label — rename only
exports.renameResume = async (req, res) => {
  const { label } = req.body;
  if (!label?.trim()) return res.status(400).json({ error: "Label is required" });

  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { label: label.trim() },
      { new: true }
    );
    if (!resume) return res.status(404).json({ error: "Resume not found" });
    res.json(resume);
  } catch (err) {
    console.error("PATCH /resumes/:id/label:", err);
    res.status(500).json({ error: "Failed to rename resume" });
  }
};

// DELETE /resumes/:id
exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!resume) return res.status(404).json({ error: "Resume not found" });
    res.json({ message: "Resume deleted" });
  } catch (err) {
    console.error("DELETE /resumes/:id:", err);
    res.status(500).json({ error: "Failed to delete resume" });
  }
};
