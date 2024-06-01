import db from "@/lib/db";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

type body = {
    email:string,
    password:string,
    username:string
}
export async function POST(req:Request, res:NextResponse){
    await db();
    const body:body = await req.json();
    const user = await User.findOne({email:body.email});
    if(user){
        return NextResponse.json({message:"user already exists.",success:false},{status:200});
    }
    const newUser = new User(body);
    await newUser.save();
    return NextResponse.json({message:"Successful Sign Up.",success:true},{status:200});
}