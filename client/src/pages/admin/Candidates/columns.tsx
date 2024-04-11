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
import { Checkbox } from '@/components/ui/checkbox';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const FormSchema = z.object({
    file: z.instanceof(FileList),
    firstName: z.string().min(1, {
        message: 'This field is required.'
    }),
    middleName: z.string(),
    lastName: z.string().min(1, {
        message: 'This field is required.'
    }),
    suffixName: z.string(),
    platforms: z.array(
        z.object({
            title: z.string(),
            info: z.string()
        })
    ),
    achievements: z.array(
        z.object({
            title: z.string(),
            info: z.string()
        })
    ),
    position: z.string().min(1, {
        message: 'This field is required.'
    }),
    organization: z.string().min(1, {
        message: 'This field is required.'
    })
});

export const columns = [
    {
        id: 'select',
        header: ({ table }: any) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }: any) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: 'fullname',
        header: ({ column }: any) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Candidate Name
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }: any) => {
            return (
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={row.original.profile} alt="@candidate-name" />
                        <AvatarFallback>
                            {row.original.fullname.charAt(0).toLocaleUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="capitalize">{row.original.fullname}</div>
                </div>
            );
        }
    },
    {
        accessorKey: 'organization',
        header: ({ column }: any) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Organizations
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }: any) => {
            return (
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={row.original.organization.picture} alt="@shadcn" />
                        <AvatarFallback>
                            {row.original.organization.title.charAt(0).toLocaleUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="capitalize">{row.original.organization.title}</div>
                </div>
            );
        }
    },
    {
        accessorKey: 'position',
        header: ({ column }: any) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Positions
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }: any) => <div className="capitalize">{row.getValue('position')}</div>
    },
    {
        accessorKey: 'voteCounts',
        header: ({ column }: any) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Vote Counts
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }: any) => <div className="capitalize">{row.getValue('voteCounts')}</div>
    },
    {
        id: 'actions',
        enableHiding: false,
        header: 'Actions',
        cell: ({ row }: any) => {
            const { data } = useQuery({
                queryFn: GetAllOranizations,
                queryKey: ['organizations']
            });

            const { toast } = useToast();

            const form = useForm<z.infer<typeof FormSchema>>({
                resolver: zodResolver(FormSchema),
                defaultValues: {
                    file: undefined,
                    firstName: row.original.firstName || '',
                    middleName: row.original.middleName || '',
                    lastName: row.original.lastName || '',
                    suffixName: row.original.suffixName || '',
                    platforms: row.original.platforms || [],
                    achievements: row.original.achievements || [],
                    position: row.original.position || '',
                    organization: row.original.organization._id || ''
                }
            });

            function onSubmit(data: z.infer<typeof FormSchema>) {
                const formData = new FormData();
                formData.append('file', data.file[0]);
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

            return (
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            className="hover:bg-primary hover:text-white flex gap-2">
                            <FilePenLine />
                            EDIT INFORMAIONS
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>Update Candidate Informations</SheetTitle>
                            <SheetDescription>
                                Make changes to the Candidate's Informations here. Click save when
                                you're done.
                            </SheetDescription>
                        </SheetHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="w-full p-5 flex gap-5 justify-center items-center flex-col">
                                    <Avatar className="w-[200px] h-[200px]">
                                        <AvatarImage src={row.original.profile} alt="@org-name" />
                                        <AvatarFallback className="text-9xl">
                                            {row.original.fullname.charAt(0).toLocaleUpperCase()}
                                        </AvatarFallback>
                                        <div className="capitalize"></div>
                                    </Avatar>
                                    <FormField
                                        control={form.control}
                                        name="file"
                                        render={({ field }) => (
                                            <FormItem>
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
                                </div>
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter first name" {...field} />
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
                                                <Input placeholder="Enter middle name" {...field} />
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
                                                <Input placeholder="Enter last name" {...field} />
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
                                                <Input placeholder="Enter suffix name" {...field} />
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
                                                <Input placeholder="Enter position" {...field} />
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
                                                        {data.map((item: any, index: any) => (
                                                            <SelectItem
                                                                key={index}
                                                                value={item._id}>
                                                                <div className="flex gap-2 items-center">
                                                                    <Avatar className="w-[28px] h-[28px]">
                                                                        <AvatarImage
                                                                            src={item.picture}
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
                                                        ))}
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
                                                <FormLabel className="text-xl">Platforms</FormLabel>
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
                                                                                info: e.target.value
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
                                                        {field.value.map((achievement, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex flex-wrap gap-2 my-5">
                                                                <FormLabel>
                                                                    Achievement No. {index + 1}
                                                                </FormLabel>
                                                                <Input
                                                                    placeholder="Enter achievement title"
                                                                    value={achievement.title}
                                                                    onChange={(e) =>
                                                                        field.onChange([
                                                                            ...field.value.slice(
                                                                                0,
                                                                                index
                                                                            ),
                                                                            {
                                                                                ...achievement,
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
                                                                                info: e.target.value
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
                                        <p>Save changes</p>
                                    </Button>
                                </SheetFooter>
                            </form>
                        </Form>
                    </SheetContent>
                </Sheet>
            );
        }
    }
];
