import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { GetCandidatesByOrgID } from '@/api/services/general/GetCandidate';
import { GetOrganizationByID } from '@/api/services/general/GetOgranization';
import { CREATE_VOTE } from '@/api/services/admin/voters';
import CandidateCard from '@/components/cards/candidate-card';
import { Button } from '@/components/ui/button';
import useUserStore from '@/store/useUserStore';
import { RedirectToGoogleSSO } from '@/api/services/client/GoogleSignIn';
import { BookOpenCheck } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';

const CandidateByOrg = () => {
    const { user }: any = useUserStore();
    const { id } = useParams();
    const navigate = useNavigate();
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

    const { mutate: CreateVote } = useMutation({
        mutationFn: CREATE_VOTE,
        onSuccess: () => {
            toast({
                title: 'VOTES',
                description: 'Vote Submitted Successfully'
            });
        },
        onError: (error: any) => {
            toast({
                variant: 'destructive',
                title: 'Submitting Votes Failed',
                description: error.response.data.message
            });
        }
    });

    const [selectedCandidates, setSelectedCandidates] = useState<{ [position: string]: string }>(
        {}
    );

    const handleCardClick = (id: string, position: string) => {
        setSelectedCandidates((prevState) => ({
            ...prevState,
            [position]: id
        }));
    };

    const handleSubmit = () => {
        const selectedCandidateIds = Object.values(selectedCandidates);
        CreateVote({ candidateID: selectedCandidateIds });
    };

    if (isLoading) {
        return <div>Loading</div>;
    }

    if (!data || data?.candidates?.length === 0) {
        return (
            <div className="flex justify-center h-screen">
                <div>
                    <p className="text-xl text-center font-semibold">List of candidates</p>
                    <h1 className="text-4xl text-center font-semibold text-primary">
                        {Organization?.title}
                    </h1>
                    <div className="flex flex-col gap-10">
                        <h1 className="font-bold text-5xl text-slate-800 mt-40">No Candidates</h1>
                        <Button
                            className="mx-5 rounded-full text-white hover:bg-primary-foreground"
                            onClick={() => {
                                navigate(-1);
                            }}>
                            GO BACK
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const candidatePositions = Array.from(
        new Set(data?.candidates?.map((candidate: any) => candidate.position))
    );

    return (
        <div className="p-10">
            <Button
                className="mx-5 rounded-full text-white hover:bg-primary-foreground"
                onClick={() => {
                    navigate(-1);
                }}>
                BACK
            </Button>
            <div>
                <p className="text-xl text-center font-semibold">List of candidates</p>
                <h1 className="text-4xl text-center font-semibold text-primary">
                    {Organization?.title}
                </h1>
            </div>
            {candidatePositions.map((position: any, index: any) => (
                <div key={index}>
                    <div className="text-3xl mx-2 mt-10">
                        <h1>CANDIDATES FOR {position.toUpperCase()}</h1>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {data?.candidates?.map((candidate: any) => {
                            if (candidate.position === position) {
                                return (
                                    <div
                                        key={candidate.id}
                                        className={`${user ? 'cursor-pointer' : ''}`}
                                        onClick={
                                            user
                                                ? () => handleCardClick(candidate.id, position)
                                                : undefined
                                        }>
                                        <CandidateCard
                                            fullname={candidate.fullname}
                                            id={candidate.id}
                                            profile={candidate.profile}
                                            isSelected={
                                                selectedCandidates[position] === candidate.id
                                            }
                                        />
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            ))}
            <div className="w-full flex justify-center items-center">
                {user ? (
                    <Button
                        className="w-1/2 bg-primary hover:bg-primary-foreground text-white"
                        onClick={handleSubmit}>
                        SUBMIT VOTES
                    </Button>
                ) : (
                    <Button
                        className={
                            'text-white flex gap-2 font-semibold hover:bg-primary-foreground bg-primary rounded-full py-2 px-5'
                        }
                        onClick={RedirectToGoogleSSO}>
                        <BookOpenCheck />
                        Log in your institutional email
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CandidateByOrg;
