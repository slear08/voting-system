import { CircleUser, AreaChart } from 'lucide-react';

const Main = () => {
    // Sample data
    const topCandidatesByOrganization = {
        candidatesByOrganization: [
            {
                orgID: '65f857e441b1007e56291a0d',
                orgTitle: 'Organization 1',
                candidates: [
                    {
                        position: 'President',
                        candidates: [
                            {
                                orgID: '65f857e441b1007e56291a0d',
                                orgTitle: 'Organization 1',
                                fullname: 'Test Doe Smith Jr',
                                position: 'President',
                                voteCounts: 3
                            },
                            {
                                orgID: '65f857e441b1007e56291a0d',
                                orgTitle: 'Organization 1',
                                fullname: 'Test 2 Doe Smith Jr',
                                position: 'President',
                                voteCounts: 0
                            }
                        ]
                    },
                    {
                        position: 'Vice President',
                        candidates: [
                            {
                                orgID: '65f857e441b1007e56291a0d',
                                orgTitle: 'Organization 1',
                                fullname: 'Person Sarah Duterte Jr',
                                position: 'Vice President',
                                voteCounts: 0
                            }
                        ]
                    }
                ]
            },
            {
                orgID: '65fac7a877c347d9906e7f1b',
                orgTitle: 'Organization 2',
                candidates: [
                    {
                        position: 'President',
                        candidates: [
                            {
                                orgID: '65fac7a877c347d9906e7f1b',
                                orgTitle: 'Organization 2',
                                fullname: 'Candidate  Doe Smith Jr',
                                position: 'President',
                                voteCounts: 1
                            }
                        ]
                    }
                ]
            }
        ],
        topCandidatesByOrganization: [
            {
                orgID: '65f857e441b1007e56291a0d',
                orgTitle: 'Organization 1',
                candidates: [
                    {
                        position: 'President',
                        candidates: [
                            {
                                orgID: '65f857e441b1007e56291a0d',
                                orgTitle: 'Organization 1',
                                fullname: 'Test Doe Smith Jr',
                                position: 'President',
                                voteCounts: 3
                            },
                            {
                                orgID: '65f857e441b1007e56291a0d',
                                orgTitle: 'Organization 1',
                                fullname: 'Test 2 Doe Smith Jr',
                                position: 'President',
                                voteCounts: 0
                            },
                            {
                                orgID: '65f857e441b1007e56291a0d',
                                orgTitle: 'Organization 1',
                                fullname: 'Test 2 Doe Smith Jr',
                                position: 'President',
                                voteCounts: 0
                            }
                        ]
                    },
                    {
                        position: 'Vice President',
                        candidates: [
                            {
                                orgID: '65f857e441b1007e56291a0d',
                                orgTitle: 'Organization 1',
                                fullname: 'Person Sarah Duterte Jr',
                                position: 'Vice President',
                                voteCounts: 0
                            }
                        ]
                    }
                ]
            },
            {
                orgID: '65fac7a877c347d9906e7f1b',
                orgTitle: 'Organization 2',
                candidates: [
                    {
                        position: 'President',
                        candidates: [
                            {
                                orgID: '65fac7a877c347d9906e7f1b',
                                orgTitle: 'Organization 2',
                                fullname: 'Candidate  Doe Smith Jr',
                                position: 'President',
                                voteCounts: 1
                            }
                        ]
                    }
                ]
            }
        ]
    };

    function getCandidatesByOrganization(data: any) {
        const candidatesByOrganization: any = {};

        data.forEach((org: any) => {
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

    const candidatesByOrg = getCandidatesByOrganization(
        topCandidatesByOrganization.topCandidatesByOrganization
    );

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
                        <h1 className="font-bold text-3xl">500 users</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-primary p-5 text-white rounded-lg w-[300px]">
                        <div className="flex gap-2 items-center text-xl">
                            <AreaChart />
                            <h1>Total Votes</h1>
                        </div>
                        <h1 className="font-bold text-3xl">500 votes</h1>
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
