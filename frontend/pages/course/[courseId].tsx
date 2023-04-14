import Head from 'next/head';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { useAuth } from '../../components/authContext';
import Navbar from '../../components/navbar';
import { seekhsdk } from '../../components/seekh-sdk';
import Router from 'next/router';

const Course = () => {
    const router = useRouter()
    const { courseId } = router.query

    const [course, setCourse] = useState({ courseName: '', instructorName: '' });

    const { userId, loading, userToken } = useAuth();

    useEffect(() => {
        if (!courseId) return

        if (!userId) {
            if (!loading)
                Router.push('/login');
            return
        }

        if (typeof (courseId) == 'string') {
            try {
                seekhsdk.Course({ token: userToken }).getCourse({ id: courseId })
                    .then((res) => {
                        setCourse(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (error) {
                console.log(error)
                router.push('/');
            }
        } else
            router.push('/');

    }, [loading, userId, courseId]);

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