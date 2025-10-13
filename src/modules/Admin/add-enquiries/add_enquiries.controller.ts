import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express"
import multer from "multer";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const uploadPath = 'public/enquiries/';
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to allow only images
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if(file.mimetype.startsWith("image/")){
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// Create multer instance
export const upload = multer({ 
    storage, 
    fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit
    }
});

export const addEnquiry = async(req: Request, res: Response)=>{
    try {
        // add enquire to database
        if(req.body.enquiry_type === "maid"){
            // Check file size (additional validation) - only for maid enquiries
            if (req.file) {
                const fileSizeInMB = req.file.size / (1024 * 1024);
                if (fileSizeInMB > 50) {
                    return res.status(400).json({
                        success: false,
                        message: `File size is ${fileSizeInMB.toFixed(50)}MB. Maximum allowed size is 50MB.`
                    });
                }
            }
            const { full_name, enquiry_type, date_of_birth, transfer_date, wp_number, mobile_number, language, nationality, additional_information, current_employer } = req.body;
            // Validate and convert dates
            const birthDate = new Date(date_of_birth);
            const transferDate = new Date(transfer_date);
            
            if (isNaN(birthDate.getTime())) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid date_of_birth format. Please use YYYY-MM-DD format."
                });
            }
            
            if (isNaN(transferDate.getTime())) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid transfer_date format. Please use YYYY-MM-DD format."
                });
            }
            // Save to database
            await prisma.maidEnquiry.create({
                data: {
                    full_name,
                    enquiry_type,
                    date_of_birth: birthDate,
                    transfer_date: transferDate,
                    wp_number,
                    mobile_number,
                    language,
                    nationality,
                    additional_information,
                    current_employer: current_employer === 'true' || current_employer === true,
                    image_name: req.file?.filename || null,
                }
            });

            res.status(200).json({
                success: true,
                message: "Maid Enquiry added successfully",
                data:null
            });
        }else{
            const { full_name, enquiry_type, contact_number, email, hosehold_type, language, budget, additional_information } = req.body;
            // Save to database
            await prisma.employerEnquiry.create({
                data: {
                    full_name,
                    enquiry_type,
                    contact_number,
                    email,
                    hosehold_type,
                    language,
                    budget,
                    additional_information,
                }
            });
            res.status(200).json({
                success: true,
                message: "Employer Enquiry added successfully",
                data:null
            });
        }
    } catch (error: any) {
        console.error("Error:", error);
        res.status(400).json({
            success: false,
            error: error.message,
            data: null
        });
    }
}