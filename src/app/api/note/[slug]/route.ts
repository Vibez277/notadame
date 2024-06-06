import db from "@/lib/db";
import { decodeToken } from "@/lib/jwt";
import Folder from "@/lib/models/Folder";
import Note from "@/lib/models/Note";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export async function PUT(req:Request,{params}:{params:{slug:string}}){
    await db();
    console.log(params.slug)
    const token = await req.headers.get("authorization")?.split(" ")[1];
    if(!token){
        return NextResponse.json({message:'Unauthorized',success:false},{status:200});
    }
    const data = decodeToken(token);
    if(!data){
        return NextResponse.json({message:'Authentication Error',success:false},{status:200});        
    }
    const id = (data as any)._id;
    if(!id){
        return NextResponse.json({message:'Authentication Error',success:false},{status:200}); 
    }
    const user = await User.findById(id);
    if(!user){
        return  NextResponse.json({message:'Authentication Error',success:false},{status:200}); 
    }
    const body = await req.json();
    const updatedNote = await Note.findByIdAndUpdate(params.slug,body,{new:true});
    return  NextResponse.json({message:'Success',success:true},{status:200}); 
}
export async function DELETE(req:Request,{params}:{params:{slug:string}}){
    await db();
    const token = await req.headers.get("authorization")?.split(" ")[1];
    if(!token){
        return NextResponse.json({message:'Unauthorized',success:false},{status:200});
    }
    const data = decodeToken(token);
    if(!data){
        return NextResponse.json({message:'Authentication Error',success:false},{status:200});        
    }
    const id = (data as any)._id;
    if(!id){
        return NextResponse.json({message:'Authentication Error',success:false},{status:200}); 
    }
    const user = await User.findById(id);
    if(!user){
        return  NextResponse.json({message:'Authentication Error',success:false},{status:200}); 
    }
    const body = await req.json();
    const renamedFolder = await Folder.findByIdAndUpdate(params.slug,body,{new:true});
    return  NextResponse.json({message:'Success',success:true},{status:200}); 
}