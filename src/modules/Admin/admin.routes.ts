import express from "express"
import { addEnquiry, upload } from "./add-enquiries/add_enquiries.controller.js"
import { handleUploadError } from "../../middleware/uploadErrorHandler.js"
import { addBioData, uploadBioData, getBioDataList, changeBioStatus, getBioData, deleteBioData, editBioDataById } from "./bio-data/bioData.controller.js"
import { getDashboardData, getAllEnquiries, changeEnquiryStatus } from "./dashboard/dashboard.controller.js"
import { verifyAdmin } from "../../middleware/verifyAdmin.js"

const adminRoute = express.Router()

// Clean route with proper middleware separation
adminRoute.post("/add-enquiry", verifyAdmin, upload.single('image'), handleUploadError, addEnquiry)

adminRoute.post("/add-bio", verifyAdmin, uploadBioData.single('image'), handleUploadError, addBioData)
adminRoute.get("/get-bio-list", verifyAdmin, getBioDataList)
adminRoute.patch("/change-bio-status/:id", verifyAdmin, changeBioStatus)
adminRoute.get("/get-bio-data/:id", verifyAdmin, getBioData)
adminRoute.delete("/delete-bio-data/:id", verifyAdmin, deleteBioData)
adminRoute.patch("/edit-bio-data-by-id/:id", verifyAdmin, uploadBioData.single('image'), handleUploadError, editBioDataById)

adminRoute.get("/dashboard", verifyAdmin, getDashboardData)
adminRoute.get("/get-all-enquiries", verifyAdmin, getAllEnquiries)
adminRoute.patch("/change-enquiry-status/:id", verifyAdmin, changeEnquiryStatus)

export default adminRoute