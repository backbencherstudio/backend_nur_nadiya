import express from "express"
import { addEnquiry, upload } from "./add-enquiries/add_enquiries.controller.js"
import { handleUploadError } from "../../middleware/uploadErrorHandler.js"

const adminRoute = express.Router()

// Clean route with proper middleware separation
adminRoute.post("/add-enquiry", upload.single('image'), handleUploadError, addEnquiry)

export default adminRoute