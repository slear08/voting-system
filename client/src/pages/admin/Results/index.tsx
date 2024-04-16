import OrganizationCard from '@/components/cards/organization-card';
import { useQuery } from '@tanstack/react-query';
import { GetAllOranizations } from '@/api/services/general/GetOgranization';

const Results = () => {
    const { data, isLoading } = useQuery({
        queryFn: GetAllOranizations,
        queryKey: ['organizations']
    });

    if (isLoading) {
        <div>Loading</div>;
    }

    if (!data || data.length === 0) {
        return (
            <div className="flex justify-center mt-40 h-screen">
                <h1 className="font-bold text-5xl text-slate-800">No Organizations</h1>
            </div>
        );
    }

    return (
        <section>
            <div className="text-center">
                <h1 className="font-bold text-5xl text-slate-800 mb-2">Select Organization</h1>
                <p>By selecting organization, you will see the analytics or graphs</p>
            </div>
            <div className="mx-auto py-10">
                <div className="grid grid-cols-3 gap-4">
                    {data?.map((data: any, key: any) => (
                        <OrganizationCard
                            key={key}
                            image={data.picture}
                            title={data.title}
                            info={data.info}
                            link={`org/${data._id}`}
                            label="View All Candidates Here"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Results;
