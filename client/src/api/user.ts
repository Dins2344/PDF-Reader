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
  selectedPages:number[]
}

export const mergePDF = async (data:MergePDFBody) => {
    try {
        return await api.post("/user/merge-and-save", data, {
          // responseType: "blob",
          // headers: {
          //   "Content-Type": "multipart/form-data", // Set Content-Type to multipart/form-data
          // },
        });
    } catch (err:any) {
        console.log(err)
        if (err.request) {
            console.log(err.message)
        }
    }
}