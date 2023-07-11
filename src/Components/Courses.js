import React, {useState, useEffect} from "react"
import "./Courses.css"
// import courses from "../Courses"
import CourseCard from "./CourseCard"

const CoursesCard = ({ serchString = "" }) => {
  const [courses, setCourses] = useState([]);
  const courseType = [
    "Music Course", 
    "Graphic Design Course", 
    "UI/UX Design Course", 
    "Marketing Course",
    "Development Course",
    "Personal Development Course",
    "Business Course",
  ]
  const [noOfElements, setNoOfElements] = useState(4);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/Allcourses`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          // console.log(data);s
          setCourses(data);
        } else {
          throw new Error("Error fetching courses");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourses();
  }, []);
  const loadMore=()=>{
    setNoOfElements(noOfElements + noOfElements);
  }
  
  // const slice=courses.slice(0,noOfElements);
  const filteredCoursesByType = courseType.map((type) => {
    const filteredCourses = courses.filter(
      (course) =>
        course.type.toLowerCase() === type.toLowerCase() &&
        course.title.toLowerCase().includes(serchString.toLowerCase())
    );
    return { type, courses: filteredCourses };
  });

return (
  <div>
    {filteredCoursesByType.map(({ type, courses }, i) => (
      <section key={i}>
        <div className="yy-1">
          <h1 className="yy-2">{type}</h1>
          <div className="yy-3">
            {courses.slice(0, noOfElements).map((course, i) => (
              <CourseCard course={course} key={i} />
            ))}
          </div>
        </div>
        {courses.length > noOfElements && (
          <button className="yy-4" onClick={loadMore}>
            View More Courses
          </button>
        )}
      </section>
    ))}
  </div>
);
};

export default CoursesCard
