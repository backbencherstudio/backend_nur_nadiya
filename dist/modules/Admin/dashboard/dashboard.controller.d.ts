import { Request, Response } from "express";
export declare const getDashboardData: (req: Request, res: Response) => Promise<void>;
export declare const getAllEnquiries: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const changeEnquiryStatus: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=dashboard.controller.d.ts.map