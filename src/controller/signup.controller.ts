import { Request, Response } from "express";
import { SignUpService } from './../servcice/signup.service';

export class SignUpController {
    public static async signUp(req: Request, res: Response): Promise<void> {
        const { userName, email, password } = req.body
        try {
            const result = await SignUpService.signUp(userName, password, email);
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    }
}