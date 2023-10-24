export interface userLoginData{
    email: string
    password:string
}

export interface userRegisterData{
    name: string
    email: string
    password: string
    confirmPassword:string
}

export interface ExtractedFileData{
    fileName: string
    fileData: Buffer
    userId: string
    _id: string
    _v:number
}