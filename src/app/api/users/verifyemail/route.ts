import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {
      const reqbody=await request.json()
        const {token}=reqbody
        console.log(token);
        if(!token){
            return NextResponse.json({error:"Invalid token"},{status:400})
        }
        const user = await User.findOne(
            { verifyToken: token, verifyTokenExpire: { $gt: Date.now() } },  )
         
           console.log(user);
            
        if(!user){
            return NextResponse.json({error:"user not found"},{status:400})
        }
        console.log(user);
        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpire=undefined;
        await user.save()
        return NextResponse.json({message:"Email verified successfully"},{status:200})
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
        
    }
}