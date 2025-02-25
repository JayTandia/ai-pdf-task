"use client";

// pages/index.js (Main Component)
import { useState } from "react";
import axios from "axios";

export default function PDFUploader() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [summary, setSummary] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    // Send file to FastAPI backend
    const response = await axios.post(
      "http://localhost:8000/upload-pdf",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    // Use local URL for instant preview
    setPdfUrl(response.data.pdf_url);
    setSummary(response.data.summary);
    setQuestions(response.data.questions);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-14">
      <h1 className="text-4xl font-bold mb-8">AI PDF Summarizer</h1>

      <div className="flex gap-4 space-x-2">
        <div style={{ width: "50%" }}>
          <input
            className="border p-2 rounded-xl"
            type="file"
            accept="application/pdf"
            onChange={handleUpload}
          />
          {pdfUrl && (
            <iframe
              src={pdfUrl}
              width="100%"
              height="600px"
              style={{ border: "1px solid black", marginTop: "10px" }}
            ></iframe>
          )}
        </div>

        <div className="w-1/2 flex flex-col space-y-6">
          {summary ? (
            <div>
              <h2 className="font-bold text-lg">Summary</h2>
              <p className="border p-3 rounded-lg bg-gray-100">{summary}</p>
            </div>
          ) : (
            <p className="text-gray-500 text-center p-4">
              No summary available
            </p>
          )}
          
          {questions ? (
            <div>
              <h3 className="font-bold text-lg">Suggested Questions:</h3>
              <ul className="bg-gray-100 border p-3 rounded-lg list-inside">
                {questions.map((q, i) => (
                  <li className="mt-1" key={i}>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500 text-center p-4">
              No questions available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}