"use client";
import Courses from "@/components/Courses";
import Creator from "@/components/Creator";
import Searchbar from "@/components/Searchbar";
import { useMyContext } from "@/providers/MyContext";
// import { creators } from "@/lib/constants";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const session = useSession();

  const { creators } = useMyContext(); 

  const [currentCreator, setCurrentCreator] = useState<any>(null);

  useEffect(() => {
    // Filter creators to find the one matching the logged-in user's email
    if (creators && session?.data?.user?.email) {
      const matchingCreator = creators.find(
        (creator) => creator.email === session?.data?.user?.email
      );
      setCurrentCreator(matchingCreator);
    }
  }, [creators, session?.data?.user?.email]);

  useEffect(() => {
    if(currentCreator){
      if (session?.data?.user?.email === currentCreator?.email){
        router.push(`/creator/${currentCreator.uid}`)
      }
    }
  })

  return (
    <main className="min-h-screen text-white">
      <div className="py-4 px-14">
        <Searchbar />
        <div className=" py-16">
          <h1 className="font-bold text-xl mb-7 md:text-3xl">Creators</h1>
          <div className="flex gap-10 w-full">
            {creators.map((creator, i) => {
              return (
                <Creator
                  key={i}
                  name={creator.name}
                  uid={creator.uid}
                  email={creator.email}
                  dbID={creator.dbID}
                />
              );
            })}
          </div>
        </div>

        <div className="">
          <h1 className="font-bold text-xl mb-7 md:text-3xl">Courses</h1>
          <Courses />
        </div>
      </div>
    </main>
  );
}

Home.requireAuth = true;
