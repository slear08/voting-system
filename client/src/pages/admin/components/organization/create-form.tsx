import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMutation } from '@tanstack/react-query';
import { CREATE_ORGANIZATION } from '@/api/services/admin/organizations';
import { useNavigate } from 'react-router-dom';
import { CircleChevronLeft, Save } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import logo from '@/assets/favicon.png';

const FormSchema = z.object({
    file: z.any().refine((files) => files?.length >= 1, { message: 'Image is required.' }),
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

const CreateOrganization = () => {
    const navigate = useNavigate();

    const [imagePreview, setImagePreview] = useState<string>(logo);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            file: undefined,
            title: '',
            info: '',
            content: ''
        }
    });

    const { mutate: createOrganization } = useMutation({
        mutationFn: CREATE_ORGANIZATION,
        onSuccess: () => {
            form.reset();
            toast({
                title: 'Create Organization',
                description: 'Organization Successfully Created'
            });
        }
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const formData = new FormData();

        if (data.file && data.file[0]) {
            formData.append('file', data.file[0]);
        }
        formData.append('title', data.title);
        formData.append('info', data.info);
        formData.append('content', data.content);

        createOrganization(formData);
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
            <div className="mx-5 pt-5">
                <h1 className="text-3xl font-semibold text-center">CREATE ORGANIZATION</h1>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="bg-slate-800 mx-5 mt-10 mb-[150px] p-5 rounded-lg flex gap-5">
                        <div className="w-1/2">
                            <div className="w-full grid place-items-center">
                                <Avatar className="w-[200px] h-[200px] border-2 border-primary">
                                    <AvatarImage src={imagePreview} alt="preview" />
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
                                                    handleFileChange(e);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                        <p>Create Organization</p>
                                    </Button>
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
                                                        className="w-full text-white"
                                                        theme="snow"
                                                        value={field.value}
                                                        onChange={(newValue) => {
                                                            field.onChange(newValue);
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

export default CreateOrganization;
