/* import React from 'react';
import { PDFViewer } from '@react-pdf-viewer/core';
import { Document, Page } from '@react-pdf-viewer/document';
import { Viewer } from '@react-pdf-viewer/viewer';



const PDFViewer3 = ({ pdfUrl }) => {

    const [selectedText, setSelectedText] = useState('');

    const handleSelectionChange = (event) => {
    setSelectedText(event.selection.text);
    };
    
  return (
    <PDFViewer>
      <Document file={pdfUrl} onSelectionChange={handleSelectionChange} />
    </PDFViewer>
  );
};

export default PDFViewer3; */