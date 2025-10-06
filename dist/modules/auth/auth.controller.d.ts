import type { Request, Response } from "express";
export declare const register: (req: Request, res: Response) => Promise<void>;
export declare const getLoggedInUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const login: (req: Request, res: Response) => Promise<void>;
export declare const logout: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map