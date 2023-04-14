import { useState, useEffect } from "react";
import { seekhsdk } from "../components/seekh-sdk";

const useCourses = (token: string) => {
    const [courses, setCourses] = useState([{}]);

    useEffect(() => {
        async function getCourses() {
            const res = await seekhsdk.Course({ token: token }).getUserCourses();
            setCourses(res.courses);
        };
        getCourses();
    }, [token]);

    return courses;
}

export default useCourses;