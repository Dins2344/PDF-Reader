import api from "./interceptors"


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

interface MergePDFBody{
  selectedPages: number[],
  fileId:string
}

export const mergePDF = async (bodyData:MergePDFBody) => {
    try {
      const { data } = await api.post("/user/merge-and-save", bodyData);
      return data
    } catch (err) {
        console.log(err)
    }
}


export const downloadExtractedPDF = async (fileId: string) => {
  try {
    await api.get(`/user/download-extracted-PDF/${fileId}`);
  
  } catch (err) {
    console.log(err)
  }
}


export const getAllExtractedFiles = async () => {
  try {
    const { data } = await api.get("/user/get-users-all-extracted-files");
    return data
  } catch (err) {
    console.log(err)
  }
}