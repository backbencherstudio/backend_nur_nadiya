export declare class Authservice {
    static register(name: string, email: string, password: string, role: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        role: string;
        image: string | null;
        googleId: string | null;
        isGoogleVerified: boolean;
        last_login_at: Date | null;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map