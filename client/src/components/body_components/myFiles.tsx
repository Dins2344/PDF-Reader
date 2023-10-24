import { useEffect, useState } from "react";
import { getAllExtractedFiles } from "../../api/user";
import { ExtractedFileData } from "../../types/user";


const MyFilesComponent: React.FC = () => {
      const [files, setFiles] = useState<ExtractedFileData[]>();
      useEffect(() => {
        getAllFiles();
      }, []);
      const getAllFiles = async () => {
        const data = await getAllExtractedFiles();
        if (data.ok) {
          console.log(data.files);
          setFiles(data.files);
        } else {
          console.log(data.message);
        }
      };
    return (
      <>
        <div className="flex flex-col w-full items-center mt-10">
          <h2 className="text-center  text-3xl font-semibold md:font-bold md:text-5xl ">
           Extracted PDF Files
          </h2>
          <h1 className="text-xl md:text-2xl text-center mt-8 w-[330px] md:w-[600px]">
            Separate one page or a whole set for easy conversion into
            independent PDF files.
                </h1>
                
                {files && 
                    files.map((item) => {
                        return (
                            <div key={item._id}>
                                <h4>{item.fileName}</h4>
                            </div>
                    )
                })}
        </div>
      </>
    );
}

export default MyFilesComponent