import { CircleUser, AreaChart } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { GET_RESULTS, GET_STATS } from '@/api/services/admin/results';
import Preload from '@/components/preload';
const Main = () => {
    // Sample data
    const { data: results, isLoading: resultLoading } = useQuery({
        queryFn: GET_RESULTS,
        queryKey: ['results'],
        staleTime: 30000
    });

    const { data: stats, isLoading: statsLoading } = useQuery({
        queryFn: GET_STATS,
        queryKey: ['stats'],
        staleTime: 30000
    });

    if (resultLoading || statsLoading) {
        return <Preload />;
    }

    function getCandidatesByOrganization(data: any) {
        const candidatesByOrganization: any = {};

        data?.forEach((org: any) => {
            org.candidates.forEach((position: any) => {
                const candidates = position.candidates.map((candidate: any) => ({
                    fullname: candidate.fullname,
                    voteCounts: candidate.voteCounts
                }));

                const organizationKey = org.orgID + '-' + org.orgTitle;
                if (!candidatesByOrganization[organizationKey]) {
                    candidatesByOrganization[organizationKey] = {
                        orgTitle: org.orgTitle,
                        candidates: []
                    };
                }

                candidatesByOrganization[organizationKey].candidates.push({
                    position: position.position,
                    candidates: candidates
                });
            });
        });

        // Convert the object to an array of organizations
        const organizations = Object.values(candidatesByOrganization);

        return organizations;
    }

    const candidatesByOrg = getCandidatesByOrganization(results?.topCandidatesByOrganization);

    return (
        <div>
            <div className="text-4xl font-semibold">Dashboard</div>
            <h1 className="my-5 font-bold text-2xl">Overview</h1>
            <div className="grid place-items-center">
                <div className="flex gap-8">
                    <div className="flex flex-col justify-center items-center bg-slate-500 p-5 text-white rounded-lg w-[300px]">
                        <div className="flex gap-2 items-center text-xl">
                            <CircleUser />
                            <h1>Registered Users</h1>
                        </div>
                        <h1 className="font-bold text-3xl">{stats?.totalVoters} users</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-primary p-5 text-white rounded-lg w-[300px]">
                        <div className="flex gap-2 items-center text-xl">
                            <AreaChart />
                            <h1>Total Votes</h1>
                        </div>
                        <h1 className="font-bold text-3xl">{stats?.totalVoted} votes</h1>
                    </div>
                </div>
            </div>
            <div className="mt-10 w-full">
                <h1 className="my-5 font-bold text-2xl text-center">List Leading Candidates</h1>
                {candidatesByOrg.map((candidate: any, index: any) => (
                    <div key={index}>
                        <h1 className="text-primary text-2xl font-semibold">
                            {candidate.orgTitle}
                        </h1>
                        <div>
                            {candidate.candidates.map((person: any, key: any) => (
                                <div key={key} className="m-5">
                                    <h1 className="text-primary text-xl mb-4">{person.position}</h1>
                                    <div className="grid grid-cols-3 gap-4">
                                        {person.candidates.map((candidate: any, key: any) => (
                                            <div
                                                key={key}
                                                className="bg-slate-500 p-5 rounded-lg text-center flex flex-col items-center justify-center gap-2">
                                                <p className="text-2xl font-semibold text-white">
                                                    {candidate.fullname}
                                                </p>
                                                <p className="text-white font-bold px-5 bg-primary rounded-full">
                                                    Total Votes: {candidate.voteCounts}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Main;
