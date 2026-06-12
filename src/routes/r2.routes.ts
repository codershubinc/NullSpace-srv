import { Router } from "express";
import { R2 } from "../cloudflare/r2.bucket";
import { requireAuth, type AuthRequest } from "../middleware/auth.middleware";

const router = Router();

router.post('/presigned_upload_uri', requireAuth, async (req: AuthRequest, res) => {
    const { fileName, contentType } = req.body;
    if (!fileName || !contentType) {
        return res.status(400).json({ message: "Filename and content type are required" });
    }
    try {
        const signedUrl = await R2.getUploadUrl(req.user!.$id + "/" + Date.now() + "_" + fileName, contentType);
        return res.status(200).json({
            signedUrl: signedUrl,
            fileKey: req.user!.$id + "/" + Date.now() + "_" + fileName
        });
    } catch (error: any) {
        console.error("[R2] Failed to generate signed URL:", error);
        return res.status(500).json({ message: "Failed to generate signed URL", error: error.message });
    }
});

router.post('/presigned_download_uri', async (req, res) => {
    const { fileName } = req.body;
    if (!fileName) {
        return res.status(400).json({ message: "Filename is required" });
    }
    try {
        const signedUrl = await R2.getDownloadUrl(fileName);
        return res.status(200).json({ signedUrl });
    } catch (error: any) {
        console.error("[R2] Failed to generate signed URL:", error);
        return res.status(500).json({ message: "Failed to generate signed URL", error: error.message });
    }
});

export default router;