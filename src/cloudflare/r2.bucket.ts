import { PutObjectCommand } from "@aws-sdk/client-s3";
import { R2_CONFIG } from "./r2.config";
import { r2Client } from "./r2.client";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

class r2 {
    async getUploadUrl(
        filename: string,
        contentType: string
    ) {
        try {
            const command = new PutObjectCommand({
                Bucket: R2_CONFIG.bucketName,
                Key: filename,
                ContentType: contentType,
            });

            const signedUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 });
            console.log('Signed url', signedUrl);

            return signedUrl;
        } catch (error: any) {
            console.error("[Storage] Upload URL generation failed:", error);
            throw new Error("Failed to generate upload URL");
        }
    }

    async getDownloadUrl(
        filename: string
    ) {
        try {
            const command = new PutObjectCommand({
                Bucket: R2_CONFIG.bucketName,
                Key: filename,
            });

            const signedUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 });
            console.log('Signed url', signedUrl);

            return signedUrl;
        } catch (error: any) {
            console.error("[Storage] Download URL generation failed:", error);
            throw new Error("Failed to generate download URL");
        }
    }
}
export const R2 = new r2();