import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from './navbar';

const Home = () => {
    return (
        <div className="h-screen bg-gradient-to-bl from-red-200 via-red-300 to-yellow-200">
            <Head>
                <title>Home Page</title>
                <meta name="description" content="Home Page for Seekh" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar active='about' />
            <h1 className="text-3xl font-bold">
                About
            </h1>
        </div>

    );
}

export default Home;