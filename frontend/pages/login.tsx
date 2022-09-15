import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from './navbar';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black">
            <Head>
                <title>Home Page</title>
                <meta name="description" content="Home Page for Seekh" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar active='login' />
            <h1 className="text-3xl font-bold">
                Login
            </h1>
        </div>

    );
}

export default Home;