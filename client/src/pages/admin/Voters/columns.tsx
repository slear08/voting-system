import { CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';

export const columns = [
    {
        accessorKey: 'email',
        header: ({ column }: any) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Email
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }: any) => <div className="lowercase">{row.getValue('email')}</div>
    },
    {
        accessorKey: 'name',
        header: () => <div>Name</div>,
        cell: ({ row }: any) => {
            return (
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={row.original.profile} alt="@shadcn" />
                        <AvatarFallback>
                            {row.getValue('name').charAt(0).toLocaleUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="capitalize">{row.getValue('name')}</div>
                </div>
            );
        }
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }: any) => (
            <div className="capitalize">{row.getValue('status') ? 'VOTED' : 'NOT YET VOTE'}</div>
        )
    }
];
