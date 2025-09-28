import type { Request, Response } from "express";
import { Authservice } from "./auth.service";
import { UserRepository } from "../../common/repository/user/user.repository";
import bcrypt from "bcrypt";
import { appCOnfig } from "../../config/app.config";
import jwt from "jsonwebtoken"

// Register Controller
export const register = async (req: Request,res: Response) =>{
    const { name, email, password, role } = req.body;
    try {
        await Authservice.register(name, email, password, role)
        res.status(201).json({
            success:true,
            message:"Admin created successfully",
            data:null
        })
    } catch (error:any) {
        res.status(400).json({error:error.message})
    }
}

// Login Controller
export const login = async(req: Request, res: Response)=> {
    const {email, password} = req.body;
    try {
        // check the user mail exist or not
        const isExist = await UserRepository.checkUserExist("email", email);
        if(!isExist){
            throw new Error("User not found");
        }
        // check the provided user is admin or not
        if(isExist.role !== "admin"){
            throw new Error("Your are not authorized to login");
        }
        // dcrypt the password and compare with the password in the database
        const isPasswordCorrect = await bcrypt.compare(password, isExist.password);
        if(!isPasswordCorrect){
            throw new Error("Invalid password");
        }
        // create a token and send the repsonse
        const accessToken = jwt.sign({id:isExist.id}, appCOnfig.app.access_secret_key, {expiresIn: '1h'})
        const refreshToken = jwt.sign({id:isExist.id}, appCOnfig.app.refresh_secret_key, {expiresIn: '7d'})
        const {password: _password, ...user} = isExist;
        res.status(200).json({
            success:true,
            message:"Login successful",
            data:user,
            tokens:{
                token_type: "Bearer",
                accessToken,
                refreshToken
            }
            
        })
    } catch (error:any) {
        res.status(400).json({error:error.message})
    }
}

// logout controller
export const logout = async(req: Request, res: Response)=> {
    const {refreshToken} = req.body;
    const userId = (req.user as any).id;
    try {
        await UserRepository.deleteRefreshToken(userId, refreshToken);
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({success:true, message:"Logout successful"})
    } catch (error:any) {
        res.status(400).json({error:error.message})
    }
}