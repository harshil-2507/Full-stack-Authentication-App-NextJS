"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
// import { useSession } from "next-auth/react";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
//
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user); // Fix here
      console.log("Signup success!", response.data); // Use response
      toast.success("Signup success!");
      router.push("/login");
    } catch (error) {
      console.log("Signup failed!", error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <h1 className="m-4">{loading ? "Processing..." : "SignUp"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 border rounded-lg mb-4 focus:outline-none focus:border-gray-900 text-black border-zinc-500"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
      />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border rounded-lg mb-4 focus:outline-none focus:border-gray-900 text-black border-zinc-500"
        id="email"
        type="email" // Use correct input type
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border rounded-lg mb-4 focus:outline-none focus:border-gray-900 text-black border-zinc-500"
        id="password"
        type="password" // Use correct input type
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <button
        onClick={onSignUp}
        disabled={buttonDisabled}
        className={`m-7 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none ${
          buttonDisabled ? "bg-gray-600 cursor-not-allowed" : "focus:border-gray-600"
        }`}
      >
        {buttonDisabled ? "Can't Sign Up Now" : "Sign Up"}
      </button>
      <Link href="/login">Already have an account? Login here</Link>
    </div>
  );
}
