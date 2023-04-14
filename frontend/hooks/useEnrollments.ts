import { useState, useEffect } from "react";
import { seekhsdk } from "../components/seekh-sdk";

const useEnrollments = (token: string) => {
    const [enrollments, setENrollments] = useState([{}]);

    useEffect(() => {
        async function getEnrollments() {
            const res = await seekhsdk.Enrollment({ token: token }).getEnrollments();
            setENrollments(res.enrollments);
        };
        getEnrollments();
    }, [token]);

    return enrollments;
}

export default useEnrollments;