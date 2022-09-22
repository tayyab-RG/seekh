import Head from 'next/head'
import Navbar from '../../components/navbar';
import Course from '../../components/course';
import Request from '../../components/request';
import Enrollment from '../../components/enrollment';
import Unauthorized from '../../components/unauthorized';
import SeekhSDK from 'seekh-sdk';
import { useEffect, useState } from 'react';
import { useAuth } from '../../components/authContext';
import Router from 'next/router';

const seekhsdk = new SeekhSDK();

const Dashboard = () => {
    const [courses, setCourses] = useState([{}])
    const [requests, setRequests] = useState([{}])
    const [enrolled, setEnrolled] = useState([{}])

    const { user } = useAuth();
    // const router = useRouter();
    const [route, setRoute] = useState('');

    const handleCreate = () => {
        Router.push('/create/course');
    }

    useEffect(() => {
        console.log("-----------------------------------");
        console.log(user);
        if (!user) {
            // Router.push('/');
            return
        }

        seekhsdk.Course({ token: user }).getUserCourses()
            .then((res) => {
                setCourses(res.courses);
            })
            .catch((err) => {
                console.log(err);
            })

        seekhsdk.Enrollment({ token: user }).enrollmentRequests()
            .then((res) => {
                setRequests(res.enrollments)
            })
            .catch((err) => {
                console.log(err);
            })

        seekhsdk.Enrollment({ token: user }).getEnrollments()
            .then((res) => {
                setEnrolled(res.enrollments)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [user])

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
                        <button className='w-1/5 m-4 bg-transparent hover:bg-gray-500 font-semibold text-white py-2 px-4 border border-gray-700 hover:border-transparent rounded' onClick={handleCreate}>Create Course</button>
                    </div>
                    <div className='flex flex-wrap justify-evenly m-8'>
                        {courses.map(function (course: any) {
                            return <Course
                                title={course.name}
                                description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tristique eget nisi vitae egestas. Ut at fermentum nunc, ut tempor ante. Praesent sollicitudin lacinia metus a imperdiet. Aenean molestie ut sem eget sodales. Cras sit amet eleifend libero. Nullam ultricies erat eget euismod rutrum. Quisque in viverra quam. Nulla tristique sapien ac nisl convallis malesuada. Sed at diam pellentesque, lacinia dui vitae, rutrum leo. Donec eleifend in ex a consectetur.'
                                id={course.id}
                                enroll={false}
                                instructor={course.instructor}
                                key={course.id}
                            />;
                        })}
                    </div>
                </div>
                <div className='lg:visible invisible container w-1/4'>
                    <div className='text-3xl text-center'>Enrollment Requests</div>
                    <div className='my-8 mx-4'>
                        {requests.map(function (request: any) {
                            return <Request
                                name={request.userName}
                                course={request.courseName}
                                status={request.status}
                                courseId={request.courseId}
                                userId={request.userId}
                            />
                        })}
                    </div>
                </div>
            </div>
            <div className='container w-3/4'>
                <div className='text-3xl text-center'>Enrolled Courses</div>
                <div className='flex flex-wrap justify-evenly m-8'>
                    {enrolled.map((enroll: any) => {
                        return (
                            <Enrollment course={enroll.course} status={enroll.status} courseId={enroll.id} instructor={enroll.instructor} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;