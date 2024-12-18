// to log it out as fundamental we just need to clear out the token/cookie we have genrated while logging in
import { NextResponse } from "next/server";


export async function GET(){
    try {
        const response = NextResponse.json(
            {
                message : "logout successfull",
                success: true
            }  
        )
        response.cookies.set("token","",
            {
                httpOnly : true,
                expires:new Date(0)
            }
        );
        return response;
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500});

    }
}