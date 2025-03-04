import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";


// Set the correct worker path (relative to public folder)
pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.js";


const PDFViewer = ({setSelectedText, pdfUrl}) => {
  const [numPages, setNumPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const onDocumentLoadError = (error) => {
    console.error("Error loading PDF:", error);
    setIsLoading(false);
  };

  const [tempSelection, setTempSelection] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const handleSelection = () => {
    const selection = window.getSelection();
    const text = selection.toString();
    
    if (text) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      setTempSelection(text);
      setButtonPosition({
        x: rect.x + rect.width / 2,
        y: rect.y + window.scrollY - 30
      });
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleSetSelection = () => {
    setSelectedText(tempSelection);
    setShowButton(false);
  };

  
  return (
      
      <div
      className="pdf-container"
      onMouseUp={handleSelection}
      style={{
        width: "100%",
        height: "600px",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "10px",
        position: "relative"
      }}
    >
      {showButton && (
        <button
          onClick={handleSetSelection}
          style={{
            position: 'absolute',
            left: `${buttonPosition.x}px`,
            top: `${buttonPosition.y}px`,
            transform: 'translateX(-50%)',
            backgroundColor: '#4299e1',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1000
          }}
        >
          Use Selection
        </button>
      )}
      
      {isLoading && (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      <Document 
        file={pdfUrl} 
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
      >
        {Array.from({ length: numPages }, (_, index) => (
          <Page
            key={index}
            pageNumber={index + 1}
            renderTextLayer={true} 
            renderAnnotationLayer={true}
            scale={1.2} // Slightly increase readability
          />
        ))}
      </Document>

      
    </div>
  );
};

export default PDFViewer;
