import { S3Client } from "@aws-sdk/client-s3";
import { R2_CONFIG } from "./r2.config.ts";

export const r2Client = new S3Client({
    endpoint: R2_CONFIG.endpoint,
    region: 'auto',
    credentials: {
        accessKeyId: R2_CONFIG.accessKeyId,
        secretAccessKey: R2_CONFIG.secretAccessKey
    },
    requestChecksumCalculation: "WHEN_REQUIRED",
    forcePathStyle: true
})
