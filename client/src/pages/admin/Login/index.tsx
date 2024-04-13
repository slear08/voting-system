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

const FormSchema = z.object({
    username: z.string().min(1, {
        message: 'This field is required'
    }),
    password: z.string().min(1, {
        message: 'This field is required'
    })
});

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: 'You submitted the following values:',
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            )
        });
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
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
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
