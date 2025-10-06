import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { appCOnfig } from "../config/app.config.js";
const prisma = new PrismaClient();
export const verifyAdmin = async (req, res, next) => {
    try {
        // from access token we have to get the user id then check the user is admin or not
        const accessToken = req.headers["authorization"]?.split(" ")[1];
        if (!accessToken) {
            return res.status(401).json({ success: false, message: "Invalid User" });
        }
        const decoded = jwt.verify(accessToken, appCOnfig.app.access_secret_key);
        req.user = decoded;
        const user = await prisma.user.findUnique({
            where: {
                id: req.user?.id
            }
        });
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }
        if (user.role !== "admin") {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        next();
    }
    catch (error) {
        res.status(400).json({ error: error.message, success: false });
    }
};
//# sourceMappingURL=verifyAdmin.js.map