import CourseItem from "@/components/courses/CourseItem";
import Searchbar from "@/components/Searchbar";
import { courses } from "@/lib/constants";

export default function MyCourses() {
  const filteredCourses = courses.filter((courses) => courses.bought === true);
  return (
    <main className="min-h-screen text-white">
      <div className="py-4 px-14">
        <Searchbar />
        <div className=" py-16">
          <h1 className="font-bold text-xl mb-7 md:text-3xl">My Courses</h1>
          <div className="flex gap-10 w-full">
            {filteredCourses.map((course, i) => {
              return (
                <CourseItem
                  key={i}
                  imageUrl={course.image}
                  description={course.description}
                  title={course.title}
                  price={course.price}
                  bought={course.bought}
                />
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
