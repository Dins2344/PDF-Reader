//import the hooks 
import { useRef, useState } from "react";

//import the API
import { savePDF } from "../../api/user";

//import the components
import MergeFile from "./mergeFile";
import Spinner from "../common_components/spinningWheel";





const SplitPDF: React.FC = () => {
  const [fileId, setFileId] = useState('');
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null); //using refHook for changing the input tag with a button

  //function for handling the file upload
  const handleFileUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIsLoading(true)
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
         const formData = new FormData();
        formData.append("PDFFile", selectedFile); // Appending file in the formData
        const res = await savePDF(formData) //API call for saving the PDF file in the sever

        setTimeout(() => {
          setIsLoading(false)
        }, 2000)
        
        if (res.ok) {
          setFileId(res.response._id)
        }
      } else {
        setError("upload valid file"); // setting error if the file format is not PDF
        setTimeout(() => {
          setError("");
        }, 4000); // timeout function for removing the error
      }
    }
  };

  //function for handling the button click as input
  const handleFileInputChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

   return (
     <>
       {isLoading && <Spinner />} 
       {fileId ? (
         <MergeFile fileId={fileId} />
       ) : (
         <div className="flex flex-col w-full items-center mt-10">
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
             style={{ display: "none" }} // hiding the input tag
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
           {error && <p className="text-red-600 mt-3">{error}</p>} 
         </div>
       )}
     </>
   );
};

export default SplitPDF;


