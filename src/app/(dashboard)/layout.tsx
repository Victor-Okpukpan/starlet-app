/* eslint-disable @next/next/no-img-element */
"use client";
import { adminNavLinks, navLinks } from "@/lib/constants";
import { useMyContext } from "@/providers/MyContext";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";
import { IoMdSettings } from "react-icons/io";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin } = useMyContext();
  const pathname = usePathname();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/sign-in");
    },
  });

  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const isPath = (path: string) => {
    return path === pathname;
  };

  const navItems = isAdmin ? adminNavLinks : navLinks;

  return (
    <main>
      <div className="relative max-w-[1400px] mx-auto">
        <div className="bg-[#252525] fixed top-0 bottom-0 px-4 py-14">
          <Image
            src="/vector.svg"
            alt="Logo Vector"
            width={34.4}
            height={33.56}
            className="mb-11"
          />
          <div className="flex flex-col h-full pb-12">
            <div className="flex-1">
              {navItems.map((links, i) => {
                return (
                  <Link key={i} href={links.link}>
                    <div
                      className={`${
                        isPath(links.link) && "bg-[#383838]"
                      }  flex items-center transition-all ease-out duration-200 px-4 py-3 space-x-3 my-3 rounded-[10px]`}
                    >
                      <div
                        className={`${
                          isPath(links.link) ? "bg-white" : "bg-[#A8A8A8]"
                        } w-[15px] h-[15px] rounded`}
                      ></div>
                      <span
                        className={`${
                          isPath(links.link) ? "text-white" : "text-[#A8A8A8]"
                        } font-medium md:text-base`}
                      >
                        {links.label}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center justify-between relative">
              {/* User info section */}
              <div className="flex items-center space-x-3">
                <div className="h-[35px] w-[35px] rounded-full bg-[#60D8F4] overflow-hidden"></div>
                <div className="">
                  <p className="text-white font-medium text-xs">
                    {session?.data?.user?.name}
                  </p>
                  <p className="text-[#A8A8A8] text-xs font-medium">
                    {isAdmin ? "Creator" : "Member"}
                  </p>
                </div>
              </div>

              {/* Settings icon */}
              <IoMdSettings
                onClick={toggleSettings} // Toggle settings box visibility
                className="text-white text-xl cursor-pointer"
              />

              {/* Settings box */}
              {showSettings && (
                <div className="absolute -top-10 right-0 bg-[#151515] shadow-lg rounded-lg py-2 px-4 z-10">
                  <button
                    className="text-white text-sm"
                    onClick={() => signOut()}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-black pl-[188px]">{children}</div>
      </div>
    </main>
  );
}
