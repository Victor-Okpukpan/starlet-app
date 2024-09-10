/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

export default function CourseById({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    const fetchCourseById = async () => {
      try {
        const response = await fetch(`https://courseapi-hhbl.onrender.com/api/course/${params.id}`);
        const data = await response.json(); // Convert response to JSON
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourseById();
  }, [params.id]);

  return (
    <main className="min-h-screen text-white">
      {course && (
        <>
          <div className="h-[450px] w-full">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full block object-cover"
            />
          </div>

          <div className="py-10 px-20">
            {/* Header Section */}
            <header className="mb-10">
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-sm">{course.description}</p>
              <p className="mt-2 text-gray-400">${course.price}</p>
              <p className="text-gray-400">
                Created by{" "}
                <span className="text-blue-400">{course.creatorId.name}</span>
              </p>
              <p className="text-gray-400">
                Last Updated on {new Date(course.updatedAt).toLocaleDateString()}
              </p>
            </header>

            {/* Course Content Section */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-5">Course Content</h2>
              <div className="bg-[#252525] p-6 rounded-lg shadow-md">
                {course.courseContent.map((chapter: any) => (
                  <div className="mb-6" key={chapter._id}>
                    <h3 className="text-lg font-bold">{chapter.chapterTitle}</h3>
                    <ul className="mt-2 list-disc list-inside text-sm space-y-2">
                      {chapter.topics.map((topic: string, idx: number) => (
                        <li key={idx}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Download Section */}
            {course.downloadableContent.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-5">
                  Download Course Documents
                </h2>
                <div className="space-y-3">
                  {course.downloadableContent.map((doc: any, idx: number) => (
                    <a
                      key={idx}
                      href={doc.url}
                      className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-colors"
                    >
                      <span>Downloadable Content {idx + 1}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16l4 4m0 0l4-4m-4 4V4"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>
        </>
      )}
    </main>
  );
}
