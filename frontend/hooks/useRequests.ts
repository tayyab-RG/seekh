import { useState, useEffect } from "react";
import { seekhsdk } from "../components/seekh-sdk";

const useRequests = (token: string) => {
    const [requests, setRequests] = useState([{}]);

    useEffect(() => {
        async function getRequests() {
            const res = await seekhsdk.Enrollment({ token: token }).enrollmentRequests();
            setRequests(res.enrollments);
        };
        getRequests();
    }, [token]);

    return requests;
}

export default useRequests;