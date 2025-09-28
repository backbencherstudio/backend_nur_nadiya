export declare class UserRepository {
    static checkUserExist(field: string, value: string): Promise<{
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
    } | null>;
    static updateUserLastLogin(id: string): Promise<{
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
    static saveRefreshToken(id: string, refreshToken: string): Promise<{
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
    static createAccessToken(id: string, email: string, role: string): Promise<string>;
    static createRefreshToken(id: string, role: string): Promise<string>;
    static deleteRefreshToken(id: string, refreshToken: string): Promise<{
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
//# sourceMappingURL=user.repository.d.ts.map