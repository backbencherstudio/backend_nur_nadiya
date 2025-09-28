import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { appCOnfig } from "../../../config/app.config";
const prisma = new PrismaClient();
export class UserRepository {
    // check user exist or not 
    static async checkUserExist(field, value) {
        const user = await prisma.user.findFirst({
            where: {
                [field]: value
            }
        });
        return user; // Return null if user doesn't exist 
    }
    // update user last login 
    static async updateUserLastLogin(id) {
        return await prisma.user.update({
            where: {
                id: id
            },
            data: {
                last_login_at: new Date()
            }
        });
    }
    // save refresh token
    static async saveRefreshToken(id, refreshToken) {
        return await prisma.user.update({
            where: {
                id: id
            },
            data: {
                refreshToken: refreshToken
            }
        });
    }
    // create access token
    static async createAccessToken(id, email, role) {
        return jwt.sign({ id: id, email: email, role: role }, appCOnfig.app.access_secret_key, { expiresIn: '1h' });
    }
    // create refresh token
    static async createRefreshToken(id, role) {
        return jwt.sign({ id: id, role: role }, appCOnfig.app.refresh_secret_key, { expiresIn: '7d' });
    }
    // delete refresh token
    static async deleteRefreshToken(id, refreshToken) {
        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        });
        if (!user) {
            throw new Error("User not found");
        }
        if (user.refreshToken !== refreshToken) {
            throw new Error("Invalid refresh token");
        }
        return await prisma.user.update({
            where: {
                id: id
            },
            data: {
                refreshToken: null
            }
        });
    }
}
//# sourceMappingURL=user.repository.js.map