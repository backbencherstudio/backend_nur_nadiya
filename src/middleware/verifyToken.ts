import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { appCOnfig } from "../config/app.config.ts";

export const verifyToken = async (req: Request, res: Response, next: NextFunction)=> {

    const accessToken = req.headers["authorization"]?.split(" ")[1];

    if(!accessToken){
        return res.status(401).json({success:false, message:"Invalid User"})
    }

    jwt.verify(accessToken, appCOnfig.app.access_secret_key, (err:any, decoded:any)=> {

        if(err){
            return res.status(401).json({success:false, message:"Invalid User"})
        }
        req.user = decoded;
        next();
    })

}