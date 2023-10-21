import { useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

type FileState = File | null;
const SplitPDF: React.FC = () => {
  const [file, setFile] = useState<FileState>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        setError("upload valid file");
        setTimeout(() => {
          setError("");
        }, 4000);
      }
    }
  };
  const handleFileInputChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <>
      {file ? (
        <MergeFile file={file} />
      ) : (
        <div className="flex flex-col w-full items-center">
          <h2 className="text-center  text-3xl font-semibold md:font-bold md:text-5xl ">
            Split PDF Files
          </h2>
          <h1 className="text-xl md:text-2xl text-center mt-8 w-[330px] md:w-[600px]">
            Separate one page or a whole set for easy conversion into
            independent PDF files.
          </h1>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => handleFileUpload(e)}
            accept=".pdf"
            className="mt-3"
          />
          <button
            className="mt-8 w-40 h-10 bg-green-500 rounded-lg text-xl font-semibold text-white"
            onClick={handleFileInputChange}
          >
            Select file
          </button>
          {error && <p className="text-red-600">{error}</p>}
        </div>
      )}
    </>
  );
};

export default SplitPDF;

interface ChildProps {
  file: File;
}

const MergeFile: React.FC<ChildProps> = ({ file }) => {
  const [numPages, setNumPages] = useState(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  // Set the workerSrc to the worker script from pdfjs-dist
//   pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const togglePageSelection = (page: number) => {
    if (selectedPages.includes(page)) {
      setSelectedPages(selectedPages.filter((p) => p !== page));
    } else {
      setSelectedPages([...selectedPages, page]);
    }
  };
  console.log(file);
  return (
    <>
      <div className="w-full h-full flex ">
        <div className="md:w-3/4 w-full">
          <Document
            file={file} // Replace with your PDF file URL
                      onLoadSuccess={handleDocumentLoadSuccess}
                      className="flex flex-wrap gap-5"
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div className="relative rounded-lg shadow-md p-5 bg-slate-200" key={index}>
                <Page className='border-2' pageNumber={index + 1} width={200} />
                <label>
                  Page {index + 1}
                  <input
                    type="checkbox"
                    checked={selectedPages.includes(index + 1)}
                            onChange={() => togglePageSelection(index + 1)}
                            className="w-8 h-8 absolute top-2 right-2 z-10 rounded-full"
                  />
                </label>
              </div>
            ))}
          </Document>
        </div>
        <div className="md:w-1/4 hidden md:flex"></div>
      </div>
    </>
  );
};
