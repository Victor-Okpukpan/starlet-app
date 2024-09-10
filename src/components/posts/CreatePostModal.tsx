/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { BiImageAdd } from "react-icons/bi";

export default function CreatePostModal({
  setMakePost,
}: {
  setMakePost: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [postContent, setPostContent] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [visibility, setVisibility] = useState("Public");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      // Reset height to auto to calculate the correct height
      textAreaRef.current.style.height = "auto";
      // Adjust the height to match the content, but limit it
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = `${Math.min(scrollHeight, 150)}px`; // Max height of 150px
    }
  }, [postContent]);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
    }
  };

  const handlePostSubmit = () => {
    // Handle post submission to the backend here
    console.log({
      content: postContent,
      media,
      visibility,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#383838] text-white w-[780px] p-6 rounded-lg relative">
        {/* Close Modal Button */}
        <button
          className="absolute top-3 right-3 text-white text-lg"
          onClick={() => {
            setMakePost(false);
          }}
        >
          &times;
        </button>

        {/* Visibility Selector */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="bg-[#60D8F4] h-16 w-16 rounded-full"></div>
            <div className="ml-2">
              <p className="font-semibold">Emma Etim</p>
              <select
                className="bg-[#252525] outline-none px-2 py-1 rounded-lg text-sm"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
          </div>
        </div>

        {/* Post Content Input */}
        <textarea
          ref={textAreaRef}
          className="bg-transparent outline-none first-letter:uppercase w-full h-20 p-3 rounded-lg resize-none mb-4 placeholder-gray-500"
          placeholder="Start creating"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          rows={1}
          style={{ maxHeight: "150px", overflowY: "auto" }}
        />

        {/* Media Preview */}
        {media && (
          <div className="relative mb-4">
            <img
              src={URL.createObjectURL(media)}
              alt="Uploaded media"
              className="w-full h-40 object-cover rounded-lg"
            />
            <button
              className="absolute top-1 right-1 bg-black bg-opacity-50 p-1 rounded-full text-white"
              onClick={() => setMedia(null)}
            >
              &times;
            </button>
          </div>
        )}

        {/* Add Media */}
        <div className="flex border-2 border-[#252525] py-4 px-6 rounded-[10px] items-center justify-between mb-4">
          <div className="">
            <p className="font-bold text-xl">Add to post</p>
          </div>
          <div className="flex space-x-3">
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*,video/*"
                onChange={handleMediaUpload}
              />
              <BiImageAdd />
            </label>

            {/* Other media options can be added here */}
          </div>
        </div>

        {/* Post Button */}
        <button
          onClick={handlePostSubmit}
          disabled={!postContent && !media}
          className={`w-full py-2 rounded-lg font-semibold ${
            postContent || media
              ? "bg-white/90 hover:bg-white text-black"
              : "bg-gray-600 cursor-not-allowed text-white"
          }`}
        >
          Post
        </button>
      </div>
    </div>
  );
}
