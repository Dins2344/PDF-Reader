import { useEffect, useState } from "react";
import {
  deleteExtractedFile,
  downloadExtractedPDF,
  getAllExtractedFiles,
} from "../../api/user";
import { ExtractedFileData } from "../../types/user";
import Spinner from "../common_components/spinningWheel";

const MyFilesComponent: React.FC = () => {
  const [files, setFiles] = useState<ExtractedFileData[]>();
  const [error, setError] = useState("");
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {
    getAllFiles();
  }, []);

  const getAllFiles = async () => {
    setIsLoading(true)
    const data = await getAllExtractedFiles();
   setTimeout(() => {
      setIsLoading(false)
    },1000)
    if (data.ok) {
      setFiles(data.files);
    } else {
      setError(data.message)
    }
  };

  const handleDownload = async (fileId: string) => {
    await downloadExtractedPDF(fileId);
  };

  const handleDelete = async (fileId: string) => {
    const res = await deleteExtractedFile(fileId);
    if (res.ok) {
      getAllFiles();
    } else {
      setError(res.message);
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      <div className="flex flex-col w-full items-center mt-10">
        <h2 className="text-center  text-3xl font-semibold md:font-bold md:text-5xl ">
          Extracted PDF Files
        </h2>
        <h1 className="text-xl md:text-2xl text-center mt-8 mb-5 w-[330px] md:w-[600px]">
          You can find your extracted files over here. Latest will be on top
        </h1>
        {error && <p className="text-red-500 my-3">{error}</p>}
        <div className="w-full xl:px-48 px-3 md:px-20 overflow-x-scroll md:overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 border-2 rounded-lg ">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Sl No
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  File name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Created on
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {files &&
                files.map((item, i) => {
                  const time = new Date(item.createdOn).toLocaleString();
                  return (
                    <tr key={item._id}>
                      <td className="px-6 py-4 text-sm leading-5 text-gray-900">
                        {i + 1}
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 text-gray-900">
                        {item.fileName}
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 text-gray-900">
                        {time}
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 text-gray-900">
                        <button
                          className="text-blue-500 mr-2"
                          onClick={() => {
                            handleDownload(item._id);
                          }}
                        >
                          Download
                        </button>
                        <button
                          className="text-red-500"
                          onClick={() => {
                            handleDelete(item._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}

              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyFilesComponent;
