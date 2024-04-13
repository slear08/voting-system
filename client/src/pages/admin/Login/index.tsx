import logo from '@/assets/logo.png';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

import { AdminLogin, AdminLogout } from '@/api/services/admin/auth';
import { useMutation } from '@tanstack/react-query';
import useAuthStore from '@/store/useAuthStore';
const FormSchema = z.object({
    email: z.string().min(1, {
        message: 'This field is required'
    }),
    password: z.string().min(1, {
        message: 'This field is required'
    })
});

const Login = () => {
    const { setAuthenticate } = useAuthStore();

    const { mutate } = useMutation({
        mutationFn: AdminLogin,
        onSuccess: () => {
            setAuthenticate({ isAuthenticated: true });
            toast({
                title: 'Login',
                description: 'Login Successfully'
            });
        },
        onError: (error: any) => {
            toast({
                variant: 'destructive',
                title: 'Login',
                description: error.response.data.error
            });
        }
    });

    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        mutate(data);
    }

    return (
        <div className="flex h-screen">
            <div className="h-full w-1/2 flex justify-center items-center bg-slate-200">
                <img className="h-[180px] w-[500px]" src={logo} alt="Logo" />
            </div>
            <div className="flex flex-col w-1/2 items-center justify-center">
                <h1 className="text-center mb-10 text-4xl">Welcome Back Administrator</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="border border-slate-400 bg-slate-150 p-10 rounded-xl w-[350px]">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center space-x-2 mt-2">
                                <Checkbox
                                    id="showPassword"
                                    className="cursor-pointer"
                                    checked={showPassword}
                                    onCheckedChange={() => setShowPassword(!showPassword)}
                                />
                                <label
                                    htmlFor="showPassword"
                                    className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Show Password
                                </label>
                            </div>
                            <div className="w-full flex justify-end">
                                <Button className="text-white mt-2" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Login;
