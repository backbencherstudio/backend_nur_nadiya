import { Request, Response } from "express"

export const addEnquiry = async(req: Request, res: Response)=>{
    try {
        console.log("working")
        res.status(200).json({
            success: true,
            message: "Enquiry added successfully"
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}