import { Upload } from "lucide-react";

export default function PDFUploader({ onFileUpload }) {

  const handleFileInput = (e) => {

    const files = Array.from(e.target.files);

    if (!files.length) return;

    const fileNames = files.map(f => f.name);

    onFileUpload(fileNames);

  };

  return (

    <div className="bg-white p-8 rounded-xl shadow text-center">

      <h2 className="text-xl font-semibold mb-6">
        Upload Documents
      </h2>

      <label className="cursor-pointer">

        <div className="border-2 border-dashed p-10 rounded-lg">

          <Upload className="mx-auto mb-4"/>

          <p>Drag and drop your PDFs here</p>

          <p className="text-sm text-gray-500 mt-2">
            or click to browse files
          </p>

        </div>

        <input
          type="file"
          multiple
          accept="application/pdf"
          className="hidden"
          onChange={handleFileInput}
        />

      </label>

    </div>

  );

}