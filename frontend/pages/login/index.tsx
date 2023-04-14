import Head from 'next/head'
import Router from 'next/router';
import { toast } from 'react-toastify';

import Navbar from '../../components/navbar';
import { seekhsdk } from '../../components/seekh-sdk';
import { useAuth } from '../../components/authContext';


const Login = () => {
    const { login } = useAuth();

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        const data = {
            email: event.target.email.value,
            password: event.target.password.value
        }
        try {
            const res = await seekhsdk.Auth().login({ email: data.email, password: data.password });
            login(res.token, res.data.id);
            toast("Logged In Successfully!");
            Router.push('/dashboard');
        } catch (error: any) {
            toast.error(error.msg)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black'>
            <Head>
                <title>Login</title>
                <meta name='description' content='Login' />
                <link rel='icon' href='/seekh.ico' />
            </Head>
            <Navbar active='login' />
            <div className='container px-6 py-12 h-full mx-auto'>
                <p className='text-2xl text-center'>
                    Login
                </p>
                <div className='container mx-auto sm:w-1/3 w-full m-6'>
                    <div className='bg-white rounded-lg p-10'>
                        <form onSubmit={handleSubmit}>
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
                            <button className='w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white font-bold py-2 px-4 rounded' type='submit'>
                                Sign In
                            </button>
                            <a className='text-black text-right font-bold text-sm mt-2 block' href='#'>
                                Forgot Password?
                            </a>
                        </form>
                        <div className='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'><p className='text-center font-semibold mx-4 mb-0 text-black'>OR</p></div>
                        <div className='container'>
                            <a href='/signup'>
                                <button className='bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white w-full font-bold py-2 px-4 rounded' type='submit'>
                                    Sign Up
                                </button>
                            </a>
                            <button style={{ backgroundColor: '#3b5998' }} className='block w-full my-2 text-white font-bold py-2 px-4 rounded'>
                                Continue with Facebook
                            </button>
                            <button style={{ backgroundColor: '#DC4E41' }} className='block w-full my-2 text-white font-bold py-2 px-4 rounded'>
                                Continue with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
}

export default Login;