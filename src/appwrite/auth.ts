import { Account, AppwriteException } from "node-appwrite";
import { client } from "./client.ts";

class auth {
    account = new Account(client);
    async login(
        email: string,
        password: string,
    ) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Appwrite Exception login ::", (error as AppwriteException).message);
            throw new Error((error as AppwriteException).message);
        }
    }

}
export const AUTH = new auth();