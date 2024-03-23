import { useQuery } from '@tanstack/react-query';
import { GetOrganizationByID } from '@/api/services/general/GetOgranization';
import { useParams, useNavigate } from 'react-router-dom';
import { CircleChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrganizationByID = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryFn: () => {
            if (id) {
                return GetOrganizationByID(id);
            }
            return null;
        },
        queryKey: [`organizations-${id}`]
    });

    if (isLoading) {
        return <div>loading</div>;
    }

    return (
        <div>
            <Button
                className="mx-5 rounded-full text-white hover:bg-primary-foreground"
                onClick={() => {
                    navigate(-1);
                }}>
                BACK
            </Button>
            <div className="bg-slate-800 mx-5 mt-10 mb-[150px] p-5 rounded-lg h-[500px] flex gap-5">
                <div className="w-1/2">
                    <div className="rounded-xl overflow-hidden">
                        <img className="w-full h-full" src={data?.picture} alt="logo" />
                    </div>
                    <div className="w-full text-center m-2">
                        <h1 className="text-3xl text-white font-bold">{data?.title}</h1>
                    </div>
                    <div className="w-full text-center m-2">
                        <h1 className="text-lg text-white font-semibold">{data?.info}</h1>
                    </div>
                </div>
                <div className="text-lg text-white w-1/2">
                    <p>{data?.content}</p>
                </div>
            </div>
        </div>
    );
};

export default OrganizationByID;
