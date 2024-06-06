import db from "@/lib/db";
import { decodeToken } from "@/lib/jwt";
import Folder from "@/lib/models/Folder";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Note from "@/lib/models/Note";

export async function POST(req:Request){
    await db();

    const body = await req.json();
    const newNote = await Note.create(body);
    if(!newNote){
        return NextResponse.json({message:"Internal Server Error",success:false});
    }
    if(body.folder){
        const parent = await Folder.findByIdAndUpdate(body.folder,{
            $push:{
                notes:newNote._id
            }
        });
    }
    return NextResponse.json({message:"Success",success:true,note:newNote});
}
export async function GET(req:Request){
    await db();
    const token = await req.headers.get("authorization")?.split(" ")[1];
    if(!token){
        return NextResponse.json({message:'Unauthorized',success:false},{status:200});
    }
    const data = decodeToken(token);
    if(!data){
        return NextResponse.json({message:'JWT Server Error',success:false},{status:200});        
    }
    const id = (data as any)._id;
    if(!id){
        return NextResponse.json({message:'JWT Server Error',success:false},{status:200}); 
    }
    const notes = await Note.aggregate([
        {
            $match:{
                owner:new mongoose.Types.ObjectId(id)
            }
        },
    ]);
    if(!notes){
        return NextResponse.json({message:"Internal Server Error",success:false}); 
    }
    return NextResponse.json({message:"Success",success:true,notes});
}