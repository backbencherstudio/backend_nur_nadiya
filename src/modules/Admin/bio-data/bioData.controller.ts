import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

// Configure multer for bio data image upload
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const uploadPath = 'public/bio-data/';
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

// Create multer instance for bio data
export const uploadBioData = multer({ 
    storage, 
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB limit
    }
});

export const addBioData = async(req: Request, res: Response) => {
    try {
        
        // Check if req.body exists and has required fields
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No data provided in request body",
                data: null
            });
        }

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image file uploaded"
            });
        }

        // Extract required fields from req.body
        const {
            full_name,
            date_of_birth,
            place_of_birth,
            languages,
            status,
            nationality,
            height,
            weight,
            name_of_airPort,
            marital_status,
            religion,
            education_level,
            age_of_childern,
            number_of_childern,
            image,
            allergies,
            physical_disabilities,
            mental_illness,
            epilepsy,
            tuberculosis,
            heart_disease,
            malaria,
            operations,
            others,
            dietary_restrictions,
            preference_for_rest_days,
            any_other_remarks,
            area_of_work_one,
            willingness_one,
            experience_one,
            assessment_or_observation_one,
            area_of_work_two,
            willingness_two,
            experience_two,
            assessment_or_observation_two,
            area_of_work_three,
            willingness_three,
            experience_three,
            assessment_or_observation_three,
            area_of_work_four,
            willingness_four,
            experience_four,
            assessment_or_observation_four,
            area_of_work_five,
            willingness_five,
            experience_five,
            assessment_or_observation_five,
            area_of_work_six,
            willingness_six,
            experience_six,
            assessment_or_observation_six,
            area_of_work_seven,
            willingness_seven,
            experience_seven,
            assessment_or_observation_seven,

            date_from,
            date_to,
            country,
            employer,
            work_duties,
            remarks,
            other_remarks,
        } = req.body;

        // Validate required fields
        if (!full_name || !date_of_birth || !place_of_birth || !nationality || !height || !weight || !name_of_airPort || !marital_status || !religion || !education_level || !age_of_childern || !number_of_childern) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields. Please provide: full_name, date_of_birth, place_of_birth, nationality, height, weight, name_of_airPort, marital_status, religion, education_level, age_of_childern, number_of_childern",
                data: null
            });
        }

        // Convert date_of_birth to Date object
        const birthDate = new Date(date_of_birth);
        if (isNaN(birthDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid date_of_birth format. Please use YYYY-MM-DD format.",
                data: null
            });
        }

        // Convert date_from to Date object if provided
        let dateFrom = null;
        if(date_from){
            dateFrom = new Date(date_from);
            if(isNaN(dateFrom.getTime())){
                return res.status(400).json({
                    success: false,
                    message: "Invalid date_from format. Please use YYYY-MM-DD format.",
                });
            }
        }

        // Convert date_to to Date object if provided
        let dateTo = null;
        if(date_to){
            dateTo = new Date(date_to);
            if(isNaN(dateTo.getTime())){
                return res.status(400).json({
                    success: false,
                    message: "Invalid date_to format. Please use YYYY-MM-DD format.",
                });
            }
        }

        const bioData = await prisma.bioData.create({
            data: {
                full_name,
                date_of_birth: birthDate,
                place_of_birth,
                languages,
                status,
                nationality,
                height,
                weight,
                name_of_airPort,
                marital_status,
                religion,
                education_level,
                age_of_childern,
                number_of_childern,
                image: req.file.filename,
                allergies: allergies || false,
                physical_disabilities: physical_disabilities || false,
                mental_illness: mental_illness || false,
                epilepsy: epilepsy || false,
                tuberculosis: tuberculosis || false,
                heart_disease: heart_disease || false,
                malaria: malaria || false,
                operations: operations || false,
                others,
                dietary_restrictions: dietary_restrictions || false,
                preference_for_rest_days: preference_for_rest_days || false,
                any_other_remarks,
                area_of_work_one,
                willingness_one: willingness_one || false,
                experience_one: experience_one || false,
                assessment_or_observation_one,
                area_of_work_two,
                willingness_two: willingness_two || false,
                experience_two: experience_two || false,
                assessment_or_observation_two,
                area_of_work_three,
                willingness_three: willingness_three || false,
                experience_three: experience_three || false,
                assessment_or_observation_three,
                area_of_work_four,
                willingness_four: willingness_four || false,
                experience_four: experience_four || false,
                assessment_or_observation_four,
                area_of_work_five,
                willingness_five: willingness_five || false,
                experience_five: experience_five || false,
                assessment_or_observation_five,
                area_of_work_six,
                willingness_six: willingness_six || false,
                experience_six: experience_six || false,
                assessment_or_observation_six,
                area_of_work_seven,
                willingness_seven: willingness_seven || false,
                experience_seven: experience_seven || false,
                assessment_or_observation_seven,
                date_from: dateFrom,
                date_to: dateTo,
                country,
                employer,
                work_duties,
                remarks,
                other_remarks,
            }
        });

        res.status(200).json({
            success: true,
            message: "Bio data added successfully",
            data: bioData
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: `Error adding bio data: ${error.message || error}`,
            data: null
        });
    }
}

export const getBioDataList = async(req:Request,res:Response) => {
    try {
        const bioDataList = await prisma.bioData.findMany();
        res.status(200).json({
            success: true,
            message: "Bio data list fetched successfully",
            data: bioDataList.map((biodata)=>{
                return{
                    image:biodata.image ? `${process.env.APP_URL}/bio-data/${biodata.image}` : null,
                    full_name:biodata.full_name,
                    age:biodata.date_of_birth ? new Date().getFullYear() - new Date(biodata.date_of_birth).getFullYear() : null,
                    language: biodata.languages ? biodata.languages : null,
                    // we have to send the experience in year by calculating the difference between date_from and date_to
                    experience: (biodata.date_from && biodata.date_to) ? new Date(biodata.date_to).getFullYear() - new Date(biodata.date_from).getFullYear() : null,
                    nationality: biodata.nationality ? biodata.nationality : null,
                    // here we have to send the list of skills of areas of work one to seven in one array
                    skills: [biodata.area_of_work_one, biodata.area_of_work_two, biodata.area_of_work_three, biodata.area_of_work_four, biodata.area_of_work_five, biodata.area_of_work_six, biodata.area_of_work_seven],
                    status: biodata.status ? biodata.status : null,
                }
            })
        });
        
    } catch (error:any) {
        res.status(400).json({
            success: false,
            message: `Error getting bio data list: ${error.message || error}`,
            data: null
        });
    }
}