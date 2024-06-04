import db from "@/lib/db";
import { decodeToken } from "@/lib/jwt";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

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

    const user = await User.findById(id);
    if(!user){
        return NextResponse.json({message:'Internal Server Error',success:false},{status:500}); 
    }
    return NextResponse.json({message:'Success',success:true,user},{status:200}); 
}