import OrganizationCard from '@/components/cards/organization-card';
import { useQuery } from '@tanstack/react-query';
import { GetAllOranizations } from '@/api/services/general/GetOgranization';
import { Button } from '@/components/ui/button';
import { SquarePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Preload from '@/components/preload';
const Organization = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryFn: GetAllOranizations,
        queryKey: ['organizations']
    });

    if (isLoading) {
        return <Preload />;
    }

    if (!data || data.length === 0) {
        return (
            <div className="flex justify-center mt-40 h-screen">
                <div className="text-center">
                    <h1 className="font-bold text-5xl text-slate-800">No Organizations</h1>
                    <Button onClick={() => navigate('org/create')} className="text-white mt-5">
                        <SquarePlus />
                        <p>Create Organization</p>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <section>
            <div className="text-center">
                <h1 className="font-bold text-5xl text-slate-800 mb-2">Select Organization</h1>
                <p>You can edit and delete the organization by selecting it</p>
                <p>OR</p>
                <Button
                    onClick={() => navigate('org/create')}
                    variant="outline"
                    className="hover:bg-primary hover:text-white">
                    <SquarePlus />
                    <p>Create Organization</p>
                </Button>
            </div>
            <div className="mx-auto px-10 py-10">
                <div className="grid grid-cols-3 gap-4">
                    {data?.map((data: any, key: any) => (
                        <OrganizationCard
                            key={key}
                            image={data.picture}
                            title={data.title}
                            info={data.info}
                            link={`org/edit/${data._id}`}
                            label="Edit Organization"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Organization;
