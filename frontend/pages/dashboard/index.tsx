import Head from 'next/head'
import { title } from 'process';
import Navbar from '../../components/navbar';

const Course = ({ title, description }: {
    title: string;
    description: string;
}) => {
    return (
        <div className='max-w-sm rounded overflow-hidden shadow-lg hover:shadow-white my-4 mb-8'>
            <img src='https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg' alt='course desc' />
            <div className='text-xl'>{title}</div>
            <div className='text-md'>{description}</div>
        </div>
    );
}

const Request = ({ name, course }: {
    name: string,
    course: string
}) => {
    return (
        <div className='max-w-sm rounded overflow-hidden bg-white my-4 mx-auto text-black shadow-lg hover:shadow-gray-500'>
            <div className='m-4'>
                <b>{name}</b> has requested to join your course : <b>{course}</b>
            </div>
            <div className='text-right'>
                <button className='mb-4 mr-4 bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-700 hover:border-transparent rounded'>
                    Accept
                </button>
                <button className='mb-4 mr-4 bg-transparent hover:bg-red-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-700 hover:border-transparent rounded'>
                    Reject
                </button>
            </div>
        </div>
    );
}

const Dashboard = () => {
    return (
        <div className="h-fit bg-gradient-to-r from-gray-700 via-gray-900 to-black">
            <Head>
                <title>Dashboard</title>
                <meta name="description" content="Home Page for Seekh" />
                <link rel="icon" href="/seekh.ico" />
            </Head>
            <Navbar active='home' />
            <div className='flex  m-8'>
                <div className='container w-3/4'>
                    <div className='text-3xl text-center'>Enrolled Courses</div>
                    <div className='flex flex-wrap justify-evenly m-8'>
                        <Course title={"Course 1"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tristique eget nisi vitae egestas. Ut at fermentum nunc, ut tempor ante. Praesent sollicitudin lacinia metus a imperdiet. Aenean molestie ut sem eget sodales. Cras sit amet eleifend libero. Nullam ultricies erat eget euismod rutrum. Quisque in viverra quam. Nulla tristique sapien ac nisl convallis malesuada. Sed at diam pellentesque, lacinia dui vitae, rutrum leo. Donec eleifend in ex a consectetur."} />
                        <Course title={"Course 1"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tristique eget nisi vitae egestas. Ut at fermentum nunc, ut tempor ante. Praesent sollicitudin lacinia metus a imperdiet. Aenean molestie ut sem eget sodales. Cras sit amet eleifend libero. Nullam ultricies erat eget euismod rutrum. Quisque in viverra quam. Nulla tristique sapien ac nisl convallis malesuada. Sed at diam pellentesque, lacinia dui vitae, rutrum leo. Donec eleifend in ex a consectetur."} />
                        <Course title={"Course 1"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tristique eget nisi vitae egestas. Ut at fermentum nunc, ut tempor ante. Praesent sollicitudin lacinia metus a imperdiet. Aenean molestie ut sem eget sodales. Cras sit amet eleifend libero. Nullam ultricies erat eget euismod rutrum. Quisque in viverra quam. Nulla tristique sapien ac nisl convallis malesuada. Sed at diam pellentesque, lacinia dui vitae, rutrum leo. Donec eleifend in ex a consectetur."} />
                        <Course title={"Course 1"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tristique eget nisi vitae egestas. Ut at fermentum nunc, ut tempor ante. Praesent sollicitudin lacinia metus a imperdiet. Aenean molestie ut sem eget sodales. Cras sit amet eleifend libero. Nullam ultricies erat eget euismod rutrum. Quisque in viverra quam. Nulla tristique sapien ac nisl convallis malesuada. Sed at diam pellentesque, lacinia dui vitae, rutrum leo. Donec eleifend in ex a consectetur."} />
                        <Course title={"Course 1"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tristique eget nisi vitae egestas. Ut at fermentum nunc, ut tempor ante. Praesent sollicitudin lacinia metus a imperdiet. Aenean molestie ut sem eget sodales. Cras sit amet eleifend libero. Nullam ultricies erat eget euismod rutrum. Quisque in viverra quam. Nulla tristique sapien ac nisl convallis malesuada. Sed at diam pellentesque, lacinia dui vitae, rutrum leo. Donec eleifend in ex a consectetur."} />
                    </div>
                </div>
                <div className='lg:visible invisible container w-1/4'>
                    <div className='text-3xl text-center'>Enrollment Requests</div>
                    <div className='my-8 mx-4'>
                        <Request name='User 1' course='My Course' />
                        <Request name='User 1' course='My Course' />
                        <Request name='User 1' course='My Course' />
                        <Request name='User 1' course='My Course' />
                    </div>
                </div>
            </div>
        </div >

    );
}

export default Dashboard;