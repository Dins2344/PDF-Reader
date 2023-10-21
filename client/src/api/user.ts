import api from "./interceptors"


export const mergePDF = async (data:string) => {
    try {
        const res = await api.post('/api/user/mergePDF', data)
        return res
    } catch (err) {
        console.log(err)
    }
}