import { Link, NavLink } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { BookOpenCheck } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="flex py-7 px-10 items-center">
            <div className="w-32 h-full">
                <img className="" src={logo} alt="iSelect" />
            </div>
            <div className="flex-1">
                <ul className="flex w-full justify-center gap-16">
                    <li>
                        <NavLink
                            to="/home"
                            className={({ isActive }) =>
                                isActive ? 'text-primary font-bold' : ''
                            }>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/candidates"
                            className={({ isActive }) =>
                                isActive ? 'text-primary font-bold' : ''
                            }>
                            Candidates
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/organizations"
                            className={({ isActive }) =>
                                isActive ? 'text-primary font-bold' : ''
                            }>
                            Organizations
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive ? 'text-primary font-bold' : ''
                            }>
                            About Us
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div>
                <Link
                    to="/signin"
                    className={
                        'text-white flex gap-2 font-semibold hover:bg-primary-foreground bg-primary rounded-full py-2 px-5'
                    }>
                    <BookOpenCheck />
                    Vote Now
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
