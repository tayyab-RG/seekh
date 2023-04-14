import Link from 'next/link'
import { toast } from 'react-toastify';
import { useAuth } from '../../components/authContext';

interface props {
    active: string
}

const Navbar = (props: props) => {
    const active = props.active;
    const activePageClass = "block py-2 pr-4 pl-3 text-lg text-white rounded md:bg-transparent md:p-0 dark:text-white";
    const inactivePageClass = "block py-2 pr-4 pl-3 text-lg text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";

    const { userId, logout } = useAuth();

    const handleLogout = () => {
        logout();
        toast("Logged out Successfully!");
    }

    return (
        <nav className="px-2 sm:px-4 py-2.5">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link href="/">
                    <a className="flex items-center">
                        <img src='/seekh.png' className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Seekh</span>
                    </a>
                </Link>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="flex flex-col p-4 mt-4 rounded-lg border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 ">
                        <li>
                            <Link href="/"><a className={active == 'home' ? activePageClass : inactivePageClass} aria-current="page">Home</a></Link>
                        </li>
                        <li>
                            <Link href="/courses"><a className={active == 'courses' ? activePageClass : inactivePageClass}>Courses</a></Link>
                        </li>
                        <li className={userId ? "" : "hidden"}>
                            <Link href='/dashboard'><a className={active == 'dashboard' ? activePageClass : inactivePageClass}>Dashboard</a></Link>
                        </li>
                        <li className={userId ? "hidden " : ""}>
                            <Link href='/login'><a className={active == 'login' ? activePageClass : inactivePageClass}>Login</a></Link>
                        </li>
                        <li className={userId ? "" : "hidden "}>
                            <Link href={'/'}><a onClick={handleLogout} className={active == 'login' ? activePageClass : inactivePageClass}>Logout</a></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;