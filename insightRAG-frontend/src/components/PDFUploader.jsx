import { useState } from "react";
import { Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { uploadPDF } from "../services/api";

export default function PDFUploader({ onFileUpload }) {
  const [uploading, setUploading] = useState(false);
  const [results,   setResults]   = useState([]);

  const handleFileInput = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    setResults([]);

    const uploaded = [];

    for (const file of files) {
      try {
        await uploadPDF(file);
        uploaded.push(file.name);
        setResults((prev) => [...prev, { name: file.name, ok: true }]);
      } catch (err) {
        console.error("Upload failed:", file.name, err);
        setResults((prev) => [...prev, { name: file.name, ok: false }]);
      }
    }

    if (uploaded.length > 0) onFileUpload(uploaded);

    setUploading(false);
    e.target.value = "";
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <h2 className="text-lg font-semibold mb-4">Upload Documents</h2>

      <label className={`cursor-pointer ${uploading ? "pointer-events-none opacity-60" : ""}`}>
        <div className="border-2 border-dashed p-6 rounded-lg hover:bg-gray-50 transition">
          {uploading
            ? <Loader2 className="mx-auto mb-3 animate-spin text-blue-500" />
            : <Upload className="mx-auto mb-3 text-gray-400" />
          }
          <p className="text-sm font-medium text-gray-700">
            {uploading ? "Processing…" : "Drag & drop PDFs here"}
          </p>
          <p className="text-xs text-gray-400 mt-1">or click to browse</p>
        </div>

        <input
          type="file"
          multiple
          accept="application/pdf"
          className="hidden"
          onChange={handleFileInput}
          disabled={uploading}
        />
      </label>

      {results.length > 0 && (
        <div className="mt-3 space-y-1 text-left">
          {results.map((r, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              {r.ok
                ? <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                : <AlertCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
              }
              <span className={r.ok ? "text-green-700" : "text-red-500"}>{r.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
