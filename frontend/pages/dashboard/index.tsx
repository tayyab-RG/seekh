import Head from 'next/head'
import { useEffect } from 'react';
import Router from 'next/router';

import Navbar from '../../components/navbar';
import Course from '../../components/course';
import Request from '../../components/request';
import Enrollment from '../../components/enrollment';
import { useAuth } from '../../components/authContext';

import useCourses from '../../hooks/useCourses';
import useEnrollments from '../../hooks/useEnrollments';
import useRequests from '../../hooks/useRequests';

const Dashboard = () => {
    const { userId, userToken, loading } = useAuth();

    useEffect(() => {
        if (!userId) {
            if (!loading)
                Router.push('/login');
            return
        }
    }, [loading, userId])

    const courses = useCourses(userToken);
    const requests = useRequests(userToken);
    const enrolled = useEnrollments(userToken);

    return (
        <div className="h-fit bg-gradient-to-r from-gray-700 via-gray-900 to-black">
            <Head>
                <title>Dashboard</title>
                <meta name="description" content="Home Page for Seekh" />
                <link rel="icon" href="/seekh.ico" />
            </Head>
            <Navbar active='dashboard' />
            <div className='flex m-8'>
                <div className='container w-3/4'>
                    <div className='text-3xl text-center'>Your Courses</div>
                    <div className='text-center'>
                        <button className='w-1/5 m-4 bg-transparent hover:bg-gray-500 font-semibold text-white py-2 px-4 border border-gray-700 hover:border-transparent rounded' onClick={() => Router.push('/create/course')}>Create Course</button>
                    </div>
                    <div className='flex flex-wrap justify-evenly m-8'>
                        {courses &&
                            courses.map(function (course: any) {
                                return <Course
                                    title={course.name}
                                    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tristique eget nisi vitae egestas. Ut at fermentum nunc, ut tempor ante. Praesent sollicitudin lacinia metus a imperdiet. Aenean molestie ut sem eget sodales. Cras sit amet eleifend libero. Nullam ultricies erat eget euismod rutrum. Quisque in viverra quam. Nulla tristique sapien ac nisl convallis malesuada. Sed at diam pellentesque, lacinia dui vitae, rutrum leo. Donec eleifend in ex a consectetur.'
                                    id={course.id}
                                    enroll={false}
                                    instructor={course.instructor}
                                    key={course.id}
                                />;
                            })
                        }
                    </div>
                </div>
                <div className='lg:visible invisible container w-1/4'>
                    <div className='text-3xl text-center'>Enrollment Requests</div>
                    <div className='my-8 mx-4'>
                        {requests && requests.map(function (request: any) {
                            return <Request
                                name={request.userName}
                                course={request.courseName}
                                status={request.status}
                                courseId={request.courseId}
                                userId={request.userId}
                                key={request.courseId}
                            />
                        })}
                    </div>
                </div>
            </div>
            <div className='container w-3/4'>
                <div className='text-3xl text-center'>Enrolled Courses</div>
                <div className='flex flex-wrap justify-evenly m-8'>
                    {enrolled && enrolled.map((enroll: any) => {
                        return (
                            <Enrollment course={enroll.course} status={enroll.status} courseId={enroll.id} instructor={enroll.instructor} key={enroll.id} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;