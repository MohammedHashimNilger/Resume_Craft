const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    userId:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    label:        { type: String, default: "Untitled Resume", trim: true },
    template:     { type: String, default: "modern" },
    sectionOrder: { type: [String], default: [] },
    data:         { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", ResumeSchema);
