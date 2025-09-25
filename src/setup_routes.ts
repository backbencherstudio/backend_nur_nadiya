import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";


function setupRoutes(app: express.Application){
    // Authentication Api Routes
    app.use("/api/auth", authRoutes)

}

export default setupRoutes;