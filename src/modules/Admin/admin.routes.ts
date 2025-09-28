import express from "express"
import { addEnquiry } from "./add-enquiries/add_enquiries.controller.ts"

const adminRoute = express.Router()

adminRoute.post("/add-enquiry", addEnquiry)

export default adminRoute