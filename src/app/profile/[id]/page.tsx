import { Festive } from "next/font/google";

export default function UserProfile({params}:any){// here "any" represents any datatype of data // we have imported the id through the functionality params here 
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white bg-black">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile Page of id : <span className="p-2 rounded bg-cyan-400 text-black">{params.id}</span></p>
        </div>
    )
}