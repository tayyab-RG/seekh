import Head from 'next/head'
import Navbar from '../../components/navbar';
import { seekhsdk } from '../../components/seekh-sdk';
import Course from '../../components/course';
import { useAuth } from '../../components/authContext';
import { useRouter } from 'next/router';


const Courses = ({ allCourses }: any) => {
    const { user } = useAuth();
    const enroll = user ? true : false;

    const router = useRouter();

    const handleCreate = () => {
        router.push('/create/course');
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black">
            <Head>
                <title>Courses</title>
                <meta name="description" content="Home Page for Seekh" />
                <link rel="icon" href="/seekh.ico" />
            </Head>
            <Navbar active='courses' />
            <div className='w-full'>
                <div className='text-3xl text-center my-12'>{allCourses.length ? "All Courses" : "There are no Courses added yet."}</div>
                <div className='text-center'>
                    <button className={user ? 'w-1/5 mb-4 mr-4 bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-700 hover:border-transparent rounded' : 'hidden'} onClick={handleCreate}>Create Course</button>
                </div>
                <div className='flex flex-wrap justify-evenly m-8'>
                    {allCourses.map(function (course: any) {
                        return <Course
                            title={course.name}
                            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tristique eget nisi vitae egestas. Ut at fermentum nunc, ut tempor ante. Praesent sollicitudin lacinia metus a imperdiet. Aenean molestie ut sem eget sodales. Cras sit amet eleifend libero. Nullam ultricies erat eget euismod rutrum. Quisque in viverra quam. Nulla tristique sapien ac nisl convallis malesuada. Sed at diam pellentesque, lacinia dui vitae, rutrum leo. Donec eleifend in ex a consectetur.'
                            id={course.id}
                            enroll={enroll}
                            instructor={course.instructor}
                            key={course.id}
                        />;
                    })}
                </div>
            </div>
        </div>

    );
}

Courses.getInitialProps = async () => {
    try {
        const res = await seekhsdk.Course({ token: "" }).getAllCourses();
        return { allCourses: res.courses }
    } catch (error) {
        console.log(error);
        return { allCourses: [] }
    }

}

export default Courses;