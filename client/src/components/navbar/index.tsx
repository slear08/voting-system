import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.png';
import favicon from '@/assets/favicon.png';
import { BookOpenCheck, CircleChevronDown } from 'lucide-react';
import { RedirectToGoogleSSO } from '@/api/services/client/GoogleSignIn';
import { LogoutVoter } from '@/api/services/client/Logout';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import useUserStore from '@/store/useUserStore';

const Navbar = () => {
    const { user }: any = useUserStore();
    const navigate = useNavigate();
    const location = useLocation();

    // Function to check if the current route contains "candidates" or "candidate"
    const isCandidateRoute =
        location.pathname.includes('/candidates') || location.pathname.includes('/candidate');

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
            <div className="flex gap-5">
                {!isCandidateRoute && ( // Render the button if not on candidates route
                    <Button
                        className={
                            'text-white flex gap-2 font-semibold hover:bg-primary-foreground bg-primary rounded-full py-2 px-5'
                        }
                        onClick={() => {
                            RedirectToGoogleSSO();
                        }}>
                        <BookOpenCheck />
                        Register to Vote
                    </Button>
                )}

                {user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="cursor-pointer ">
                            <div className="relative">
                                <Avatar className="border-2 border-primary">
                                    <AvatarImage
                                        className="hover:brightness-50"
                                        src={user?.user?.profile}
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>
                                        <AvatarImage
                                            className="hover:blur-sm"
                                            src={favicon}
                                            alt="@logo"
                                        />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="rounded-full bg-white absolute bottom-0 right-[-8px]">
                                    <CircleChevronDown className=" text-primary w-5" />
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{user?.user?.name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                    useUserStore.getState().logout();
                                    LogoutVoter();
                                }}>
                                <LogOut className="mr-2" />
                                <h1>Log out</h1>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
