import { Router } from "express";
import { DB } from "../appwrite/db.appwrite";
import { requireAuth, type AuthRequest } from "../middleware/auth.middleware";

const router = Router();

router.post('/', requireAuth, async (req: AuthRequest, res) => {
    try {
        const { fileName, fileKey, contentType, sizeBytes, category, isShared, docHolder } = req.body;

        if (!fileName || !fileKey || !contentType || !sizeBytes || fileKey === 'undefined') {
            return res.status(400).json({ message: "Missing required document metadata" });
        }
        const secret = req.headers.authorization!.split(" ")[1];

        const newDocument = await DB.createDoc(
            req.user!.$id,
            fileName,
            fileKey,
            contentType,
            sizeBytes,
            category,
            isShared,
            secret || "",
            docHolder

        );

        return res.status(201).json({
            newDocument
        });

    } catch (error: any) {
        console.error("[Database] Failed to save document:", error.message);
        return res.status(500).json({ message: "Failed to save document metadata" });
    }
});

router.get('/', requireAuth, async (req: AuthRequest, res) => {
    try {
        const secret = req.headers.authorization!.split(" ")[1];
        const documentList = await DB.getAllDocuments(secret || "");

        console.log("Documents :: ", documentList);

        return res.status(200).json(documentList);

    } catch (error: any) {
        console.error("[Database] Failed to fetch vault:", error.message);
        return res.status(500).json({ message: "Failed to retrieve vault contents" });
    }
});


export default router;