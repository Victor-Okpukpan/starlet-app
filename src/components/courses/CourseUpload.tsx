/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { useState } from "react";

export default function CourseUpload({
  dbID,
  course,
  setEditCourse,
  setSelectedCourse
}: {
  dbID: string;
  course?: any;
  setEditCourse?: any;
  setSelectedCourse?: any;
}) {
  const [title, setTitle] = useState(course ? course.title : "");
  const [displayImage, setDisplayImage] = useState<Blob | MediaSource | null>(
    null
  );
  const [description, setDescription] = useState(
    course ? course.description : ""
  );
  const [image, setImage] = useState<string>(course ? course.image : "");
  const [price, setPrice] = useState<number | string>(
    course ? course.price : ""
  );
  const [courseContent, setCourseContent] = useState(
    course ? course.courseContent : [{ chapterTitle: "", topics: [""] }]
  );
  const [downloadableContent, setDownloadableContent] = useState<string[]>(
    course ? course.downloadableContent : [""]
  );
  console.log(downloadableContent);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setDisplayImage(file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "images");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dmzgojgng/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.secure_url;
      setImage(imageUrl);
    }
  };

  const handleCourseContentChange = (
    index: number,
    key: string,
    value: string | string[]
  ) => {
    const updatedContent = [...courseContent];
    updatedContent[index] = { ...updatedContent[index], [key]: value };
    setCourseContent(updatedContent);
  };

  const addNewChapter = () => {
    setCourseContent([...courseContent, { chapterTitle: "", topics: [""] }]);
  };

  const addTopic = (chapterIndex: number) => {
    const updatedContent = [...courseContent];
    updatedContent[chapterIndex].topics.push("");
    setCourseContent(updatedContent);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "fileUploads"); // Ensure this preset is configured on your Cloudinary account

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dmzgojgng/raw/upload`, // 'raw' is the resource type for non-image files
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // After successful upload, store the URL in the state
        const fileUrl = response.data.secure_url;

        // Add the file URL to the downloadableContent array
        setDownloadableContent((prev) => [...prev, fileUrl]);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("click");

    if (!image || !downloadableContent) return;

    const payload = {
      title,
      description,
      image,
      creatorId: dbID,
      courseContent,
      price: Number(price),
      downloadableContent,
    };

    try {
      const response = await fetch(
        course
          ? `https://courseapi-hhbl.onrender.com/api/course/${course._id}` // Update course if editing
          : "https://courseapi-hhbl.onrender.com/api/course", // Create new course
        {
          method: course ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Error response body:", responseData);
        throw new Error("Failed to save course");
      }

      console.log(
        course
          ? "Course updated successfully:"
          : "Course created successfully:",
        responseData
      );

      setEditCourse(false);
      setSelectedCourse(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full">
        <h1 className="text-3xl font-bold mb-5">Course Landing Page</h1>
        <p className="mb-10 text-gray-400">
          Share the knowledge you have in any format, from document to videos
          and even audio.
        </p>

        {/* Course Title */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2" htmlFor="title">
            Course Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Name your course"
            className="w-full p-4 rounded-md bg-gray-800 border border-gray-600 text-gray-300"
            required
          />
        </div>

        {/* Course Description */}
        <div className="mb-6">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="description"
          >
            Course Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your course"
            className="w-full p-4 rounded-md bg-gray-800 border border-gray-600 text-gray-300"
            rows={5}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2" htmlFor="price">
            Course Price
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter the price"
            className="w-full p-4 rounded-md bg-gray-800 border border-gray-600 text-gray-300"
            required
          />
        </div>

        {/* Course Content */}
        <div className="mb-6">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="courseContent"
          >
            Course Content
          </label>
          {courseContent.map((chapter: any, index: any) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                value={chapter.chapterTitle}
                onChange={(e) =>
                  handleCourseContentChange(
                    index,
                    "chapterTitle",
                    e.target.value
                  )
                }
                placeholder={`Chapter ${index + 1} Title`}
                className="w-full p-2 mb-2 rounded-md bg-gray-800 border border-gray-600 text-gray-300"
              />
              {chapter.topics.map((topic: any, topicIndex: any) => (
                <input
                  key={topicIndex}
                  type="text"
                  value={topic}
                  onChange={(e) => {
                    const updatedTopics = [...chapter.topics];
                    updatedTopics[topicIndex] = e.target.value;
                    handleCourseContentChange(index, "topics", updatedTopics);
                  }}
                  placeholder={`Topic ${topicIndex + 1}`}
                  className="w-full p-2 mb-2 rounded-md bg-gray-700 border border-gray-500 text-gray-300"
                />
              ))}
              <button
                type="button"
                onClick={() => addTopic(index)}
                className="text-sm text-blue-400"
              >
                + Add Topic
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addNewChapter}
            className="text-sm text-blue-400"
          >
            + Add Chapter
          </button>
        </div>

        {/* Downloadable Content */}
        <div className="mb-6">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="downloadableContent"
          >
            Upload Downloadable Content (PDF/Video)
          </label>
          <input
            type="file"
            accept="application/pdf,video/*"
            onChange={handleFileUpload}
            className="w-full p-4 rounded-md bg-gray-800 border border-gray-600 text-gray-300"
          />
        </div>

        {/* Course Image */}
        <div className="mb-10">
          <label className="block text-lg font-semibold mb-2">
            Course Image
          </label>
          <div className="bg-gray-800 border border-gray-600 rounded-md p-4 flex items-center justify-center flex-col">
            {displayImage ? (
              <img
                src={URL.createObjectURL(displayImage)}
                alt="Course"
                className="h-40 w-full object-cover rounded-md"
              />
            ) : (
              <div className="flex items-center justify-center h-40 w-full border-dashed border-2 border-gray-600 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-12 h-12 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="upload"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="upload"
              className="mt-3 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm cursor-pointer"
            >
              Upload File
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 py-4 rounded-md text-lg font-semibold text-white transition-colors"
        >
          {course ? "Update Course" : "Create Course"}
        </button>
      </form>
    </main>
  );
}
