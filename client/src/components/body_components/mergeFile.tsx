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
  const [all, setAll] = useState(false);
  const [extracted, setExtracted] = useState<string | null>(null);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const togglePageSelection = (page: number) => {
    if (selectedPages.includes(page)) {
      setSelectedPages(selectedPages.filter((p: number) => p !== page));
    } else {
      setSelectedPages([...selectedPages, page]);
    }
  };

  const handleMerge = async () => {
    const formData = new FormData();
    formData.append("pdfFile", file);
    formData.append(
      "selectedPages",
      JSON.stringify(selectedPages.sort((a: number, b: number) => a - b))
    );

    await mergePDF(formData).then((res) => {
      console.log(res?.data);
      const blob = new Blob([res?.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
       window.URL.revokeObjectURL(url);
      // console.log(URL.createObjectURL(blob));
      setExtracted(url);
      // console.log(res);
    }).catch((err:any) => {
      console.log(err)
    })
  };

  const handleSelectAll = () => {
    if (all) {
      setAll(false);
    } else {
      setAll(true);
      setSelectedPages((prevSelectedPages) => {
        const newSelectedPages = [];
        for (let i = 1; i <= numPages; i++) {
          if (!prevSelectedPages.includes(i)) {
            newSelectedPages.push(i);
          }
        }
        return [...prevSelectedPages, ...newSelectedPages];
      });
    }
  };

  const handleSelectPages = () => {
    setAll(false);
    setSelectedPages([]);
  };
  return (
    <>
      <div className="w-full h-full flex  ">
        <div className="md:w-9/12 w-full px-2 xl:px-16 bg-slate-200 pt-16 min-h-screen">
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
                <Page
                  className="border-2 flex justify-center"
                  pageNumber={index + 1}
                  width={160}
                />
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
        <div className="md:w-3/12 hidden md:flex flex-col justify-center top-5 sticky  max-h-[640px] ">
          <div className="flex flex-col  px-3 ">
            {extracted && (
              <>
                <div>
                  <h3>Extracted PDF</h3>
                  <iframe
                    title="Extracted PDF"
                    src={extracted}
                    width="100%"
                    height="400px"
                  />
                </div>
                <div>
                  <h3>Extracted PDF</h3>
                  <a href={extracted} download="extracted.pdf">
                    Download Extracted PDF
                  </a>
                </div>
              </>
            )}
            <h3 className="text-3xl text-center mt-5 mb-10 ">Extract pages</h3>
            <div className="flex w-full flex-wrap justify-center xl:justify-between px-5 mb-5">
              {!all ? (
                <button
                  onClick={handleSelectAll}
                  className="bg-green-400 text-white  xl:mb-0 rounded-lg px-3 py-2"
                >
                  Select all pages
                </button>
              ) : (
                <button
                  onClick={handleSelectPages}
                  className="bg-orange-500 text-white rounded-lg px-3 py-2"
                >
                  Select pages
                </button>
              )}
            </div>

            <label htmlFor="toExtract">
              Pages to Extract:{all ? numPages : selectedPages.length}
            </label>

            <input
              id="toExtract"
              className=" ps-2  border-2 border-black rounded-md"
              readOnly
              value={selectedPages
                .sort((a: number, b: number) => a - b)
                .join(", ")}
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
          <div className="flex w-full flex-wrap justify-center px-5 mb-5">
            {!all ? (
              <button
                onClick={handleSelectAll}
                className="bg-green-400 text-white  rounded-lg px-3 py-2"
              >
                Select all pages
              </button>
            ) : (
              <button
                onClick={handleSelectPages}
                className="bg-orange-500 text-white rounded-lg px-3 py-2"
              >
                Select pages
              </button>
            )}
          </div>

          <label htmlFor="toExtract">
            Pages to Extract: {all ? numPages : selectedPages.length}
          </label>

          <input
            id="toExtract"
            className=" ps-2 w-full border-2 border-black rounded-md"
            readOnly
            value={selectedPages
              .sort((a: number, b: number) => a - b)
              .join(", ")}
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

export default MergeFile;
