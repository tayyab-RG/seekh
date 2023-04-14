import Head from 'next/head'
import Router from 'next/router'
import { toast } from 'react-toastify'

import { useAuth } from '../../components/authContext';
import Navbar from '../../components/navbar';
import { seekhsdk } from '../../components/seekh-sdk';

const Signup = () => {

    const { login } = useAuth();

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        const data = {
            email: event.target.email.value,
            password: event.target.password.value,
            name: event.target.name.value
        }
        try {
            const res = await seekhsdk.Auth().signup({ email: data.email, password: data.password, name: data.name });
            login(res.token, res.data.id);
            toast("Signed up Successfully");
            Router.push('/dashboard');
        } catch (error: any) {
            toast.error(error.msg);
        }
    }
    return (
        <div className='min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black'>
            <Head>
                <title>Signup</title>
                <meta name='description' content='Sign Up' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Navbar active='login' />
            <div className='container px-6 py-12 mx-auto'>
                <p className='text-2xl text-center'>
                    Sign Up
                </p>
                <div className='container mx-auto sm:w-1/3 w-full m-6'>
                    <div className='bg-white rounded-lg p-10'>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <label className='block text-black mb-1 text-sm font-bold'>
                                    Username
                                </label>
                                <input required className='w-full bg-white border rounded-md text-black focus:shadow-md p-2' placeholder='Username' type={'text'} name="name" />
                                <p className='text-red-500 text-xs italic' id="nameError"></p>
                            </div>
                            <div className='mb-4'>
                                <label className='block text-black mb-1 text-sm font-bold'>
                                    Email
                                </label>
                                <input required className='w-full bg-white border rounded-md text-black focus:shadow-md leading-tight p-2' placeholder='Email' type={'email'} name="email" />
                                <p className='text-red-500 text-xs italic' id="emailError"></p>
                            </div>
                            <div className='mb-6'>
                                <label className='block text-black mb-1 text-sm font-bold'>
                                    Password
                                </label>
                                <input required className='w-full bg-white border rounded-md text-black focus:shadow-md leading-tight p-2' placeholder='Password' type={'password'} name="password" />
                                <p className='text-red-500 text-xs italic' id="passwordError"></p>
                            </div>
                            <button className='bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white w-full font-bold py-2 px-4 rounded' type='submit'>
                                Sign Up
                            </button>
                        </form>
                        <div className='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'><p className='text-center font-semibold mx-4 mb-0 text-black'>OR</p></div>
                        <div className='container'>
                            <button style={{ backgroundColor: '#3b5998' }} className='block w-full my-2 text-white font-bold py-2 px-4 rounded'>
                                Sign Up with Facebook
                            </button>
                            <button style={{ backgroundColor: '#DC4E41' }} className='block w-full my-2 text-white font-bold py-2 px-4 rounded'>
                                Sign Up with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
}

export default Signup;