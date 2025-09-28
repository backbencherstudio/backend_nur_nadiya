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
    allowedHeaders:["Content-Type", "Authorization"],
}))

// Serve static files (uploaded images)
app.use('/uploads', express.static('public/enquiries'));

// setup routes
setupRoutes(app);

// port
const port = appCOnfig.app.port || 8000
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

