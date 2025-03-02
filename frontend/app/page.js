"use client";

import { useState } from "react";
import axios from "axios";
import PDFViewer from "./component/PDFViewer";

export default function PDFUploader() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [summary, setSummary] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedText, setSelectedText] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "http://localhost:8000/upload-pdf",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );


    setPdfUrl(response.data.pdf_url);
    console.log(pdfUrl)
    setSummary(response.data.summary);
    setQuestions(response.data.questions);
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
          {/* {pdfUrl && ( */}
            <PDFViewer setSelectedText={setSelectedText} pdfUrl={pdfUrl} />
          {/* )} */}
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