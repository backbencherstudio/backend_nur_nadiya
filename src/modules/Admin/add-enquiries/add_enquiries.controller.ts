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

export const editEnquiry = async(req:Request,res:Response) => {
    try {
        const { id } = req.params;
        
        // Check if maid enquiry exists
        const maidEnquiry = await prisma.maidEnquiry.findUnique({
            where: { id: id }
        });

        if (maidEnquiry) {
            // Handle maid enquiry update
            const {
                full_name,
                enquiry_type,
                date_of_birth,
                transfer_date,
                wp_number,
                mobile_number,
                language,
                nationality,
                additional_information,
                current_employer
            } = req.body;

            // Validate and convert dates if provided
            let birthDate = maidEnquiry.date_of_birth;
            let transferDate = maidEnquiry.transfer_date;
            
            if (date_of_birth) {
                birthDate = new Date(date_of_birth);
                if (isNaN(birthDate.getTime())) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid date_of_birth format. Please use YYYY-MM-DD format."
                    });
                }
            }
            
            if (transfer_date) {
                transferDate = new Date(transfer_date);
                if (isNaN(transferDate.getTime())) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid transfer_date format. Please use YYYY-MM-DD format."
                    });
                }
            }

            // Handle image update if new file is uploaded
            let imageName = maidEnquiry.image_name;
            if (req.file) {
                // Delete old image if it exists
                if (maidEnquiry.image_name) {
                    const oldImagePath = `public/enquiries/${maidEnquiry.image_name}`;
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                imageName = req.file.filename;
            }

            // Update maid enquiry
            const updatedMaidEnquiry = await prisma.maidEnquiry.update({
                where: { id: id },
                data: {
                    full_name: full_name || maidEnquiry.full_name,
                    enquiry_type: enquiry_type || maidEnquiry.enquiry_type,
                    date_of_birth: birthDate,
                    transfer_date: transferDate,
                    wp_number: wp_number || maidEnquiry.wp_number,
                    mobile_number: mobile_number || maidEnquiry.mobile_number,
                    language: language || maidEnquiry.language,
                    nationality: nationality || maidEnquiry.nationality,
                    additional_information: additional_information || maidEnquiry.additional_information,
                    current_employer: current_employer !== undefined ? (current_employer === 'true' || current_employer === true) : maidEnquiry.current_employer,
                    image_name: imageName
                }
            });

            return res.status(200).json({
                success: true,
                message: "Maid enquiry updated successfully",
                data: updatedMaidEnquiry
            });
        }

        // Check if employer enquiry exists
        const employerEnquiry = await prisma.employerEnquiry.findUnique({
            where: { id: id }
        });

        if (employerEnquiry) {
            // Handle employer enquiry update
            const {
                full_name,
                enquiry_type,
                contact_number,
                email,
                hosehold_type,
                language,
                budget,
                additional_information
            } = req.body;

            // Update employer enquiry
            const updatedEmployerEnquiry = await prisma.employerEnquiry.update({
                where: { id: id },
                data: {
                    full_name: full_name || employerEnquiry.full_name,
                    enquiry_type: enquiry_type || employerEnquiry.enquiry_type,
                    contact_number: contact_number || employerEnquiry.contact_number,
                    email: email || employerEnquiry.email,
                    hosehold_type: hosehold_type || employerEnquiry.hosehold_type,
                    language: language || employerEnquiry.language,
                    budget: budget || employerEnquiry.budget,
                    additional_information: additional_information || employerEnquiry.additional_information
                }
            });

            return res.status(200).json({
                success: true,
                message: "Employer enquiry updated successfully",
                data: updatedEmployerEnquiry
            });
        }

        // If neither enquiry type found
        return res.status(404).json({
            success: false,
            message: "Enquiry not found",
            data: null
        });

    } catch (error:any) {
        res.status(400).json({
            success: false,
            message: `Error editing enquiry: ${error.message || error}`,
            data: null
        });
    }
}