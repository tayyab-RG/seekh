import Head from 'next/head';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { useAuth } from '../../components/authContext';
import Navbar from '../../components/navbar';
import { seekhsdk } from '../../components/seekh-sdk';
import Unauthorized from '../../components/unauthorized';

const Course = () => {
    const router = useRouter()
    const { courseId } = router.query

    const [course, setCourse] = useState({ courseName: '', instructorName: '' });

    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        if (typeof (courseId) == 'string') {
            try {
                seekhsdk.Course({ token: user }).getCourse({ id: courseId })
                    .then((res) => {
                        setCourse(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (error) {
                console.log(error)
                router.push('./');
            }
        } else
            router.push('./');
    }, [user]);

    if (!user) {
        return (
            <Unauthorized />
        )
    }

    return (
        <div className="h-fit bg-gradient-to-r from-gray-700 via-gray-900 to-black">
            <Head>
                <title>{course.courseName} By {course.instructorName}</title>
                <meta name="description" content="Course from Seekh" />
                <link rel="icon" href="/seekh.ico" />
            </Head>
            <Navbar active='' />
            <div className='flex m-8'>
                <p>Course: {course.courseName}</p>
                <p>Instructor: {course.instructorName}</p>
            </div>
        </div>
    );
}

export default Course