import express from "express";
import setupRoutes from "./setup_routes.js";
import { appCOnfig } from "./config/app.config.js";
import cors from "cors";
import passport from "./config/passport.js";

// Wrap in IIFE to avoid scope issues
(function() {
  const app = express();

  // initialize passport
  app.use(passport.initialize());

  const allowedOrigins = [
    "https://transfermaidsingapore.com",
    "https://www.transfermaidsingapore.com",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "https://nur-nadiya-tan-front-end.vercel.app",
  ];

  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/is-working", (req, res) => {
    res.send("Hello World 2");
  });

  // Serve static files (uploaded images)
  app.use("/uploads", express.static("public/enquiries"));
  app.use("/bio-data", express.static("public/bio-data"));

  // setup routes
  setupRoutes(app);

  // port
  const port = appCOnfig.app.port || 4000;
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
})();