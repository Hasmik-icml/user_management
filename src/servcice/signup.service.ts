import { User } from "@prisma/client";
import { prismaClient } from "../../prisma/client";
import bcrypt from "bcrypt";
import { BadRequestError } from "./badrequestError.handler";

export class SignUpService {
    public static async signUp(userName: string, password: string, email: string): Promise<User | undefined | Error> {
        try {
            const userRepo = prismaClient.user;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user: User | null = await userRepo.findUnique({ where: { email } });
            if (user) {
                throw new BadRequestError("User already exists");
            }
            const userCreated: User = await userRepo.create({
                data: {
                    username: userName,
                    email: email,
                    password: hashedPassword,
                }
            });
            return userCreated;
        } catch (error) {
            console.log(555, error)
            return <Error>error;
        }
    }
}