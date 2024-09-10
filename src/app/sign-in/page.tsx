"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex bg-[#131313] h-screen">
      <div className="w-full max-w-md p-8 m-auto text-white rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back!</h1>
        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-transparent rounded-lg mb-4 border border-[#5d5d5d] text-white"
        >
          <FcGoogle className="w-5 h-5" />
          Continue with Google
        </button>
        <div className="flex items-center justify-center mb-4">
          <span className="text-gray-500">or</span>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn("credentials", {
              email,
              password,
              redirect: true,
              callbackUrl: "/",
            });
          }}
        >
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 text-white rounded-lg bg-[#252525] border border-[#5d5d5d] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 text-white rounded-lg bg-[#252525] border border-[#5d5d5d] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={!email || !password}
            className="w-full py-3 bg-white text-black rounded-lg hover:bg-gray-200"
          >
            Continue
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-white underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden w-1/3 h-full bg-gradient-to-r from-blue-500 to-blue-400 md:flex items-center justify-center">
        <div className="">
          <Image src="/vector.svg" alt="Logo Vector" width={249} height={242} />
        </div>
      </div>
    </div>
  );
}
