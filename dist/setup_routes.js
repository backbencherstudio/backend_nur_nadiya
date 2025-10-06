import authRoutes from "./modules/auth/auth.routes.js";
import adminRoute from "./modules/Admin/admin.routes.js";
function setupRoutes(app) {
    // Authentication Api Routes
    app.use("/api/auth", authRoutes);
    // Admin dashboard routes
    app.use("/api/admin", adminRoute);
    app.use("/api/admin", adminRoute);
}
export default setupRoutes;
//# sourceMappingURL=setup_routes.js.map