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
            nationality,
            height,
            weight,
            name_of_airPort,
            marital_status,
            religion,
            education_level,
            age_of_childern,
            number_of_childern,

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
            care_of_infants,
            care_of_infants_willingness,
            care_of_infants_experience,
            care_of_infants_assessment,

            care_of_elderly,
            care_of_elderly_willingness,
            care_of_elderly_experience,
            care_of_elderly_assessment,

            care_of_disabled,
            care_of_disabled_willingness,
            care_of_disabled_experience,
            care_of_disabled_assessment,

            general_housework,
            general_housework_willingnes,
            general_housework_experience,
            general_housework_assessment,

            cooking,
            cooking_willingness,
            cooking_experience,
            cooking_assessment,

            language_abilities,
            language_abilities_willingness,
            language_abilities_experience,
            language_abilities_assessment,

            other_skills,
            other_skills_willingness,
            other_skills_experience,
            other_skills_assessment,

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
                care_of_infants,
                care_of_infants_willingness: care_of_infants_willingness || false,
                care_of_infants_experience: care_of_infants_experience || false,
                care_of_infants_assessment,

                care_of_elderly,
                care_of_elderly_willingness: care_of_elderly_willingness || false,
                care_of_elderly_experience: care_of_elderly_experience || false,
                care_of_elderly_assessment,

                care_of_disabled,
                care_of_disabled_willingness: care_of_disabled_willingness || false,
                care_of_disabled_experience: care_of_disabled_experience || false,
                care_of_disabled_assessment,

                general_housework,
                general_housework_willingnes: general_housework_willingnes || false,
                general_housework_experience: general_housework_experience || false,
                general_housework_assessment,

                cooking,
                cooking_willingness: cooking_willingness || false,
                cooking_experience: cooking_experience || false,
                cooking_assessment,

                language_abilities,
                language_abilities_willingness: language_abilities_willingness || false,
                language_abilities_experience: language_abilities_experience || false,
                language_abilities_assessment,
                
                other_skills,
                other_skills_willingness: other_skills_willingness || false,
                other_skills_experience: other_skills_experience || false,
                other_skills_assessment,
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
        // Extract query parameters
        const { 
            search = '', 
            status = '', 
            nationality = '', 
            date_from = '', 
            date_to = '',
            page = '1', 
            limit = '10' 
        } = req.query;

        const pageNum = parseInt(page as string) || 1;
        const limitNum = parseInt(limit as string) || 10;
        const skip = (pageNum - 1) * limitNum;

        // Build where clause for filtering
        const whereClause: any = {};

        // Search functionality (search in name, nationality, skills, language_abilities)
        if (search) {
            whereClause.OR = [
                { full_name: { contains: search as string, mode: 'insensitive' } },
                { nationality: { contains: search as string, mode: 'insensitive' } },
                { other_skills: { contains: search as string, mode: 'insensitive' } },
                { language_abilities: { contains: search as string, mode: 'insensitive' } }
            ];
        }

        // Status filter
        if (status && status !== 'all') {
            whereClause.status = status;
        }

        // Nationality filter
        if (nationality && nationality !== 'all') {
            whereClause.nationality = nationality;
        }

        // Date range filter (based on date_of_birth)
        if (date_from || date_to) {
            whereClause.date_of_birth = {};
            if (date_from) {
                whereClause.date_of_birth.gte = new Date(date_from as string);
            }
            if (date_to) {
                whereClause.date_of_birth.lte = new Date(date_to as string);
            }
        }

        // Get total count for pagination
        const totalCount = await prisma.bioData.count({ where: whereClause });

        // Get paginated results
        const bioDataList = await prisma.bioData.findMany({
            where: whereClause,
            skip: skip,
            take: limitNum,
            orderBy: { createdAt: 'desc' }
        });

        // Transform data
        const transformedData = bioDataList.map((biodata) => {
            return {
                id: biodata.id,
                image: biodata.image ? `${process.env.APP_URL}/bio-data/${biodata.image}` : null,
                full_name: biodata.full_name,
                age: biodata.date_of_birth ? new Date().getFullYear() - new Date(biodata.date_of_birth).getFullYear() : null,
                language_abilities: biodata.language_abilities ? biodata.language_abilities : null,
                // Calculate experience in years from date_from and date_to
                experience: (biodata.date_from && biodata.date_to) ? 
                    new Date(biodata.date_to).getFullYear() - new Date(biodata.date_from).getFullYear() : null,
                nationality: biodata.nationality ? biodata.nationality : null,
                // Skills from other_skills field
                skills: biodata.other_skills ? biodata.other_skills : null,
                status: biodata.status ? biodata.status : null,
                createdAt: biodata.createdAt
            };
        });

        // Calculate pagination info
        const totalPages = Math.ceil(totalCount / limitNum);
        const hasNextPage = pageNum < totalPages;
        const hasPrevPage = pageNum > 1;

        res.status(200).json({
            success: true,
            message: "Bio data list fetched successfully",
            data: {
                bioData: transformedData,
                pagination: {
                    currentPage: pageNum,
                    totalPages: totalPages,
                    totalCount: totalCount,
                    hasNextPage: hasNextPage,
                    hasPrevPage: hasPrevPage,
                    limit: limitNum
                }
            }
        });
        
    } catch (error:any) {
        res.status(400).json({
            success: false,
            message: `Error getting bio data list: ${error.message || error}`,
            data: null
        });
    }
}

export const changeBioStatus = async(req:Request,res:Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const bioData = await prisma.bioData.update({
            where: { id: id },
            data: { status: status }
        });
        res.status(200).json({
            success: true,
            message: "Bio status changed successfully",
            data: null
        });
    } catch (error:any) {
        res.status(400).json({
            success: false,
            message: `Error changing bio status: ${error.message || error}`,
            data: null
        });
    }
}

export const getBioData = async(req:Request,res:Response) => {
    try {
        const { id } = req.params;
        const bioData = await prisma.bioData.findUnique({
            where: { id: id }
        });
        res.status(200).json({
            success: true,
            message: "Bio data fetched successfully",
            data: {
                image_url: bioData?.image ? `${process.env.APP_URL}/bio-data/${bioData.image}` : null,
                ...bioData
            }
        });
    } catch (error:any) {
        res.status(400).json({
            success: false,
            message: `Error getting bio data: ${error.message || error}`,
            data: null
        });
    }
}


export const deleteBioData = async(req:Request,res:Response) => {
    try {
        const { id } = req.params;
        await prisma.bioData.delete({
            where: { id: id }
        });
        res.status(200).json({
            success: true,
            message: "Bio data deleted successfully",
            data: null
        });
    } catch (error:any) {
        res.status(400).json({
            success: false,
            message: `Error deleting bio data: ${error.message || error}`,
            data: null
        });
    }
}

export const editBioDataById = async(req:Request,res:Response) => {
    try {
        const { id } = req.params;
        
        // Check if bio data exists
        const existingBioData = await prisma.bioData.findUnique({
            where: { id: id }
        });
        
        if (!existingBioData) {
            return res.status(404).json({
                success: false,
                message: "Bio data not found",
                data: null
            });
        }

        // Prepare update data
        const updateData: any = {};
        
        // Handle image update if new file is uploaded
        if (req.file) {
            // Delete old image if it exists
            if (existingBioData.image) {
                const oldImagePath = `public/bio-data/${existingBioData.image}`;
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updateData.image = req.file.filename;
        }

        // Handle other fields from req.body
        const allowedFields = [
            'full_name', 'date_of_birth', 'place_of_birth', 'nationality', 'height', 'weight',
            'name_of_airPort', 'marital_status', 'religion', 'education_level', 'age_of_childern',
            'number_of_childern', 'allergies', 'physical_disabilities', 'mental_illness', 'epilepsy',
            'tuberculosis', 'heart_disease', 'malaria', 'operations', 'others', 'dietary_restrictions',
            'preference_for_rest_days', 'any_other_remarks', 'care_of_infants', 'care_of_infants_willingness',
            'care_of_infants_experience', 'care_of_infants_assessment', 'care_of_elderly',
            'care_of_elderly_willingness', 'care_of_elderly_experience', 'care_of_elderly_assessment',
            'care_of_disabled', 'care_of_disabled_willingness', 'care_of_disabled_experience',
            'care_of_disabled_assessment', 'general_housework', 'general_housework_willingnes',
            'general_housework_experience', 'general_housework_assessment', 'cooking',
            'cooking_willingness', 'cooking_experience', 'cooking_assessment', 'language_abilities',
            'language_abilities_willingness', 'language_abilities_experience', 'language_abilities_assessment',
            'other_skills', 'other_skills_willingness', 'other_skills_experience', 'other_skills_assessment',
            'date_from', 'date_to', 'country', 'employer', 'work_duties', 'remarks', 'other_remarks', 'status'
        ];

        // Process each field from req.body
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                if (field === 'date_of_birth' || field === 'date_from' || field === 'date_to') {
                    // Handle date fields
                    if (req.body[field]) {
                        const dateValue = new Date(req.body[field]);
                        if (!isNaN(dateValue.getTime())) {
                            updateData[field] = dateValue;
                        }
                    }
                } else if (field === 'allergies' || field === 'physical_disabilities' || field === 'mental_illness' || 
                          field === 'epilepsy' || field === 'tuberculosis' || field === 'heart_disease' || 
                          field === 'malaria' || field === 'operations' || field === 'dietary_restrictions' || 
                          field === 'preference_for_rest_days' || field === 'care_of_infants_willingness' || 
                          field === 'care_of_infants_experience' || field === 'care_of_elderly_willingness' || 
                          field === 'care_of_elderly_experience' || field === 'care_of_disabled_willingness' || 
                          field === 'care_of_disabled_experience' || field === 'general_housework_willingnes' || 
                          field === 'general_housework_experience' || field === 'cooking_willingness' || 
                          field === 'cooking_experience' || field === 'language_abilities_willingness' || 
                          field === 'language_abilities_experience' || field === 'other_skills_willingness' || 
                          field === 'other_skills_experience') {
                    // Handle boolean fields
                    updateData[field] = req.body[field] === 'true' || req.body[field] === true;
                } else {
                    // Handle other fields
                    updateData[field] = req.body[field];
                }
            }
        }

        // Update the bio data
        const bioData = await prisma.bioData.update({
            where: { id: id },
            data: updateData
        });

        res.status(200).json({
            success: true,
            message: "Bio data edited successfully",
            data: bioData
        });
    } catch (error:any) {
        res.status(400).json({
            success: false,
            message: `Error editing bio data: ${error.message || error}`,
            data: null
        });
    }
}
