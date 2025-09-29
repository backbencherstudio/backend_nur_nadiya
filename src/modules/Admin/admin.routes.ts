import express from "express"
import { addEnquiry, upload } from "./add-enquiries/add_enquiries.controller.js"
import { handleUploadError } from "../../middleware/uploadErrorHandler.js"
import { addBioData, uploadBioData, getBioDataList } from "./bio-data/bioData.controller.js"
const adminRoute = express.Router()

// Clean route with proper middleware separation
adminRoute.post("/add-enquiry", upload.single('image'), handleUploadError, addEnquiry)
adminRoute.post("/add-bio", uploadBioData.single('image'), handleUploadError, addBioData)
adminRoute.get("/get-bio-list", getBioDataList)

export default adminRoute