/* eslint-disable @next/next/no-img-element */
"use client";
import {
  adminNavLinks as defaultAdminNavLinks,
  navLinks,
} from "@/lib/constants";
import { useMyContext } from "@/providers/MyContext";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdSettings } from "react-icons/io";

export default function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, creators } = useMyContext();
  const pathname = usePathname();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/sign-in");
    },
  });

  const [showSettings, setShowSettings] = useState(false);
  const [currentCreator, setCurrentCreator] = useState<any>(null);
  const [navItems, setNavItems] = useState(
    isAdmin ? defaultAdminNavLinks : navLinks
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

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
    // Update navItems with dynamic link if the user is admin and currentCreator is available
    if (isAdmin && currentCreator) {
      const updatedAdminNavLinks = defaultAdminNavLinks.map((navItem) => {
        if (navItem.label === "My Page") {
          return {
            ...navItem,
            link: `/creator/${currentCreator.uid}`, // Assuming the UID is available in currentCreator
          };
        }
        return navItem;
      });
      setNavItems(updatedAdminNavLinks);
    }
  }, [isAdmin, currentCreator]);

  const isPath = (path: string) => {
    return path === pathname;
  };

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
