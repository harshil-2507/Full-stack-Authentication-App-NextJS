"use client";
import Link from "next/link";
import react, { useEffect } from "react";
import { useRouter } from "next/navigation"; // newest version of write next/navigation -------old version : next/react
import axios from "axios";
import {toast} from 'react-hot-toast'




export default function LoginPage(){
    const router  = useRouter();
    const [user,setUser] = react.useState({
        email : "",
        password: "",
    })

    const [buttonDisabled,setButtonDisabled] = react.useState(false);
    const[loading,setLoading] = react.useState(false);

    const onLogin = async () => {
         try {
            setLoading(true);
            const response = await axios.post("/api/users/login",user);
            console.log("Login success",response.data);
            toast.success('Login Success')
            router.push("/profile");
         } catch (error:any) {
            console.log("Login failed!",error.message);
            toast.error(error.message);
         }finally{
            setLoading(false);
         }
    }

    useEffect(()=> {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }

    },[user]);// because it's dependent on the user


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white ">
            <h1 className="m-4">{loading ? "Processing" : "Login"}</h1>
            <hr/>
            
            <label htmlFor = "username"> email </label>
            <input 
            className="p-2 border rounded-lg-mb-4 focus:outline-none focus:border-gray-900 text-black border-zinc-500"
                id="email"
                type="text"
                value={user.email}
                onChange={(e)=>setUser({...user,email : e.target.value})}
                placeholder="email"
            />
            <label htmlFor = "password"> password </label>
            <input 
            className="p-2 border rounded-lg-mb-4 focus:outline-none focus:border-gray-900 text-black border-zinc-500"
                id="password"
                type="password"
                value={user.password}
                onChange={(e)=>setUser({...user,password : e.target.value})}
                placeholder="password"
            />
            
            <button
            onClick={onLogin}
             className="m-7 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
             <Link href="/signup">New User? Signup here</Link>
        </div>
    )
}