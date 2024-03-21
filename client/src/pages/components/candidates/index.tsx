import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { GetCandidateByID } from '@/api/services/general/GetCandidate';

const CandidatesByID = () => {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryFn: () => {
            if (id) {
                return GetCandidateByID(id);
            }
            return null;
        },
        queryKey: [`candidates-${id}`]
    });

    if (isLoading) {
        return <div>Loading</div>;
    }

    return (
        <div className="flex py-10">
            <div className="w-1/2 flex flex-col items-center gap-10">
                <div className="w-[500px] h-[500px] rounded-full shadow-2xl shadow-slate-800 border-4 border-primary overflow-hidden">
                    <img className="h-full w-full" src={data?.profile} alt="candidate" />
                </div>
                <div className="text-center w-full bg-primary rounded-r-xl p-5">
                    <h1 className="text-3xl font-bold">{data?.fullname}</h1>
                    <h1 className="text-xl text-white">{`Candidate for ${data?.position}`}</h1>
                </div>
            </div>
            <div className="p-10 w-1/2">
                <h1 className="text-3xl font-bold">Platforms</h1>
                <div className="h-[300px] overflow-y-scroll">
                    <div className="mt-5">
                        {data?.platforms.map((data: any, key: any) => (
                            <div key={key}>
                                <h1 className="font-bold text-xl text-primary">{data.title}</h1>
                                <h1 className="font-semibold ml-10 italic">-{data.info}</h1>
                            </div>
                        ))}
                    </div>
                </div>
                <h1 className="text-3xl font-bold">Achievements</h1>
                <div className="h-[300px] overflow-y-scroll">
                    <div className="mt-5">
                        {data?.achievements.map((data: any, key: any) => (
                            <div key={key}>
                                <h1 className="font-bold text-xl text-primary">{data.title}</h1>
                                <h1 className="font-semibold ml-10 italic">-{data.info}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidatesByID;
