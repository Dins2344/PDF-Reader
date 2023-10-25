//import the api form the interceptors
import api from "./interceptors"


// API call for Save the uploaded the PDF 
export const savePDF = async (formData: FormData) => {
  try {
    const {data} = await api.post("/user/upload-PDF",formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set Content-Type to multipart/form-data
      },
    });
    return data
  } catch (err) {
    console.log(err)
  }
  
}

// getUploaded PDF file API calling function
export const getUploadedPDF = async (fileId: string) => {
  try {
    const { data } = await api.get(`/user/get-uploaded-fil/${fileId}`, {
      responseType: "arraybuffer",  // Specify that the response should be treated as a blob
    });
    return data
  } catch (err) {
    console.log(err)
  }
}


//interface for mergePDF API 
interface MergePDFBody{
  selectedPages: number[],
  fileId:string
}

// API call for merge the PDF
export const mergePDF = async (bodyData:MergePDFBody) => {
    try {
      const { data } = await api.post("/user/merge-and-save", bodyData);
      return data
    } catch (err) {
        console.log(err)
    }
}


// function for calling the downloadExtracted PDf file API
export const downloadExtractedPDF = async (fileId: string) => {
  try {
    await api.get(`/user/download-extracted-PDF/${fileId}`);
  
  } catch (err) {
    console.log(err)
  }
}


// for calling the getAllExtractedFiles API
export const getAllExtractedFiles = async () => {
  try {
    const { data } = await api.get("/user/get-users-all-extracted-files");
    return data
  } catch (err) {
    console.log(err)
  }
}

//for calling the delete file API
export const deleteExtractedFile = async (fileId: string) => {
  try {
    const { data } = await api.get(`/user/delete-extracted-file/${fileId}`);
    return data
  } catch (err) {
    console.log(err)
  }
}