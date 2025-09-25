import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export class UserRepository{

    // check user exist or not 
    static async checkUserExist(field:string, value: string){
        const user = await prisma.user.findFirst({
            where:{
                [field]: value
            }
        })
        return user; // Return null if user doesn't exist 
    }
}