"use client";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { signIn } from "next-auth/react";

export default function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex bg-[#131313] min-h-screen">
      <div className="w-full max-w-md p-8 m-auto text-white rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Start Creating On Starlet
        </h1>
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
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);

            try {
              const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
              );
              const user = userCredential.user;

              // Update the user's profile with their display name
              await updateProfile(user, { displayName: name });

              // Add user to the general 'users' collection in Firestore
              const userRef = doc(db, "users", user.uid);
              await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                name: user.displayName || "Unknown",
                role: role,
                createdAt: new Date(),
              });

              // Add user to the specific collection based on their role
              if (role === "creator") {
                // Make a POST request to the external API for creators
                const response = await fetch(
                  "https://courseapi-hhbl.onrender.com/api/creators",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      name: user.displayName || "Unknown", // Send the name
                      email: user.email, // Send the email
                    }),
                  }
                );

                if (!response.ok) {
                  throw new Error("Failed to create creator in external API");
                }

                const data = await response.json();
                console.log("Successfully sent data to external API:", data);

                // Add user to the 'creators' collection in Firestore and store the dbID from the API response
                const creatorRef = doc(db, "creators", user.uid);
                await setDoc(creatorRef, {
                  uid: user.uid,
                  email: user.email,
                  name: user.displayName || "Unknown",
                  dbID: data.data._id, // Store the dbID from the external API response
                  createdAt: new Date(),
                });
              } else if (role === "student") {
                const studentRef = doc(db, "students", user.uid);
                await setDoc(studentRef, {
                  uid: user.uid,
                  email: user.email,
                  name: user.displayName || "Unknown",
                  createdAt: new Date(),
                });
              }

              // Send email verification
              await sendEmailVerification(user);
              console.log("Verification email sent!");

              // Redirect to homepage or dashboard
              router.push("/");
            } catch (error) {
              console.error("Error signing up: ", error);
            } finally {
              setLoading(false);
            }
          }}
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 text-white rounded-lg bg-[#252525] border border-[#5d5d5d] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
          <div className="mb-6">
            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
              className="w-full p-3 text-white rounded-lg bg-[#252525] border border-[#5d5d5d] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 text-white rounded-lg bg-[#252525] border border-[#5d5d5d] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" selected disabled>
                Select Role
              </option>
              <option value="creator">Creator</option>
              <option value="student">Student</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={
              !email ||
              !password ||
              !passwordAgain ||
              password !== passwordAgain
            }
            className="w-full disabled:opacity-40 disabled:cursor-not-allowed py-3 bg-white text-black rounded-lg hover:bg-gray-200"
          >
            {loading ? "Signing up..." : "Continue"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Do you own an account already?{" "}
            <Link href="/sign-in" className="text-white underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden w-1/3 min-h-screen bg-gradient-to-r from-blue-500 to-blue-400 md:flex items-center justify-center">
        <div className="">
          <Image src="/vector.svg" alt="Logo Vector" width={249} height={242} />
        </div>
      </div>
    </div>
  );
}
