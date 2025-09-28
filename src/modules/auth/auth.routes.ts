import express from "express";
import { login, register, logout } from "./auth.controller.ts";
import passport from "passport";
import { UserRepository } from "../../common/repository/user/user.repository.ts";
import { verifyToken } from "../../middleware/verifyToken.ts";

const authRoutes = express.Router();

authRoutes.post("/register", register)
authRoutes.post("/login", login)

// google authentication routes
authRoutes.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}))
authRoutes.get('/google/callback', 
    passport.authenticate('google', {session: false}),

    async( req, res )=>{
        try {
            const user = req.user as any;
            await UserRepository.updateUserLastLogin(user?.id);

            const accessToken = await UserRepository.createAccessToken(user.id, user.email, user.role);
            const refreshToken = await UserRepository.createRefreshToken(user.id, user.role);

            // saved refresh token in the databse
            await UserRepository.saveRefreshToken(user.id, refreshToken);

            // set access token in the cookie(1 hour)
            res.cookie("accessToken", accessToken,{
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1 * 60 * 60 * 1000,
                path: "/"
            })

            // set refresh token in the cookie(7 days)
            res.cookie("refreshToken", refreshToken,{
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/"
            })

            const { password:_, ...userData } = user;
            // send the response
            console.log(userData)
            res.status(200).json({
                success:true,
                message:"Login successful",
                userData,
                accessToken,
                refreshToken
            })
        } catch (error:any) {
            res.status(400).json({error:error.message})
        }
    }
);

// logout route
authRoutes.post("/logout", verifyToken, logout)

export default authRoutes;