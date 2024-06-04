import db from "@/lib/db";
import { decodeToken } from "@/lib/jwt";
import Folder from "@/lib/models/Folder";
import { NextResponse } from "next/server";
import { folderCommonAggregation } from "./aggregation";
import mongoose from "mongoose";

export async function POST(req:Request){
    await db();

    const body = await req.json();
    const newFolder = await Folder.create(body);
    if(!newFolder){
        return NextResponse.json({message:"Internal Server Error",success:false});
    }
    if(body.parent){
        const parent = await Folder.findByIdAndUpdate(body.parent,{
            $push:{
                subfolders:newFolder._id
            }
        });
    }
    return NextResponse.json({message:"Success",success:true,folder:newFolder});
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
    const folders = await Folder.aggregate([
        {
            $match:{
                owner:new mongoose.Types.ObjectId(id)
            }
        },
        ...folderCommonAggregation()
    ]);
    console.log(folders[0].subfolders);
    if(!folders){
        return NextResponse.json({message:"Internal Server Error",success:false}); 
    }
    return NextResponse.json({message:"Success",success:true,folders});
}