import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client=new Client()
    account

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setEndpoint(conf.appwriteProjectId);
        this.account=new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
            const userAccount= await this.client.account(ID.unique(),email,password,name)
        if (userAccount){
            //call method fo login so that user gets automatically logged in after signup
            return this.login({email,password})
        }
        else{
            return userAccount
        }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password)
        }
        catch(error){
            return error
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch (error){
            console.log("Appwrite service:: getCurrentUser :: error",error)
        }
    }


    async logout(){
        try{
            await this.account.deleteSessions();
        }
        catch (error){
            console.log("Appwrite service:: logout :: error",error)
        }

    }
}

const authService= new AuthService()

export default authService