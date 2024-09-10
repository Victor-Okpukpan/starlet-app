import React from "react";
import { FaSearch } from "react-icons/fa";

export default function Searchbar() {
  return (
    <div className="bg-[#383838] text-white md:text-base max-w-[640px] mx-auto rounded-full flex items-center space-x-2 py-4 px-6">
      <FaSearch className="text-[#FFFFFF80]" />
      <input
        type="text"
        placeholder="Search for a creator or course"
        className="bg-transparent flex-grow outline-none"
      />
    </div>
  );
}
