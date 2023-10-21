import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { mergePDF } from "../../api/user";
import { useState } from "react";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

interface ChildProps {
  file: File;
}

const MergeFile: React.FC<ChildProps> = ({ file }) => {
  const [numPages, setNumPages] = useState(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const togglePageSelection = (page: number) => {
    if (selectedPages.includes(page)) {
      setSelectedPages(selectedPages.filter((p:number) => p !== page));
    } else {
      setSelectedPages([...selectedPages, page]);
    }
  };
  const handleMerge = async () => {
    const res = await mergePDF("thara");
    console.log(res);
  };
  return (
    <>
      <div className="w-full h-full flex  ">
        <div className="md:w-3/4 w-full px-2 pt-3 xl:px-16 bg-slate-200 pt-5 min-h-screen">
          <Document
            file={file} // Replace with your PDF file URL
            onLoadSuccess={handleDocumentLoadSuccess}
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-16"
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div
                className="relative rounded-lg shadow-md p-2 md:p-5 bg-white"
                key={index}
              >
                <Page className="border-2 flex justify-center" pageNumber={index + 1} width={160} />
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
        <div className="md:w-1/4 hidden md:flex flex-col justify-center top-5 sticky  max-h-[640px] ">
          <div className="flex flex-col w-full px-3 ">
            <h3 className="text-3xl text-center mt-5 mb-10 ">Extract pages</h3>

            <label htmlFor="toExtract">Pages to Extract:</label>
            <input
              id="toExtract"
              className=" ps-2 w-full border-2 border-black rounded-md"
              readOnly
              value={selectedPages.sort((a:number, b:number) => a - b).join(", ")}
            />
            <button
              onClick={handleMerge}
              className="self-center mt-10 w-auto h-auto px-3 py-2 rounded-lg bg-green-400 text-white font-semibold"
            >
              Let's merge
            </button>
          </div>
        </div>
      </div>
      <div className="md:hidden sticky bottom-0 z-30 flex  w-[100%] bg-white pb-2">
        <div className="flex flex-col w-full px-4 ">
          <h3 className="text-3xl text-center mt-5 mb-10 ">Extract pages</h3>

          <label htmlFor="toExtract">Pages to Extract:</label>
          <input
            id="toExtract"
            className=" ps-2 w-full border-2 border-black rounded-md"
            readOnly
            value={selectedPages.sort((a:number, b:number) => a - b).join(", ")}
          />
          <button
            onClick={handleMerge}
            className="self-center mt-10 w-auto h-auto px-3 py-2 rounded-lg bg-green-400 text-white font-semibold"
          >
            Let's merge
          </button>
        </div>
      </div>
    </>
  );
};


export default MergeFile
