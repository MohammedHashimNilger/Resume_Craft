// src/components/builder/DownloadButtons.js
import React from "react";

export function DownloadButtons({ previewRef, data, onToast }) {
  const downloadPDF = () => {
    const el = previewRef.current;
    if (!el) return;
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.onload = () => {
      window.html2pdf().set({
        margin: 0,
        filename: `${data.personal.name || "resume"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      }).from(el).save();
      onToast("PDF downloading…");
    };
    document.head.appendChild(script);
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a    = document.createElement("a");
    a.href     = URL.createObjectURL(blob);
    a.download = "resume.json";
    a.click();
    onToast("JSON exported!");
  };

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <button className="btn btn-primary" onClick={downloadPDF}>⬇ PDF</button>
      <button className="btn btn-dark"    onClick={() => window.print()}>🖨 Print</button>
      <button className="btn btn-ghost"   onClick={downloadJSON}>JSON</button>
    </div>
  );
}

export default DownloadButtons;
