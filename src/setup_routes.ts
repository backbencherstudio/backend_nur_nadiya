import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import adminRoute from "./modules/Admin/admin.routes.js";
import contactRoutes from "./modules/contact/contact.routes.js";

function setupRoutes(app: express.Application){
    // Authentication Api Routes
    app.use("/api/auth", authRoutes)

    // Admin dashboard routes
    app.use("/api/admin", adminRoute)
    app.use("/api/admin", adminRoute)

    // Public contact route
    app.use("/api/contact", contactRoutes)

}

export default setupRoutes;