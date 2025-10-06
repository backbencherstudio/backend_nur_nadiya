import { Request, Response } from "express";
import multer from "multer";
export declare const uploadBioData: multer.Multer;
export declare const addBioData: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getBioDataList: (req: Request, res: Response) => Promise<void>;
export declare const changeBioStatus: (req: Request, res: Response) => Promise<void>;
export declare const getBioData: (req: Request, res: Response) => Promise<void>;
export declare const deleteBioData: (req: Request, res: Response) => Promise<void>;
export declare const editBioDataById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=bioData.controller.d.ts.map