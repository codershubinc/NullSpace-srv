import { Client } from "node-appwrite";


export const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || "")
    .setProject(process.env.APPWRITE_PROJECT_ID || "")
    .setDevKey(process.env.APPWRITE_API_DEV_KEY || "")
    .setKey(process.env.APPWRITE_API_KEY || "");


