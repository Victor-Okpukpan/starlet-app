import Link from "next/link";
import React from "react";

export default function Creator({
  name,
  uid,
  email,
  dbID
}: {
  name: string;
  uid: string;
  email: string;
  dbID: string;
}) {
  return (
    <Link href={`/creator/${uid}`}>
      <div className="flex flex-grow p-2 pr-10 rounded-[10px] items-center space-x-4 bg-[#383838]">
        <div className={`w-[87px] h-[77px] rounded-[10px] bg-[#60D8F4]`}></div>
        <p className="font-bold text-xl">{name}</p>
      </div>
    </Link>
  );
}
