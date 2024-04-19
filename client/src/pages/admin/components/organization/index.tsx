import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
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

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useQuery, useMutation } from '@tanstack/react-query';
import { UPDATE_ORGANIZATION, DELETE_ORGANIZATION } from '@/api/services/admin/organizations';

import { GetOrganizationByID } from '@/api/services/general/GetOgranization';
import { useParams, useNavigate } from 'react-router-dom';
import { CircleChevronLeft, Save, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Preload from '@/components/preload';

const FormSchema = z.object({
    file: z.instanceof(FileList).optional(),
    title: z.string().min(1, {
        message: 'This field is required.'
    }),
    info: z.string().min(1, {
        message: 'This field is required.'
    }),
    content: z.string().min(1, {
        message: 'This field is required.'
    })
});

const OrganizationByIDAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { mutate: updateOrganization } = useMutation({
        mutationFn: UPDATE_ORGANIZATION,
        onSuccess: () => {
            toast({
                title: 'Update Organization',
                description: 'Organization Successfully Update'
            });
        }
    });

    const { mutate: DeleteOrganization } = useMutation({
        mutationFn: DELETE_ORGANIZATION,
        onSuccess: () => {
            navigate('/admin/organizations');
            toast({
                title: 'Delete Organization',
                description: 'Organization Successfully Deleted'
            });
        }
    });

    const { data, isLoading }: any = useQuery({
        queryFn: () => {
            if (id) {
                return GetOrganizationByID(id);
            }
            return null;
        },
        queryKey: [`organizations-${id}`]
    });
    const [value, setValue] = useState('');

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            file: undefined,
            title: '',
            info: '',
            content: ''
        },
        values: {
            file: data?.file || undefined,
            title: data?.title || '',
            info: data?.info || '',
            content: data?.content || ''
        }
    });

    if (isLoading) {
        return <Preload />;
    }

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const formData = new FormData();

        if (data.file && data.file[0]) {
            formData.append('file', data.file[0]);
        }
        formData.append('title', data.title);
        formData.append('info', data.info);
        formData.append('content', data.content);

        updateOrganization({ id, data: formData });
    }

    return (
        <div>
            <Button
                className="mx-5 rounded-full text-white hover:bg-primary-foreground"
                onClick={() => {
                    navigate(-1);
                }}>
                <CircleChevronLeft className="mr-2" />
                BACK
            </Button>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="bg-slate-800 mx-5 mt-10 mb-[150px] p-5 rounded-lg  flex gap-5">
                        <div className="w-1/2">
                            <div className=" overflow-hidden">
                                <div className="w-full grid place-items-center">
                                    <Avatar className="w-[200px] h-[200px] border-2 border-primary">
                                        <AvatarImage src={data?.picture} alt="logo" />
                                    </Avatar>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="file"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label className="text-white">Upload Image</Label>
                                            <FormControl>
                                                <Input
                                                    className="text-white"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        field.onChange(e.target.files);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div>
                                                <Label className="text-white">Title</Label>
                                                <div className="w-full text-center m-2">
                                                    <h1 className="text-3xl text-white font-bold">
                                                        <Input type="text" {...field} />
                                                    </h1>
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="info"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div>
                                                <Label className="text-white">Subtitle</Label>
                                                <div className="w-full text-center m-2">
                                                    <h1 className="text-3xl text-white font-bold">
                                                        <Input type="text" {...field} />
                                                    </h1>
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="text-lg w-1/2">
                            <div className="flex w-full justify-end">
                                <div className="flex gap-2 items-center">
                                    <Button
                                        type="submit"
                                        variant="outline"
                                        className="hover:bg-primary hover:text-white w-full">
                                        <Save />
                                        <p>Save changes</p>
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                type="button"
                                                className="text-white w-full my-5 flex gap-1">
                                                <Trash2 />
                                                <p>Delete</p>
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Are you absolutely sure?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will
                                                    permanently delete the organization and remove
                                                    data from server.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    className="text-white"
                                                    onClick={() => {
                                                        DeleteOrganization(id);
                                                    }}>
                                                    Continue
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div>
                                                <Label className="text-white">Content</Label>
                                                <div className="w-full text-center m-2">
                                                    <ReactQuill
                                                        className="w-full text-white "
                                                        theme="snow"
                                                        value={field.value}
                                                        onChange={(newValue) => {
                                                            field.onChange(newValue);
                                                            setValue(newValue);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default OrganizationByIDAdmin;
