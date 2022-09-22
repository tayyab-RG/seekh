import Head from 'next/head'
import Navbar from '../../components/navbar';
import { seekhsdk } from '../../components/seekh-sdk';
import Router from 'next/router';
import { useAuth } from '../../components/authContext';
import { useEffect } from 'react';

const CreateCourse = () => {
    const { userId, userToken, loading } = useAuth();

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        const data = {
            name: event.target.name.value
        }
        try {
            const res = await seekhsdk.Course({ token: userToken }).createCourse({ name: data.name });
            alert(res.courseName + " Created");
            Router.push('/courses');
        } catch (error: any) {
            console.log(error)
            alert(error.msg);
        }
    }

    useEffect(() => {
        if (!userId) {
            if (!loading)
                Router.push('/login');
            return
        }
    });

    return (
        <div className='min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black'>
            <Head>
                <title>Create Course</title>
                <meta name='description' content='Login' />
                <link rel='icon' href='/seekh.ico' />
            </Head>
            <Navbar active='' />
            <div className='container px-6 py-12 h-full mx-auto'>
                <p className='text-2xl text-center'>
                    Create Course
                </p>
                <div className='container mx-auto sm:w-1/3 w-full m-6'>
                    <div className='bg-white rounded-lg p-10'>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <label className='block text-black mb-1 text-sm font-bold'>
                                    Name
                                </label>
                                <input required className='w-full bg-white border rounded-md text-black focus:shadow-md leading-tight p-2' placeholder='Name' type={'text'} name="name" />
                                <p className='text-red-500 text-xs italic' id="emailError"></p>
                            </div>
                            <button className='w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white font-bold py-2 px-4 rounded' type='submit'>
                                Create Course
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CreateCourse;