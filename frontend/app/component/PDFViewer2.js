/* "use client";
import { useEffect, useRef, useState } from "react";
import MuPDF from "mupdf";


export default function PDFViewer2({ pdfUrl, setSelectedText }) {
  const canvasRef = useRef(null);
  const [mupdfInstance, setMupdfInstance] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);

  useEffect(() => {
    if (!pdfUrl) return;

    async function loadMuPDF() {
      const instance = await MuPDF.default();
      setMupdfInstance(instance);

      const pdf = instance.openDocument(pdfUrl);
      setPdfDoc(pdf);

      renderPage(pdf, 0);
    }

    loadMuPDF();
  }, [pdfUrl]);

  const renderPage = (pdf, pageNum) => {
    const page = pdf.loadPage(pageNum);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const pixmap = page.toPixmap(2); // 2x scale
    canvas.width = pixmap.width;
    canvas.height = pixmap.height;
    ctx.drawImage(pixmap.toCanvas(), 0, 0);
  };

  const handleTextSelection = () => {
    if (!pdfDoc) return;
    const selection = window.getSelection().toString();
    setSelectedText(selection);
  };

  return (
    <div>
      <canvas ref={canvasRef} onMouseUp={handleTextSelection} className="border" />
    </div>
  );
}
 */