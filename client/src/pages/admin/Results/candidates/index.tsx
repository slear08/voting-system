import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { GetCandidatesByOrgID } from '@/api/services/general/GetCandidate';
import Preload from '@/components/preload';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
import { useNavigate } from 'react-router-dom';
import { SquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
const CandidatesResults = () => {
    const { id }: any = useParams();
    const navigate = useNavigate();
    const {
        data: candidatesData,
        isLoading,
        isError
    } = useQuery({
        queryFn: () => GetCandidatesByOrgID(id),
        queryKey: [`candidate-by-org-${id}`],
        staleTime: 30000
    });

    if (isLoading) {
        return <Preload />;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    if (!candidatesData || candidatesData.candidates.length === 0) {
        return (
            <div className="grid place-items-center gap-10 mt-20">
                <h1 className="text-center text-5xl uppercase">
                    {candidatesData?.organization?.title}
                </h1>
                <h1 className="text-3xl font-semibold">No candidate data available</h1>
                <Button
                    className="bg-primary hover:bg-primary-foreground px-4 py-2 rounded-full text-white"
                    onClick={() => navigate('/admin/candidates')}>
                    <SquarePlus className="mr-2" />
                    Create Candidates
                </Button>
            </div>
        );
    }

    const groupedCandidates = candidatesData?.candidates?.reduce((acc: any, candidate: any) => {
        const { position, fullname, voteCounts } = candidate;
        if (!acc[position]) {
            acc[position] = [];
        }
        acc[position].push({ fullname, voteCounts });
        return acc;
    }, {});

    const transformedData: any = Object.entries(groupedCandidates).map(
        ([position, candidates]) => ({
            position,
            candidates
        })
    );

    const getRandomColor = () => {
        return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.7)`;
    };

    return (
        <div className="flex flex-col gap-24">
            <h1 className="text-center text-5xl uppercase">
                {candidatesData?.organization?.title}
            </h1>
            {transformedData.map((positionData: any, index: any) => (
                <div key={index} style={{ width: '99%' }}>
                    <div className="text-3xl text-primary font-semibold">{`GRAPH FOR ${positionData.position.toUpperCase()}`}</div>
                    <Bar
                        options={{
                            indexAxis: 'y',
                            responsive: true
                        }}
                        data={{
                            labels: positionData.candidates.map(
                                (candidate: any) => candidate.fullname
                            ),
                            datasets: [
                                {
                                    data: positionData.candidates.map(
                                        (candidate: any) => candidate.voteCounts
                                    ),
                                    label: 'Vote Counts',
                                    backgroundColor: positionData.candidates.map(() =>
                                        getRandomColor()
                                    )
                                }
                            ]
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default CandidatesResults;
