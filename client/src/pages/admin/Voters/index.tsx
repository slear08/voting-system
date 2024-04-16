import { useQuery } from '@tanstack/react-query';
import { GET_ALL_VOTERS } from '@/api/services/admin/voters';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
const Voters = () => {
    const { data, isLoading } = useQuery({
        queryFn: GET_ALL_VOTERS,
        queryKey: ['voters']
    });

    if (isLoading) {
        return <div>loading</div>;
    }

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
