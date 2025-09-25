import express from "express";
import { login, register } from "./auth.controller.js";
import passport from "passport";


const authRoutes = express.Router();

authRoutes.post("/register", register)
authRoutes.post("/login", login)

// google authentication routes
authRoutes.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}))
authRoutes.get('/google/callback', 
    passport.authenticate('google', {session: false}),

    async( req, res )=>{
        try {
            console.log(req.user)
        } catch (error) {
            
        }
    }
);

export default authRoutes;