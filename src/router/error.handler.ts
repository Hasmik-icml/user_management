import { validationResult } from "express-validator";
import { Request, Response } from "express";

export async function validateRequest(req: Request, res: Response) {
    try {  
        const errors =  validationResult(req);
        console.log("222");
        if (!errors.isEmpty()) {
            console.log(errors);
            throw new Error("Bad request");
        }
    } catch (error) {
        console.log("333");
        console.log(error)
    }
}