import dotenv from "dotenv";
dotenv.config();
export const appCOnfig = {
    app: {
        port: process.env.PORT,
        client_url: process.env.CLIENT_URL,
        server_url: process.env.SERVER_URL,
        app_name: process.env.APP_NAME,
        secret_key: process.env.SECRET_KEY || "your-secret-key-here",
        access_secret_key: process.env.ACCESS_SECRET_KEY || "your-secret-key-here",
        refresh_secret_key: process.env.REFRESH_SECRET_KEY || "your-secret-key-here"
    },
    oauth: {
        google_client_id: process.env.GOOGLE_CLIENT_ID || "",
        google_client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        google_callback_url: process.env.GOOGLE_CALLBACK_URL || "http://localhost:4000/api/auth/google/callback"
    }
};
//# sourceMappingURL=app.config.js.map