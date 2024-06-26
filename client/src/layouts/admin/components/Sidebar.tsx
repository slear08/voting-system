import logo from '@/assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Bell, Users, ScrollText, Building2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLogout } from '@/api/services/admin/auth';
import useAuthStore from '@/store/useAuthStore';
import { SYSTEM_RESET } from '@/api/services/admin/reset';
import { toast } from '@/components/ui/use-toast';

const Sidebar = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    const queryClient = useQueryClient();

    const { mutate: MutateLogOut } = useMutation({ mutationFn: AdminLogout });
    const { mutate: SystemReset } = useMutation({
        mutationFn: SYSTEM_RESET,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['candidates', 'organizations', 'results', 'stats']
            });
            navigate('/admin/reset');
        },
        onError: (error: any) => {
            toast({
                variant: 'destructive',
                title: 'Submitting Votes Failed',
                description: error.response.data.message
            });
        }
    });
    return (
        <div className="bg-slate-200 h-screen p-5">
            <div className="p-10">
                <img src={logo} alt="logo" />
            </div>
            <div>
                <div className="flex flex-col gap-20">
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
                            <div className="flex justify-center items-center gap-2 my-5">
                                <h1 className="font-bold">ADVANCE SETTINGS</h1>
                                <span className="flex-1 h-[2px] bg-primary"></span>
                            </div>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button className="flex items-center gap-2 p-2 font-semibold">
                                        <RotateCcw />
                                        RESTORE TO DEFAULT
                                    </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you absolutely sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently the
                                            system restore to default state and current data will
                                            delete also data from the servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            className="text-white"
                                            onClick={() => {
                                                SystemReset();
                                            }}>
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                        <div className="w-full mt-4">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className="w-full text-white">LOGOUT</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you absolutely sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            You want to logout?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            className="text-white"
                                            onClick={() => {
                                                MutateLogOut();
                                                logout();
                                            }}>
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
