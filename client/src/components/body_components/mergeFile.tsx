//importing all the required libraries form react-pdf to display the PDF files
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// importing the hooks
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// importing the needful APIs
import { downloadExtractedPDF, getUploadedPDF, mergePDF } from "../../api/user";

//importing the Modal and Spinner components
import Modal from "../common_components/modal";
import Spinner from "../common_components/spinningWheel";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString(); // setting globalWorkerOptions

interface ChildProps {
  fileId: string;
} // interface for MergeFile component

const MergeFile: React.FC<ChildProps> = ({ fileId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [all, setAll] = useState(false);
  const [extractedFileId, setExtractedFileId] = useState('')
  const [open, setOpen] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const[err,setError]= useState('')

  useEffect(() => {
    getFile();
  }, []);

// function for fetching uploaded PDF file
  const getFile = async () => {
    const fileData = await getUploadedPDF(fileId); //fetching file bufferData
    const pdfArrayBuffer = fileData;
    const uint8Array = new Uint8Array(pdfArrayBuffer); // converting buffer data to Uint8Array

    // Create the Blob
    const blob = new Blob([uint8Array], { type: "application/pdf" });
    const fileObject = new File([blob], "lastAdded.pdf", {
      type: "application/pdf",
    }); // Create a File from the Blob
    setFile(fileObject);
  };



 const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
   setNumPages(numPages);  // setting total numbers of the PDF file founded by Document of the react-pdf
 };

  //function for toggle the selection for each pages
  const togglePageSelection = (page: number) => {
    if (selectedPages.includes(page)) {
      setSelectedPages(selectedPages.filter((p: number) => p !== page));
    } else {
      setSelectedPages([...selectedPages, page]);
    }
  };

  //function for calling the mergeAPI
  const handleMerge = async () => {
    setIsLoading(true)
    const bodyData = {
      selectedPages: selectedPages.sort((a: number, b: number) => a - b),// setting the selectedPage array as sorted
      fileId,
    };

    const data = await mergePDF(bodyData); //calling the merge API

    setTimeout(() => {
      setIsLoading(false)
    }, 1000) //settimeout function for unmount the spinning component
    
    //checking response status
    if (data.ok) {
      setExtractedFileId(data.fileId) //collecting the fileId of the extractedPDF
      setOpen(true)
    } else {
      setError(data.message)
    }
  };
  const handleModalClose = () => {
    setOpen(false)
  }

  const handleFileDownload = async() => {
    await downloadExtractedPDF(extractedFileId) // calling the API for downloading the PDF file
  }


  //function for select all pages of the PDF file
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

  // function for unselect all the pages
  const handleSelectPages = () => {
    setAll(false);
    setSelectedPages([]);
  };

  if (isLoading) {
   return <Spinner/>
  } else {
    return (
      <>
        <div className="w-full h-full flex  ">
          <div className="md:w-9/12 w-full px-2 xl:px-16 bg-slate-200 pt-16 min-h-screen">
            {file && (
              <Document
                file={file} // attaching the file object
                onLoadSuccess={handleDocumentLoadSuccess}
                className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-12"
              >
                {Array.from(
                  new Array(numPages),
                  (
                    el,
                    index //looping every pages
                  ) => (
                    <div
                      className="relative rounded-lg shadow-md p-2 md:p-5 bg-white"
                      key={index}
                    >
                      <p className="hidden">{el}</p>
                      <Page
                        className="border-2 flex justify-center "
                        pageNumber={index + 1}
                        width={150}
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
                  )
                )}
              </Document>
            )}
          </div>

          {/* div for displaying extraction handling panel on md */}
          <div className="md:w-3/12 hidden md:flex flex-col justify-center top-5 sticky  max-h-[640px] ">
            <div className="flex flex-col  px-3 ">
              <h3 className="text-3xl text-center mt-5 mb-10 ">
                Extract pages
              </h3>
              {err && <p className="text-red-500 my-2 px-10 w-full">{err}</p>}
              <div className="flex w-full  justify-center px-5 mb-5">
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

        {/* div for displaying extraction handling panel on sm only */}
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

        {/* modal to show the download ready message after extracting the PDF  */}
        <Modal isOpen={open} onClose={handleModalClose}>
          <div className="p-4">
            <h2 className="text-2xl text-green-500 text-center font-bold mb-4">
              Successfully extracted file....!
            </h2>
            <p className="text-center mb-2">
              Check{" "}
              <NavLink className="text-blue-500" to={"/my-files"}>
                My files
              </NavLink>{" "}
              section for more info..
            </p>
            <p className="text-center">
              Click{" "}
              <span
                onClick={handleFileDownload}
                className="text-blue-500 cursor-pointer"
              >
                here
              </span>{" "}
              to download
            </p>
          </div>
        </Modal>
      </>
    );
  }
};

export default MergeFile;
