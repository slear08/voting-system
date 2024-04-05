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

    // Sample data
    const candidatesData = [
        {
            _id: '65facb66017289a8aa96a538',
            profile:
                'https://firebasestorage.googleapis.com/v0/b/nexum-5d0f6.appspot.com/o/voting-system%2Fcandidate-profile%2Fslear.jpg?alt=media&token=9f336711-468e-4864-9e27-d924464e7bb7',
            firstName: 'Test',
            middleName: 'Doe',
            lastName: 'Smith',
            suffixName: 'Jr',
            voteCounts: 3,
            platforms: [
                {
                    title: 'Platform Title 1',
                    info: 'Platform Info 2'
                }
            ],
            achievements: [
                {
                    title: 'Achievement Title 1',
                    info: 'Achievement Title 1'
                }
            ],
            position: 'President',
            organization: '65f857e441b1007e56291a0d',
            createdAt: '2024-03-20T11:41:26.999Z',
            updatedAt: '2024-03-21T21:27:31.317Z',
            __v: 0,
            fullname: 'Test Doe Smith Jr',
            id: '65facb66017289a8aa96a538'
        },
        {
            _id: '65fad9974f77354e439f22db',
            profile:
                'https://firebasestorage.googleapis.com/v0/b/nexum-5d0f6.appspot.com/o/voting-system%2Fcandidate-profile%2Fwallpaper.jpg?alt=media&token=a07d494b-6695-4a1a-8ed0-83207d5da92f',
            firstName: 'Test 2',
            middleName: 'Doe',
            lastName: 'Smith',
            suffixName: 'Jr',
            voteCounts: 0,
            platforms: [
                {
                    title: 'Platform Title 1',
                    info: 'Platform Info 2'
                }
            ],
            achievements: [
                {
                    title: 'Achievement Title 1',
                    info: 'Achievement Title 1'
                }
            ],
            position: 'President',
            organization: '65f857e441b1007e56291a0d',
            createdAt: '2024-03-20T12:41:59.919Z',
            updatedAt: '2024-03-20T12:41:59.919Z',
            __v: 0,
            fullname: 'Test 2 Doe Smith Jr',
            id: '65fad9974f77354e439f22db'
        },
        {
            _id: '65fe38ff5f43666e99c5abab',
            profile:
                'https://firebasestorage.googleapis.com/v0/b/nexum-5d0f6.appspot.com/o/voting-system%2Fcandidate-profile%2Fslear.jpg?alt=media&token=9ff04628-b93a-4044-a950-10260594255e',
            firstName: 'Person',
            middleName: 'Sarah',
            lastName: 'Duterte',
            suffixName: 'Jr',
            voteCounts: 0,
            platforms: [
                {
                    title: 'Platform Title 1',
                    info: 'Platform Info 2'
                }
            ],
            achievements: [
                {
                    title: 'Achievement Title 1',
                    info: 'Achievement Title 1'
                }
            ],
            position: 'Vice President',
            organization: '65f857e441b1007e56291a0d',
            createdAt: '2024-03-23T02:05:51.702Z',
            updatedAt: '2024-03-23T02:05:51.702Z',
            __v: 0,
            fullname: 'Person Sarah Duterte Jr',
            id: '65fe38ff5f43666e99c5abab'
        }
    ];

    // Grouping candidates by position
    const groupedCandidates = candidatesData.reduce((acc: any, candidate: any) => {
        const { position, fullname, voteCounts } = candidate;
        if (!acc[position]) {
            acc[position] = [];
        }
        acc[position].push({ fullname, voteCounts });
        return acc;
    }, {});

    // Transforming grouped data into the desired format
    const transformedData = Object.entries(groupedCandidates).map(([position, candidates]) => ({
        position,
        candidates
    }));

    console.log(transformedData);
    console.log(candidatesByOrg);

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
                <h1 className="my-5 font-bold text-2xl text-center">Leading Candidates Summary</h1>
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
