import OrganizationCard from '@/components/cards/organization-card';
import { useQuery } from '@tanstack/react-query';
import { GetAllOranizations } from '@/api/services/general/GetOgranization';
import Preload from '@/components/preload';
const Organization = () => {
    const { data, isLoading } = useQuery({
        queryFn: GetAllOranizations,
        queryKey: ['organizations']
    });

    if (isLoading) {
        <Preload />;
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
            <div className="text-center mt-5">
                <h1 className="font-bold text-5xl text-slate-800">CIT Student Council</h1>
            </div>
            <div className="mx-auto px-10 py-16">
                <div className="grid grid-cols-3 gap-4">
                    {data?.map((data: any, key: any) => (
                        <OrganizationCard
                            key={key}
                            image={data.picture}
                            title={data.title}
                            info={data.info}
                            link={`/organizations/${data._id}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Organization;
