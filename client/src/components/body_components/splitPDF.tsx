import { useRef, useState } from "react";

type FileState = File | null;
const SplitPDF: React.FC = () => {
  const [file, setFile] = useState<FileState>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        console.log(selectedFile.type);
        setFile(selectedFile);
      } else {
          setError("upload valid file");
          setTimeout(() => {
              setError('')
          },4000)
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
      <div className="flex flex-col w-full items-center">
        <h2 className="text-center  text-3xl font-semibold md:font-bold md:text-5xl ">
          Split PDF Files
        </h2>
        <h1 className="text-xl md:text-2xl text-center mt-2 w-[330px] md:w-[600px]">
          Separate one page or a whole set for easy conversion into independent
          PDF files.
        </h1>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => handleFileUpload(e)}
          accept=".pdf"
          className="mt-3"
        />
        <button className="mt-3 w-40 h-10 bg-green-500 rounded-lg text-xl font-semibold text-white" onClick={handleFileInputChange}>
          Select file
        </button>
          {error && <p className="text-red-600">{error}</p>}
      </div>
    </>
  );
};

export default SplitPDF;
