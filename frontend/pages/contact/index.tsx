import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from '../../components/navbar';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400">
            <Head>
                <title>Home Page</title>
                <meta name="description" content="Home Page for Seekh" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar active='contact' />
            <h1 className="text-3xl font-bold">
                contact
            </h1>
        </div>

    );
}

export default Home;