import express from "express";
import authRoutes from "./modules/auth/auth.routes.ts";
import adminRoute from "./modules/Admin/admin.routes.ts";

function setupRoutes(app: express.Application){
    // Authentication Api Routes
    app.use("/api/auth", authRoutes)

    // Admin dashboard routes
    app.use("/api/admin", adminRoute)

}

export default setupRoutes;