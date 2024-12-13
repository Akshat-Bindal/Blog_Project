import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";

export class Service{
    client = new Client()
    databases;
    bucket;

    constructor(){
         this.client
         .setEndpoint(conf.appwriteUrl)
         .setEndpoint(conf.appwriteProjectId)
         this.databases=new Databases(this.client)
         this.bucket= new Storage(this.client)
    }

    async createPost({title,content,slug,featuredImage,status,userID}){
        try {
            return await this.databases.createDocument(
                conf.appwriteUrlDatabaseId,
                conf.appwriteUrlCollectionId,
                slug,{
                    title,
                    content,
                    featuredImage,
                    status,
                    userID
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error",error)
        }

    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteUrlDatabaseId,
                conf.appwriteUrlCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        }
        catch(error){
            console.log("Appwrite service:: updatePost:: error",error);
        }
    }

    async deletePost({slug}){
        try {
            await this.databases.deleteDocument(
                conf.appwriteUrlDatabaseId,
                conf.appwriteUrlCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service:: deletePost:: error",error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteUrlDatabaseId,
                conf.appwriteUrlCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service:: getPost:: error",error);
        }
    }

    async getAllPost(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteUrlCollectionId,
                conf.appwriteUrlDatabaseId,
                queries,
                100,
            )
        } catch (error) {
            console.log("Appwrite service:: getAllPost:: error",error);             
        }
    }

    async uploadfile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteUrlBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service:: uploadfile:: error",error);             
        }
    }

    async deletefile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteUrlBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service:: deletefile:: error",error);  
            return false           
        }
    }

    async getFilePreview(fileId){
        try {
            return await this.bucket.getFilePreview(
                conf.appwriteUrlBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite service:: getFilePreview:: error",error);  
        }
    }
}


 const databases=new Databases()

export default Service