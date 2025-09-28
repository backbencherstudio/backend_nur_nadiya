import express from "express";
import { addEnquiry } from "./add-enquiries/add_enquiries.controller.js";
const adminRoute = express.Router();
adminRoute.post("/add-enquiry", addEnquiry);
export default adminRoute;
//# sourceMappingURL=admin.routes.js.map