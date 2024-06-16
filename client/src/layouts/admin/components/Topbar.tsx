import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Settings, CircleUser } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AdminChangePassword } from '@/api/services/admin/auth';

const FormSchema = z
    .object({
        currentPassword: z.string().min(1, {
            message: 'Username must be at least 2 characters.'
        }),
        newPassword: z.string().min(8, {
            message: 'New password must be at least 8 characters.'
        }),
        confirmPassword: z.string()
    })
    .refine((data: any) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    });

const Topbar = () => {
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    });

    const { mutate: ChangePassword } = useMutation({
        mutationFn: AdminChangePassword,
        onSuccess: () => {
            form.reset();
            toast({
                title: 'Authentication',
                description: 'Change Password Successfully'
            });
        },
        onError: (error: any) => {
            toast({
                variant: 'destructive',
                title: 'Authentication Faliled',
                description: error.response.data.message
            });
        }
    });
    function onSubmit(data: z.infer<typeof FormSchema>) {
        ChangePassword(data);
    }
    return (
        <div className="flex gap-5 justify-center items-center">
            <div className="flex gap-2 text-primary font-bold">
                <CircleUser />
                <h1>ADMINISTRATOR</h1>
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" className="hover:bg-primary hover:text-white">
                        <Settings />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Change Password</SheetTitle>
                        <SheetDescription>
                            Make changes to your password here. Click save when you're done.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="currentPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label htmlFor="current-password" className="text-left">
                                                Current Password
                                            </Label>
                                            <FormControl>
                                                <div className="grid grid-cols-2 items-center gap-4">
                                                    <Input
                                                        id="current-password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        className="col-span-3"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label htmlFor="new-password" className="text-left">
                                                New Password
                                            </Label>
                                            <FormControl>
                                                <div className="grid grid-cols-2 items-center gap-4">
                                                    <Input
                                                        id="new-password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        className="col-span-3"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label htmlFor="confirm-new-password" className="">
                                                Confirm Password
                                            </Label>
                                            <FormControl>
                                                <div className="grid grid-cols-2 items-center gap-4">
                                                    <Input
                                                        id="confirm-new-password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        className="col-span-3"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center gap-1 mt-1">
                                    <Checkbox
                                        id="show-password"
                                        checked={showPassword}
                                        onCheckedChange={() => setShowPassword(!showPassword)}
                                    />
                                    <Label
                                        htmlFor="show-password"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Show password
                                    </Label>
                                </div>
                                <SheetFooter>
                                    <Button type="submit" className="text-white">
                                        Save changes
                                    </Button>
                                </SheetFooter>
                            </form>
                        </Form>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default Topbar;
