import mongoose from "mongoose";

export default async ()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/notadame");
        console.log("Connected to mongodb");
    } catch (error) {
        console.log("Db connection error: ",error);
    }
}