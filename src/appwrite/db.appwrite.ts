import { Databases, ID, Query, Client } from "node-appwrite";

class db {

    private getIsolatedDatabase(secret: string): Databases {
        const isolatedClient = new Client()
            .setEndpoint(process.env.APPWRITE_ENDPOINT || "")
            .setProject(process.env.APPWRITE_PROJECT_ID || "")
            .setSession(secret);

        return new Databases(isolatedClient);
    }

    async createDoc(
        ownerId: string,
        fileName: string,
        fileKey: string,
        contentType: string,
        sizeBytes: number,
        category: string,
        isShared: boolean,
        secret: string,
        docHolder: string
    ) {
        try {
            const database = this.getIsolatedDatabase(secret);

            return await database.createDocument(
                process.env.APPWRITE_DATABASE_ID as string,
                process.env.APPWRITE_COLLECTION_ID as string,
                ID.unique(),
                {
                    ownerId: ownerId,
                    fileName: fileName,
                    fileKey: fileKey,
                    contentType: contentType,
                    sizeBytes: sizeBytes,
                    category: category || "Uncategorized",
                    isShared: isShared || false,
                    docHolder: docHolder || "Unknown"
                }
            )
        } catch (error: any) {
            console.log("Appwrite database err ::", error?.message || "");
        }
    }

    async getDocsByOwner(ownerId: string, secret: string) {
        try {
            const database = this.getIsolatedDatabase(secret);

            return await database.listDocuments(
                process.env.APPWRITE_DATABASE_ID as string,
                process.env.APPWRITE_COLLECTION_ID as string,
                [Query.equal("ownerId", ownerId)]
            )
        } catch (error: any) {
            console.log("Appwrite database err ::", error?.message || "");
            throw new Error(error);
        }
    }

    async getAllDocuments(secret: string) {
        try {
            const database = this.getIsolatedDatabase(secret);

            return await database.listDocuments(
                process.env.APPWRITE_DATABASE_ID as string,
                process.env.APPWRITE_COLLECTION_ID as string,
            )
        } catch (error: any) {
            console.log("Appwrite database err ::", error?.message || "");
            throw new Error(error);
        }
    }
}

export const DB = new db();