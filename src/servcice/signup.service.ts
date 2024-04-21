import { User } from "@prisma/client";
import { prismaClient } from "../../prisma/client";
import bcrypt from "bcrypt";

export class SignUpService {
    public static async signUp(userName: string, password: string, email: string): Promise<User | undefined> {
        try {
            const userRepo = prismaClient.user;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user: User | null = await userRepo.findUnique({ where: { email } });
            if (user) {
                throw new Error("User already exists");
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
            console.log(error);
        }
    }
}