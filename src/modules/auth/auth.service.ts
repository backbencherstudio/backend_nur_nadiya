import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
export class Authservice{
    
    static async register(name: string, email: string, password: string, role: string){
        // check user email exist or not 
        const user = await prisma.user.findFirst({
            where:{
                email: email,
            }
        })
        if(user){
            throw new Error("User already exists");
        }

        // bcrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // save the user to the database
        return await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword,
                role
            }
        })
        
    }
}