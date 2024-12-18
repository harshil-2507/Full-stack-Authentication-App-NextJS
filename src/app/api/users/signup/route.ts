// get post put delete requests => to perform the CRUD operations on the user

import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username,email,password} = reqBody

        console.log(reqBody);

        //check that the user already exists
        const user = await User. findOne({email})
        if(user){
            return NextResponse.json({error:"user already exists"},{status: 400})
        }


        //hash the password 
        const salt = await bcryptjs.genSalt(10)// next js express and mongoose use 10 rounds -> it depends on the framework  ,    also the ruby uses 12 rounds 
        const hashedPassword = await bcryptjs.hash(password,salt) 

        const newUser = new User({
            username,
            email,
            password : hashedPassword
        })
        // we can do lot of validation here ... like minlength of password , required , also we can include th track of strength of password

        const savedUser = await newUser.save()
        console.log(savedUser);


        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        

    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500})//server side error status code of 5xx
    }
}   


