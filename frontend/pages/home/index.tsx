import Head from 'next/head'
import Navbar from '../../components/navbar';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-teal-200 to-lime-200">
            <Head>
                <title>Home Page</title>
                <meta name="description" content="Home Page for Seekh" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar active='home' />
            <h1 className="text-3xl font-bold">
                Home page
            </h1>
        </div>

    );
}

export default Home;