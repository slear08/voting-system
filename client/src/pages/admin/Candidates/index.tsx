import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
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
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { FilePenLine, SquarePlus, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GetAllOranizations } from '@/api/services/general/GetOgranization';

import { DataTable } from '@/components/data-table';
import { columns, FormSchema } from './columns';

import { useState } from 'react';
const Candidates = () => {
    const data: any = [
        {
            _id: '65facb66017289a8aa96a538',
            profile:
                'https://firebasestorage.googleapis.com/v0/b/nexum-5d0f6.appspot.com/o/voting-system%2Fcandidate-profile%2Fslear.jpg?alt=media&token=9f336711-468e-4864-9e27-d924464e7bb7',
            firstName: 'Test',
            middleName: 'Doe',
            lastName: 'Smith',
            suffixName: 'Jr',
            voteCounts: 3,
            platforms: [
                {
                    title: 'Platform Title 1',
                    info: 'Platform Info 2'
                }
            ],
            achievements: [
                {
                    title: 'Achievement Title 1',
                    info: 'Achievement Title 1'
                }
            ],
            position: 'President',
            organization: {
                _id: '65f857e441b1007e56291a0d',
                picture:
                    'https://firebasestorage.googleapis.com/v0/b/nexum-5d0f6.appspot.com/o/voting-system%2Forganization-profile%2Fwallpaper.jpg?alt=media&token=66731c29-8174-48d1-b12a-c91dbb83b8cc',
                title: 'Organization 1',
                info: 'test info',
                createdAt: '2024-03-18T15:04:04.216Z',
                updatedAt: '2024-03-20T16:48:35.272Z',
                __v: 0
            },
            createdAt: '2024-03-20T11:41:26.999Z',
            updatedAt: '2024-03-21T21:27:31.317Z',
            __v: 0,
            fullname: 'Test Doe Smith Jr',
            id: '65facb66017289a8aa96a538'
        },
        {
            _id: '65fad9974f77354e439f22db',
            profile:
                'https://firebasestorage.googleapis.com/v0/b/nexum-5d0f6.appspot.com/o/voting-system%2Fcandidate-profile%2Fwallpaper.jpg?alt=media&token=a07d494b-6695-4a1a-8ed0-83207d5da92f',
            firstName: 'Test 2',
            middleName: 'Doe',
            lastName: 'Smith',
            suffixName: 'Jr',
            voteCounts: 0,
            platforms: [
                {
                    title: 'Platform Title 1',
                    info: 'Platform Info 2'
                }
            ],
            achievements: [
                {
                    title: 'Achievement Title 1',
                    info: 'Achievement Title 1'
                }
            ],
            position: 'President',
            organization: {
                _id: '65f857e441b1007e56291a0d',
                picture:
                    'https://firebasestorage.googleapis.com/v0/b/nexum-5d0f6.appspot.com/o/voting-system%2Forganization-profile%2Fwallpaper.jpg?alt=media&token=66731c29-8174-48d1-b12a-c91dbb83b8cc',
                title: 'Organization 1',
                info: 'test info',
                createdAt: '2024-03-18T15:04:04.216Z',
                updatedAt: '2024-03-20T16:48:35.272Z',
                __v: 0
            },
            createdAt: '2024-03-20T12:41:59.919Z',
            updatedAt: '2024-03-20T12:41:59.919Z',
            __v: 0,
            fullname: 'Test 2 Doe Smith Jr',
            id: '65fad9974f77354e439f22db'
        },
        {
            _id: '65fb1dfe11ef1e4adeaa0ce1',
            profile:
                'https://firebasestorage.googleapis.com/v0/b/nexum-5d0f6.appspot.com/o/voting-system%2Fcandidate-profile%2Fwallpaper.jpg?alt=media&token=1e2216fa-f0bf-4bff-92b7-62970d78b146',
            firstName: 'Candidate ',
            middleName: 'Doe',
            lastName: 'Smith',
            suffixName: 'Jr',
            voteCounts: 1,
            platforms: [
                {
                    title: 'Platform Title 1',
                    info: 'Platform Info 2'
                }
            ],
            achievements: [
                {
                    title: 'Achievement Title 1',
                    info: 'Achievement Title 1'
                }
            ],
            position: 'President',
            organization: {
                _id: '65fac7a877c347d9906e7f1b',
                picture:
                    'https://firebasestorage.googleapis.com/v0/b/nexum-5d0f6.appspot.com/o/voting-system%2Forganization-profile%2Fwallpaper.jpg?alt=media&token=af30cec6-9e98-4778-8e53-8d163aa402d2',
                title: 'Organization 2',
                info: 'test info',
                createdAt: '2024-03-20T11:25:28.156Z',
                updatedAt: '2024-03-20T16:50:42.183Z',
                __v: 0
            },
            createdAt: '2024-03-20T17:33:50.439Z',
            updatedAt: '2024-03-20T17:40:41.334Z',
            __v: 0,
            fullname: 'Candidate  Doe Smith Jr',
            id: '65fb1dfe11ef1e4adeaa0ce1'
        },
        {
            _id: '65fe38ff5f43666e99c5abab',
            profile:
                'https://firebasestorage.googleapis.com/v0/b/nexum-5d0f6.appspot.com/o/voting-system%2Fcandidate-profile%2Fslear.jpg?alt=media&token=9ff04628-b93a-4044-a950-10260594255e',
            firstName: 'Person',
            middleName: 'Sarah',
            lastName: 'Duterte',
            suffixName: 'Jr',
            voteCounts: 0,
            platforms: [
                {
                    title: 'Platform Title 1',
                    info: 'Platform Info 2'
                }
            ],
            achievements: [
                {
                    title: 'Achievement Title 1',
                    info: 'Achievement Title 1'
                }
            ],
            position: 'Vice President',
            organization: {
                _id: '65f857e441b1007e56291a0d',
                picture:
                    'https://firebasestorage.googleapis.com/v0/b/nexum-5d0f6.appspot.com/o/voting-system%2Forganization-profile%2Fwallpaper.jpg?alt=media&token=66731c29-8174-48d1-b12a-c91dbb83b8cc',
                title: 'Organization 1',
                info: 'test info',
                createdAt: '2024-03-18T15:04:04.216Z',
                updatedAt: '2024-03-20T16:48:35.272Z',
                __v: 0
            },
            createdAt: '2024-03-23T02:05:51.702Z',
            updatedAt: '2024-03-23T02:05:51.702Z',
            __v: 0,
            fullname: 'Person Sarah Duterte Jr',
            id: '65fe38ff5f43666e99c5abab'
        }
    ];

    const [selectedRows, setSeletedRows] = useState([]);

    const { data: DataOrg } = useQuery({
        queryFn: GetAllOranizations,
        queryKey: ['organizations']
    });

    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            file: undefined,
            firstName: '',
            middleName: '',
            lastName: '',
            suffixName: '',
            platforms: [],
            achievements: [],
            position: '',
            organization: ''
        }
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const formData = new FormData();

        if (data.file && data.file[0]) {
            formData.append('file', data.file[0]);
        }
        formData.append('firstName', data.firstName);
        formData.append('middleName', data.middleName);
        formData.append('lastName', data.lastName);
        formData.append('suffixName', data.suffixName);
        formData.append('position', data.position);
        formData.append('organization', data.organization);
        data.platforms.forEach(function (obj: any, index: any) {
            Object.keys(obj).forEach(function (key: any) {
                formData.append('platforms[' + index + '][' + key + ']', obj[key]);
            });
        });
        data.achievements.forEach(function (obj: any, index: any) {
            Object.keys(obj).forEach(function (key: any) {
                formData.append('achievements[' + index + '][' + key + ']', obj[key]);
            });
        });

        toast({
            title: 'You submitted the following values:',
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            )
        });
    }
    function onSubmitDeleteCanditate() {
        console.log(selectedRows);
    }
    return (
        <div className="my-5">
            <div className="flex justify-between">
                <div className="flex gap-5">
                    <h1 className="text-3xl">List of Candidates</h1>
                </div>
                <div className="flex gap-5">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                className="hover:bg-primary hover:text-white flex gap-2">
                                <FilePenLine />
                                CREATE CANDIDATE INFORMAIONS
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>Candidate Informations</SheetTitle>
                                <SheetDescription>
                                    Create Candidate's Informations here. Click save when you're
                                    done.
                                </SheetDescription>
                            </SheetHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="file"
                                        render={({ field }) => (
                                            <FormItem className="mt-10">
                                                <FormLabel>Upload Profile Picture</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        placeholder="Enter first name"
                                                        onChange={(e) => {
                                                            field.onChange(e.target.files);
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter first name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="middleName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Middle Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter middle name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter last name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="suffixName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Suffix Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter suffix name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="position"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Position</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter position"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="organization"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Organization</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select Organization" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {DataOrg.map(
                                                                (item: any, index: any) => (
                                                                    <SelectItem
                                                                        key={index}
                                                                        value={item._id}>
                                                                        <div className="flex gap-2 items-center">
                                                                            <Avatar className="w-[28px] h-[28px]">
                                                                                <AvatarImage
                                                                                    src={
                                                                                        item.picture
                                                                                    }
                                                                                    alt="@org-name"
                                                                                />
                                                                                <AvatarFallback>
                                                                                    {item.title
                                                                                        .charAt(0)
                                                                                        .toLocaleUpperCase()}
                                                                                </AvatarFallback>
                                                                            </Avatar>
                                                                            <p>{item.title}</p>
                                                                        </div>
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="mt-5">
                                        <FormField
                                            control={form.control}
                                            name="platforms"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xl">
                                                        Platforms
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div>
                                                            {field.value.map((platform, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="flex flex-wrap gap-2 my-5">
                                                                    <FormLabel>
                                                                        Platform No. {index + 1}
                                                                    </FormLabel>
                                                                    <Input
                                                                        placeholder="Enter platform title"
                                                                        value={platform.title}
                                                                        onChange={(e) =>
                                                                            field.onChange([
                                                                                ...field.value.slice(
                                                                                    0,
                                                                                    index
                                                                                ),
                                                                                {
                                                                                    ...platform,
                                                                                    title: e.target
                                                                                        .value
                                                                                },
                                                                                ...field.value.slice(
                                                                                    index + 1
                                                                                )
                                                                            ])
                                                                        }
                                                                        required
                                                                    />
                                                                    <Input
                                                                        placeholder="Enter platform info"
                                                                        value={platform.info}
                                                                        onChange={(e) =>
                                                                            field.onChange([
                                                                                ...field.value.slice(
                                                                                    0,
                                                                                    index
                                                                                ),
                                                                                {
                                                                                    ...platform,
                                                                                    info: e.target
                                                                                        .value
                                                                                },
                                                                                ...field.value.slice(
                                                                                    index + 1
                                                                                )
                                                                            ])
                                                                        }
                                                                        required
                                                                    />
                                                                    <div className="w-full flex justify-end">
                                                                        <Button
                                                                            className="text-white"
                                                                            onClick={() =>
                                                                                field.onChange([
                                                                                    ...field.value.slice(
                                                                                        0,
                                                                                        index
                                                                                    ),
                                                                                    ...field.value.slice(
                                                                                        index + 1
                                                                                    )
                                                                                ])
                                                                            }>
                                                                            <Trash2 className="mr-2" />
                                                                            Remove
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                className="hover:bg-primary hover:text-white w-full"
                                                                onClick={() =>
                                                                    field.onChange([
                                                                        ...field.value,
                                                                        {
                                                                            title: '',
                                                                            info: ''
                                                                        }
                                                                    ])
                                                                }>
                                                                <SquarePlus className="mr-2" />
                                                                Add Platform
                                                            </Button>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <FormField
                                            control={form.control}
                                            name="achievements"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xl">
                                                        Achievements
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div>
                                                            {field.value.map(
                                                                (achievement, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="flex flex-wrap gap-2 my-5">
                                                                        <FormLabel>
                                                                            Achievement No.{' '}
                                                                            {index + 1}
                                                                        </FormLabel>
                                                                        <Input
                                                                            placeholder="Enter achievement title"
                                                                            value={
                                                                                achievement.title
                                                                            }
                                                                            onChange={(e) =>
                                                                                field.onChange([
                                                                                    ...field.value.slice(
                                                                                        0,
                                                                                        index
                                                                                    ),
                                                                                    {
                                                                                        ...achievement,
                                                                                        title: e
                                                                                            .target
                                                                                            .value
                                                                                    },
                                                                                    ...field.value.slice(
                                                                                        index + 1
                                                                                    )
                                                                                ])
                                                                            }
                                                                            required
                                                                        />
                                                                        <Input
                                                                            placeholder="Enter achievement info"
                                                                            value={achievement.info}
                                                                            onChange={(e) =>
                                                                                field.onChange([
                                                                                    ...field.value.slice(
                                                                                        0,
                                                                                        index
                                                                                    ),
                                                                                    {
                                                                                        ...achievement,
                                                                                        info: e
                                                                                            .target
                                                                                            .value
                                                                                    },
                                                                                    ...field.value.slice(
                                                                                        index + 1
                                                                                    )
                                                                                ])
                                                                            }
                                                                            required
                                                                        />
                                                                        <div className="w-full flex justify-end">
                                                                            <Button
                                                                                className="text-white"
                                                                                onClick={() =>
                                                                                    field.onChange([
                                                                                        ...field.value.slice(
                                                                                            0,
                                                                                            index
                                                                                        ),
                                                                                        ...field.value.slice(
                                                                                            index +
                                                                                                1
                                                                                        )
                                                                                    ])
                                                                                }>
                                                                                <Trash2 className="mr-2" />
                                                                                Remove
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )}
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                className="hover:bg-primary hover:text-white w-full"
                                                                onClick={() =>
                                                                    field.onChange([
                                                                        ...field.value,
                                                                        {
                                                                            title: '',
                                                                            info: ''
                                                                        }
                                                                    ])
                                                                }>
                                                                <SquarePlus className="mr-2" />
                                                                Add Achievement
                                                            </Button>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <SheetFooter>
                                        <Button
                                            type="submit"
                                            className="text-white w-full my-5 flex gap-1">
                                            <Save />
                                            <p>CREATE CANDIDATE</p>
                                        </Button>
                                    </SheetFooter>
                                </form>
                            </Form>
                        </SheetContent>
                    </Sheet>
                    {selectedRows.length !== 0 && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="hover:bg-primary hover:text-white flex gap-2">
                                    <Trash2 />
                                    DELETE SELECTED CANDIDATES
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete
                                        the candidate(s) and remove data from server.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        className="text-white"
                                        onClick={onSubmitDeleteCanditate}>
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </div>
            </div>
            <DataTable
                data={data}
                columns={columns}
                setSeletedRows={setSeletedRows}
                filter="fullname"
            />
        </div>
    );
};

export default Candidates;
