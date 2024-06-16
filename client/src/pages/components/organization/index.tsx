import { useQuery } from '@tanstack/react-query';
import { GetOrganizationByID } from '@/api/services/general/GetOgranization';
import { useParams, useNavigate } from 'react-router-dom';
import { CircleChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Preload from '@/components/preload';
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
        return <Preload />;
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
            <div className="bg-slate-800 mx-5 mt-10 mb-[150px] p-5 rounded-lg flex gap-5">
                <div className="w-1/2 h-full">
                    <div className="h-1/2 rounded-xl p-2  bg-slate-500 flex items-center justify-center">
                        <Avatar className="w-[300px] h-[300px] border-2 border-primary">
                            <AvatarImage src={data?.picture} alt="preview" />
                            <AvatarFallback className="text-5xl">
                                {data?.title.charAt(0).toLocaleUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="w-full text-center m-2">
                        <h1 className="text-3xl text-white font-bold">{data?.title}</h1>
                    </div>
                    <div className="w-full text-center m-2">
                        <h1 className="text-lg text-white font-semibold">{data?.info}</h1>
                    </div>
                </div>
                <div
                    className="rich-text text-lg text-white w-1/2"
                    dangerouslySetInnerHTML={{ __html: data?.content }}
                />
            </div>
        </div>
    );
};

export default OrganizationByID;
