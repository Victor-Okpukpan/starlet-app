/* eslint-disable @next/next/no-img-element */
"use client";

import CourseUpload from "@/components/courses/CourseUpload";
import CreatePostModal from "@/components/posts/CreatePostModal";
import { useMyContext } from "@/providers/MyContext";
import { useState, useEffect } from "react";
import { db } from "@/app/firebase"; // Adjust based on your project structure
import { doc, getDoc } from "firebase/firestore";

export default function CreatorById({ params }: { params: { id: string } }) {
  const uid = params.id;

  const [active, setActive] = useState("home");
  const [addCourse, setAddCourse] = useState(false);
  const [editCourse, setEditCourse] = useState(false); // new state for edit mode
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [makePost, setMakePost] = useState(false);
  const [creatorData, setCreatorData] = useState<any>(null); // State to store the creator's data
  const [courses, setCourses] = useState<any[]>([]); // State to store the courses
  const { isAdmin } = useMyContext();

  const handleEdit = (course: any) => {
    setEditCourse(true);
    setSelectedCourse(course); // Set the selected course to pass it to the CourseUpload
  };

  useEffect(() => {
    const fetchCreatorData = async () => {
      if (!uid) return;

      try {
        const creatorDocRef = doc(db, "creators", uid); // Reference to the specific creator document
        const creatorSnapshot = await getDoc(creatorDocRef);

        if (creatorSnapshot.exists()) {
          setCreatorData(creatorSnapshot.data()); // Store the creator's data in state
        } else {
          console.log("No such creator!");
        }
      } catch (error) {
        console.error("Error fetching creator data:", error);
      }
    };

    fetchCreatorData();
  }, [uid]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "https://courseapi-hhbl.onrender.com/api/course"
        );
        const data = await response.json();

        // Filter courses based on the logged-in creator's ID
        const filteredCourses = data.filter(
          (course: any) => course.creatorId._id === creatorData?.dbID
        );

        setCourses(filteredCourses); // Update the state with filtered courses
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    if (creatorData?.dbID) {
      fetchCourses(); // Fetch courses when the creatorData is available
    }
  }, [creatorData]);

  return (
    <main className="min-h-screen relative text-white">
      <div
        style={{
          background: "linear-gradient(93.77deg, #2B54B8 0%, #60D8F4 95.76%)",
        }}
        className="h-[240px] w-full"
      ></div>
      <div className="py-4">
        <div className="border-b px-14">
          <div className="flex mb-32 items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-[146px] h-[146px] rounded-full bg-[#60D8F4] border border-[#2B54B8]"></div>
              <div className="">
                <p className="text-white font-bold text-2xl md:text-5xl">
                  {creatorData && creatorData.name}
                </p>
                <p className="text-[#666666] font-medium text-base md:text-xl">
                  I teach design
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              {isAdmin ? (
                <>
                  <button
                    onClick={() => setMakePost(true)}
                    className="rounded-[10px] flex items-center gap-2 bg-white py-3 px-8 font-medium text-base md:text-xl text-[#171717]"
                  >
                    <div className="bg-[#171717] h-[18px] w-[18px] rounded-md"></div>
                    Create
                  </button>
                  <div className="bg-[#404040] rounded-[10px] py-3 px-4">
                    ...
                  </div>
                </>
              ) : (
                <>
                  <button className="rounded-[10px] bg-white py-3 px-8 font-medium text-base md:text-xl text-[#171717]">
                    Follow
                  </button>
                  <div className="bg-[#404040] rounded-[10px] py-3 px-4">
                    ...
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="space-x-11 w-max mx-auto">
            <button
              onClick={() => setActive("home")}
              className={`${
                active === "home" ? "text-[#60D8F4]" : "text-white"
              } font-medium text-base md:text-xl transition-all duration-200 ease-in-out`}
            >
              Home
              <div
                className={`${
                  active === "home" ? "bg-[#60D8F4]" : "bg-transparent"
                } w-full h-1  rounded-[10px] mt-4 transition-all duration-200 ease-in-out`}
              ></div>
            </button>
            <button
              onClick={() => setActive("about")}
              className={`${
                active === "about" ? "text-[#60D8F4]" : "text-white"
              } font-medium text-base md:text-xl transition-all duration-200 ease-in-out`}
            >
              About
              <div
                className={`${
                  active === "about" ? "bg-[#60D8F4]" : "bg-transparent"
                } w-full h-1  rounded-[10px] mt-4 transition-all duration-200 ease-in-out`}
              ></div>
            </button>
            <button
              onClick={() => setActive("courses")}
              className={`${
                active === "courses" ? "text-[#60D8F4]" : "text-white"
              } font-medium text-base md:text-xl transition-all duration-200 ease-in-out`}
            >
              Courses
              <div
                className={`${
                  active === "courses" ? "bg-[#60D8F4]" : "bg-transparent"
                } w-full h-1  rounded-[10px] mt-4 transition-all duration-200 ease-in-out`}
              ></div>
            </button>
            <button
              onClick={() => setActive("membership")}
              className={`${
                active === "membership" ? "text-[#60D8F4]" : "text-white"
              } font-medium text-base md:text-xl transition-all duration-200 ease-in-out`}
            >
              Membership
              <div
                className={`${
                  active === "membership" ? "bg-[#60D8F4]" : "bg-transparent"
                } w-full h-1  rounded-[10px] mt-4 transition-all duration-200 ease-in-out`}
              ></div>
            </button>
          </div>
        </div>
        <div className="px-14">
          {active === "home" && (
            <>
              {isAdmin ? (
                <div className="py-14">
                  <div className="w-[116px] mx-auto h-[116px] rounded-full bg-[#252525]"></div>
                  <div className="w-full text-center">
                    <p className="font-bold text-xl text-white my-3 md:text-3xl">
                      Nothing here yet
                    </p>
                    <p className="font-medium text-xs md:text-base">
                      Here’s your sign to start sharing content for your fans!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-14">
                  <div className="w-[116px] mx-auto h-[116px] rounded-full bg-[#252525]"></div>
                  <div className="w-full text-center">
                    <p className="font-bold text-xl text-white my-3 md:text-3xl">
                      Nothing here yet
                    </p>
                    <p className="font-medium text-xs md:text-base">
                      This creator is yet to make a post
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {active === "about" && (
            <>
              {isAdmin ? (
                <div className="py-14">
                  <div className="w-[116px] mx-auto h-[116px] rounded-full bg-[#252525]"></div>
                  <div className="w-full text-center">
                    <p className="font-bold text-xl text-white my-3 md:text-3xl">
                      Tell us about yourself
                    </p>
                    <p className="font-medium text-xs md:text-base">
                      Write a short description about yourself and the magic you
                      would be creating here on Starlet.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-14">
                  <div className="w-[116px] mx-auto h-[116px] rounded-full bg-[#252525]"></div>
                  <div className="w-full text-center">
                    <p className="font-bold text-xl text-white my-3 md:text-3xl">
                      This creator is being secretive for now
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* For courses */}
          {active === "courses" && (
            <>
              {isAdmin ? (
                <div className="py-14">
                  <div className="flex items-center justify-between">
                    {!addCourse && !editCourse && (
                      <>
                        <p className="text-white font-bold text-2xl md:text-4xl">
                          Courses
                        </p>
                        {isAdmin && (
                          <button
                            onClick={() => setAddCourse(true)}
                            className="rounded-[10px] bg-[#404040] py-3 px-8 font-medium text-base md:text-xl text-white"
                          >
                            + Create Course
                          </button>
                        )}
                      </>
                    )}
                  </div>
                  {!addCourse && !editCourse ? (
                    <div className="flex flex-col w-full gap-6 mt-6">
                      {/* Display filtered courses */}
                      {courses.length > 0 ? (
                        courses.map((course) => (
                          <div
                            key={course._id}
                            className="bg-[#151515] flex-1 rounded-lg shadow-md p-6 relative"
                          >
                            <img
                              src={course.image}
                              alt={course.title}
                              className="rounded-lg w-full object-cover mb-4 h-48"
                            />
                            <div className="text-white">
                              <h3 className="font-bold text-xl mb-2">
                                {course.title}
                              </h3>
                              <p className="text-gray-400 mb-4">
                                {course.description}
                              </p>
                              <div className="flex justify-between items-center mt-4">
                                {/* Show edit button instead of buy */}
                                {isAdmin ? (
                                  <button
                                    onClick={() => handleEdit(course)}
                                    className="text-white py-2 px-6 rounded-lg font-semibold bg-blue-500"
                                  >
                                    Edit
                                  </button>
                                ) : (
                                  <button
                                    style={{
                                      background:
                                        "linear-gradient(90deg, #2B54B8 0%, #60D8F4 100%)",
                                    }}
                                    className="text-white py-2 px-6 rounded-lg font-semibold"
                                  >
                                    Buy ${course.price} USD
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-gray-500">
                          No courses available at the moment.
                        </div>
                      )}
                    </div>
                  ) : editCourse ? (
                    // If in edit mode, show CourseUpload for editing
                    <CourseUpload
                      course={selectedCourse}
                      dbID={creatorData.dbID}
                      setEditCourse={setEditCourse}
                      setSelectedCourse={
                        setSelectedCourse}
                    />
                  ) : (
                    <CourseUpload dbID={creatorData.dbID} />
                  )}
                </div>
              ) : (
                <div className="py-14">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-bold text-2xl md:text-4xl">
                      Courses
                    </p>
                  </div>
                  <div className="flex flex-col gap-6 mt-6">
                    {/* Display filtered courses for non-admin users */}
                    {courses.length > 0 ? (
                      courses.map((course) => (
                        <div
                          key={course._id}
                          className="bg-[#151515] rounded-lg shadow-md p-6 relative"
                        >
                          <img
                            src={course.image}
                            alt={course.title}
                            className="rounded-lg w-full object-cover mb-4 h-48"
                          />
                          <div className="text-white">
                            <h3 className="font-bold text-xl mb-2">
                              {course.title}
                            </h3>
                            <p className="text-gray-400 mb-4">
                              {course.description}
                            </p>
                            <div className="flex items-center mt-4">
                              <button
                                style={{
                                  background:
                                    "linear-gradient(90deg, #2B54B8 0%, #60D8F4 100%)",
                                }}
                                className="text-white py-2 px-6 rounded-lg font-semibold"
                              >
                                Buy ${course.price} USD
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500">
                        No courses available at the moment.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {active === "membership" && (
            <>
              {isAdmin ? (
                <div className="py-14">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-bold text-2xl md:text-4xl">
                      Membership
                    </p>
                    {isAdmin && (
                      <button className="rounded-[10px] bg-[#404040] py-3 px-8 font-medium text-base md:text-xl text-white">
                        + Create Membership
                      </button>
                    )}
                  </div>
                  <div className="">
                    <div className="w-[116px] mx-auto h-[116px] rounded-full bg-[#252525]"></div>
                    <div className="w-full text-center">
                      <p className="font-bold text-xl text-white my-3 md:text-3xl">
                        No membership yet
                      </p>
                      <p className="font-medium text-xs md:text-base">
                        Create exclusive memberships for your fans.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-14">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-bold text-2xl md:text-4xl">
                      Membership
                    </p>
                    {isAdmin && (
                      <button className="rounded-[10px] bg-[#404040] py-3 px-8 font-medium text-base md:text-xl text-white">
                        + Create Membership
                      </button>
                    )}
                  </div>
                  <div className="">
                    <div className="w-[116px] mx-auto h-[116px] rounded-full bg-[#252525]"></div>
                    <div className="w-full text-center">
                      <p className="font-bold text-xl text-white my-3 md:text-3xl">
                        No membership yet
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {makePost && <CreatePostModal setMakePost={setMakePost} />}
    </main>
  );
}
