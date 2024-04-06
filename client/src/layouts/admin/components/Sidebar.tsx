import logo from '@/assets/logo.png';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Bell, Users, ScrollText, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
    return (
        <div className="bg-slate-200 h-screen p-5">
            <div className="p-10">
                <img src={logo} alt="logo" />
            </div>
            <div>
                <div className="flex flex-col gap-40">
                    <div>
                        <div className="flex justify-center items-center gap-2 my-5">
                            <h1 className="font-bold">MENU</h1>
                            <span className="w-full h-[2px] bg-primary"></span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <NavLink
                                to="dashboard"
                                className={({ isActive, isPending }) =>
                                    `${
                                        isPending
                                            ? 'pending'
                                            : isActive
                                            ? 'bg-background rounded-lg text-primary'
                                            : ''
                                    }  w-full flex items-center gap-2 p-2 font-semibold`
                                }>
                                <LayoutDashboard />
                                DASHBOARD
                            </NavLink>
                            <NavLink
                                to="results"
                                className={({ isActive, isPending }) =>
                                    `${
                                        isPending
                                            ? 'pending'
                                            : isActive
                                            ? 'bg-background rounded-lg text-primary'
                                            : ''
                                    }  w-full flex items-center gap-2 p-2 font-semibold`
                                }>
                                <Bell />
                                RESULTS
                            </NavLink>
                        </div>
                        <div className="flex justify-center items-center gap-2 my-5">
                            <h1 className="font-bold">MANAGE</h1>
                            <span className="w-full h-[2px] bg-primary"></span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <NavLink
                                to="voters"
                                className={({ isActive, isPending }) =>
                                    `${
                                        isPending
                                            ? 'pending'
                                            : isActive
                                            ? 'bg-background rounded-lg text-primary'
                                            : ''
                                    }  w-full flex items-center gap-2 p-2 font-semibold`
                                }>
                                <ScrollText />
                                VOTERS
                            </NavLink>
                            <NavLink
                                to="candidates"
                                className={({ isActive, isPending }) =>
                                    `${
                                        isPending
                                            ? 'pending'
                                            : isActive
                                            ? 'bg-background rounded-lg text-primary'
                                            : ''
                                    }  w-full flex items-center gap-2 p-2 font-semibold`
                                }>
                                <Users />
                                CANDIDATES
                            </NavLink>
                            <NavLink
                                to="organizations"
                                className={({ isActive, isPending }) =>
                                    `${
                                        isPending
                                            ? 'pending'
                                            : isActive
                                            ? 'bg-background rounded-lg text-primary'
                                            : ''
                                    }  w-full flex items-center gap-2 p-2 font-semibold`
                                }>
                                <Building2 />
                                ORGANIZATIONS
                            </NavLink>
                        </div>
                    </div>
                    <div className="w-full">
                        <Button className="w-full text-white">LOGOUT</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
