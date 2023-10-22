import api from "./interceptors"


export const mergePDF = async (formData:FormData) => {
    try {
        return await api.post("/user/merge-and-save", formData, {
          responseType: "blob",
          headers: {
            "Content-Type": "multipart/form-data", // Set Content-Type to multipart/form-data
          },
        });
    } catch (err:any) {
        console.log(err)
        if (err.request) {
            console.log(err.message)
        }
    }
}