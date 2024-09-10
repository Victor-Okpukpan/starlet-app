"use client"
import { useRouter } from "next/navigation";
import { FaCartPlus } from "react-icons/fa";

/* eslint-disable @next/next/no-img-element */
interface ICourseItem {
  imageUrl: string;
  title: string;
  description: string;
  price?: number;
  link?: string;
  id?: string;
  bought?: boolean;
}

export default function CourseItem({
  imageUrl,
  title,
  description,
  bought,
  id,
  price,
  link,
}: ICourseItem) {
  const router = useRouter();

  return (
    <div className="bg-[#383838] flex flex-col relative overflow-hidden rounded-[10px] p-2">
      <div className="w-full rounded-[8px] overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full" />
      </div>
      <div className="mb-14">
        <h1 className="font-bold text-lg mt-3 mb-1 md:text-2xl">{title}</h1>
        <p className="text-[#A8A8A8] text-xs">{description}</p>
      </div>
      <button
        style={{
          background: "linear-gradient(90deg, #2B54B8 0%, #60D8F4 100%)",
        }}
        onClick={() => {
          if(bought === true){
            router.push(`/my-courses/${id}`)
          }
        }}
        className="w-full text-xl py-4 rounded-[8px] flex mt-auto items-center justify-center"
      >
        {bought === true ? (
          "View Course"
        ) : (
          <>
            <FaCartPlus />
            <span>Buy ${price} USD</span>
          </>
        )}
      </button>
    </div>
  );
}
