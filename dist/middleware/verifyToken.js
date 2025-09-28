import jwt from "jsonwebtoken";
import { appCOnfig } from "../config/app.config";
export const verifyToken = async (req, res, next) => {
    const accessToken = req.headers["authorization"]?.split(" ")[1];
    if (!accessToken) {
        return res.status(401).json({ success: false, message: "Invalid User" });
    }
    jwt.verify(accessToken, appCOnfig.app.access_secret_key, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Invalid User" });
        }
        req.user = decoded;
        next();
    });
};
//# sourceMappingURL=verifyToken.js.map