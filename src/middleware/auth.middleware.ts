import type { Request, Response, NextFunction } from "express";
import { Client, Account } from "node-appwrite";


export interface AuthRequest extends Request {
    user?: {
        $id: string;
        email: string;
        name: string;
    };
}

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("AuthHeaders", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: Missing session token" });
        }

        const secret = authHeader.split(" ")[1];


        const client = new Client()
            .setEndpoint(process.env.APPWRITE_ENDPOINT as string)
            .setProject(process.env.APPWRITE_PROJECT_ID as string)
            .setSession(secret || "");

        const account = new Account(client);

        const user = await account.get();

        req.user = {
            $id: user.$id,
            email: user.email,
            name: user.name
        };

        next();

    } catch (error: any) {
        console.error("[Auth Middleware] Intrusion blocked:", error.message);
        return res.status(401).json({ message: "Unauthorized: Invalid or expired session" });
    }
};