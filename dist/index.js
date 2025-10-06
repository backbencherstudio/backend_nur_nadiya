import express from "express";
import setupRoutes from "./setup_routes.js";
import { appCOnfig } from "./config/app.config.js";
import cors from "cors";
import passport from "./config/passport.js";
const app = express();
// initialize passport
app.use(passport.initialize());
app.use(express.json());
app.use(cors({
    origin: appCOnfig.app.client_url,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use('/is-working', (req, res) => {
    res.send("Hello World 2");
});
// Serve static files (uploaded images)
app.use('/uploads', express.static('public/enquiries'));
app.use('/bio-data-images', express.static('public/bio-data'));
// setup routes
setupRoutes(app);
// port
const port = appCOnfig.app.port || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map