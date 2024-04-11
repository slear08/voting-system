import React from 'react';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
const Voters = () => {
    const data: any = [
        {
            _id: '65fbfb40d8c731309eb81e40',
            email: '2020-202095@rtu.edu.ph',
            googleId: '109971982188210557568',
            name: 'Slear Mendoza',
            profile:
                'https://lh3.googleusercontent.com/a/ACg8ocIMf9Q2p-KOpRMeOjnzl3GDKIkYqTKv5SvZDSlWd5QwYMw=s96-c',
            status: false,
            votes: [],
            createdAt: '2024-03-21T09:17:52.783Z',
            updatedAt: '2024-03-21T09:17:52.783Z',
            __v: 0
        }
    ];
    return (
        <div>
            <div>
                <h1 className="text-3xl">List of Voters</h1>
            </div>
            <DataTable data={data} columns={columns} filter="email" />
        </div>
    );
};

export default Voters;
