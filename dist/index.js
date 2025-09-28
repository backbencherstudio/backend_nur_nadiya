import express from "express";
import setupRoutes from "./setup_routes";
import { appCOnfig } from "./config/app.config";
import cors from "cors";
import passport from "./config/passport";
const app = express();
// initialize passport
app.use(passport.initialize());
app.use(express.json());
app.use(cors({
    origin: appCOnfig.app.client_url,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// setup routes
setupRoutes(app);
// port
const port = appCOnfig.app.port;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map