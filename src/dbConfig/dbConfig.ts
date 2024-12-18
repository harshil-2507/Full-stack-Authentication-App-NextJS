// do not bother about naming convention in this part
import mongoose from 'mongoose'
import { log } from 'node:console';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables


export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection  = mongoose.connection;


        connection.on('connected',()=>{
            console.log('MongoDB connected successfully');
            console.log('MONGO_URI:', process.env.MONGO_URI);
        })

        connection.on('error',(err)=>{
            
            console.log('MONGO_URI:', process.env.MONGO_URI);
            console.log('MongoDB connection error! Please make sure that mongoDB is running.' + err);
            process.exit();
        })
    } catch (error) {
        console.log('Something went wrong!');
        console.log(error);
    }
}