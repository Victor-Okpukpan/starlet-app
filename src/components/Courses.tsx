"use client";

import { useState, useEffect } from "react";
import CourseItem from "./courses/CourseItem";

export default function Courses() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://courseapi-hhbl.onrender.com/api/course");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-10 w-full">
      {courses.map((course, i) => (
        <CourseItem
          key={i}
          imageUrl={course.image}
          description={course.description}
          title={course.title}
          price={course.price}
          bought={true}
          id={course._id}
        />
      ))}
    </div>
  );
}
