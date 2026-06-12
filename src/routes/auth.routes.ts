import { Router } from "express";
import { AUTH } from "../appwrite/auth";

const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const clientType = req.headers['x-client-type'] || 'Unknown Client';
    console.log(`[Auth] Attempting login for: ${email}`);

    try {

        const userSession = await AUTH.login(email, password);

        console.log(`[Auth] Successful login for: ${email}`);
        if (!userSession || !userSession.secret) {
            console.error(`[Auth] Login failed for ${email}: No session secret returned`);
            return res.status(500).json({ message: "Login failed: No session secret returned" });
        }

        const responce = {
            message: "Login successful",
            sessionId: userSession.$id,
            userId: userSession.userId,
            expires: 365 * 24 * 60 * 60 * 1000
        }
        if (clientType === "web") {
            res.cookie('appwrite_session', userSession.secret, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 365 * 24 * 60 * 60 * 1000
            });
            return res.status(200).json(
                responce
            );
        }
        return res.status(200).json({
            ...responce,
            secret: userSession.secret
        });
    } catch (error: any) {

        console.error(`[Auth] Login failed for ${email}:`, error.message);

        const statusCode = error.code || 500;
        return res.status(statusCode).json({
            message: "Login failed",
            error: error.message
        });
    }
});

export default router;