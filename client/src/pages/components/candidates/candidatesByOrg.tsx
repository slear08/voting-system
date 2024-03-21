import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { GetCandidatesByOrgID } from '@/api/services/general/GetCandidate';
import { GetOrganizationByID } from '@/api/services/general/GetOgranization';
import CandidateCard from '@/components/cards/candidate-card';

const candidateByOrg = () => {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryFn: () => {
            if (id) {
                return GetCandidatesByOrgID(id);
            }
            return null;
        },
        queryKey: [`candidates-org-${id}`]
    });
    const { data: Organization } = useQuery({
        queryFn: () => {
            if (id) {
                return GetOrganizationByID(id);
            }
            return null;
        },
        queryKey: [`organizations-name`]
    });

    if (isLoading) {
        return <div>Loading</div>;
    }

    if (!data || data.length === 0) {
        return (
            <div className="flex justify-center h-screen">
                <div>
                    <p className="text-xl text-center font-semibold">List of candidates</p>
                    <h1 className="text-4xl text-center font-semibold text-primary">
                        {Organization?.title}
                    </h1>
                    <h1 className="font-bold text-5xl text-slate-800 mt-40">No Candidates</h1>
                </div>
            </div>
        );
    }

    const presidentCandidates = data.filter((candidate: any) => candidate.position === 'President');

    return (
        <div className="px-10 h-screen">
            <div>
                <p className="text-xl text-center font-semibold">List of candidates</p>
                <h1 className="text-4xl text-center font-semibold text-primary">
                    {Organization?.title}
                </h1>
            </div>
            <div className="text-3xl mx-2 mt-10">
                <h1>CANDIDATES FOR PRESIDENT</h1>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {presidentCandidates.map((data: any, key: any) => (
                    <CandidateCard
                        key={key}
                        fullname={data.fullname}
                        id={data.id}
                        profile={data.profile}
                    />
                ))}
            </div>
        </div>
    );
};

export default candidateByOrg;
