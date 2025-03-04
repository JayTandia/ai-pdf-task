"use client";

import { useState } from "react";
import axios from "axios";
import PDFViewer from "./component/PDFViewer";
import PDFViewer2 from "./component/PDFViewer2";
import PDFViewer3 from "./component/PDFViewer3";


export default function PDFUploader() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [summary, setSummary] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedText, setSelectedText] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPdfUrl(null);
      setSummary("");
      setQuestions([]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:8000/upload-pdf",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setPdfUrl(response.data.pdf_url);
      setSummary(response.data.summary);
      setQuestions(response.data.questions);
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("Error uploading PDF. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSendMessage = async () => {
    const response = await axios.post("http://localhost:8000/chat", {
      message: inputMessage,
      context: selectedText
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log(response.data.message)
    setMessages([...messages, { role: 'user', content: inputMessage }, { role: 'assistant', content: response.data.message }]);
    setInputMessage("");
  };
  

  return (
    <div className="flex flex-col w-full min-h-screen p-14">
      <h1 className="text-4xl text-center font-bold mb-8">AI PDF Summarizer</h1>

      <div className="flex gap-4 space-x-2">
        <div style={{ width: "50%" }}>
          <div className="flex gap-2 items-center mb-4">
            <input
              className="border p-2 rounded-xl"
              type="file"
              accept="application/pdf"
              onChange={handleFileSelect}
            />
            <button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className={`px-4 py-2 rounded-xl text-white ${
                !selectedFile || isUploading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isUploading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Uploading...
                </div>
              ) : (
                'Upload PDF'
              )}
            </button>
          </div>

          {isUploading && (
            <div className="flex items-center justify-center h-[600px] border rounded-lg bg-gray-50">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Processing your PDF...</p>
              </div>
            </div>
          )}

          {!isUploading && pdfUrl && (
            <PDFViewer setSelectedText={setSelectedText} pdfUrl={pdfUrl} />
          )}

          {/* Second method: Using iframe directly */}
          {/* {pdfUrl && (
            <iframe
              src={pdfUrl}
              width="100%"
              height="600px"
              style={{ border: "1px solid black", marginTop: "10px" }}
            ></iframe>
          )} */}

          {/* Third method: Using PDF.js */}
          {/* {pdfUrl && <PDFViewer2 pdfUrl={pdfUrl} setSelectedText={setSelectedText} />} */}

          {/* Fourth method: Using pdfjs-dist */}
          {/* {pdfUrl && <PDFViewer3 pdfUrl={pdfUrl} setSelectedText={setSelectedText} /> } */}
        </div>

        <div className="w-1/2 flex flex-col space-y-6">

          <div className="border rounded-lg p-4 bg-white shadow">
            <h2 className="font-bold text-lg mb-4">Chat with AI</h2>
            <div className="h-[200px] overflow-y-auto mb-4 p-3 bg-gray-50 rounded">
              {messages.map((message, index) => (
                <div 
                  key={index}
                  className={`mb-3 ${
                    message.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            {selectedText && (
              <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
                <p className="text-sm text-gray-600 font-medium mb-1">Selected Context:</p>
                <p className="text-gray-800">{selectedText}</p>
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ask a question about the PDF..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
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