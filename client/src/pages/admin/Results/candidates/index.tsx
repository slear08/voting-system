import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const CandidatesResults = () => {
    const candidatesData: any = [
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
            _id: '65facb66017289a8aa96a538',
            profile:
                'https://firebasestorage.googleapis.com/v0/b/nexum-5d0f6.appspot.com/o/voting-system%2Fcandidate-profile%2Fslear.jpg?alt=media&token=9f336711-468e-4864-9e27-d924464e7bb7',
            firstName: 'Test',
            middleName: 'Doe',
            lastName: 'Smith',
            suffixName: 'Jr',
            voteCounts: 1,
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
            _id: '65facb66017289a8aa96a538',
            profile:
                'https://firebasestorage.googleapis.com/v0/b/nexum-5d0f6.appspot.com/o/voting-system%2Fcandidate-profile%2Fslear.jpg?alt=media&token=9f336711-468e-4864-9e27-d924464e7bb7',
            firstName: 'Test',
            middleName: 'Doe',
            lastName: 'Smith',
            suffixName: 'Jr',
            voteCounts: 2,
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
            _id: '65facb66017289a8aa96a538',
            profile:
                'https://firebasestorage.googleapis.com/v0/b/nexum-5d0f6.appspot.com/o/voting-system%2Fcandidate-profile%2Fslear.jpg?alt=media&token=9f336711-468e-4864-9e27-d924464e7bb7',
            firstName: 'Test',
            middleName: 'Doe',
            lastName: 'Smith',
            suffixName: 'Jr',
            voteCounts: 5,
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
            voteCounts: 9,
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
            voteCounts: 10,
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
        },
        {
            _id: '65fe38ff5f43666e99c5abab',
            profile:
                'https://firebasestorage.googleapis.com/v0/b/nexum-5d0f6.appspot.com/o/voting-system%2Fcandidate-profile%2Fslear.jpg?alt=media&token=9ff04628-b93a-4044-a950-10260594255e',
            firstName: 'Person',
            middleName: 'Sarah',
            lastName: 'Duterte',
            suffixName: 'Jr',
            voteCounts: 20,
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
        },
        {
            _id: '65fe38ff5f43666e99c5abab',
            profile:
                'https://firebasestorage.googleapis.com/v0/b/nexum-5d0f6.appspot.com/o/voting-system%2Fcandidate-profile%2Fslear.jpg?alt=media&token=9ff04628-b93a-4044-a950-10260594255e',
            firstName: 'Person',
            middleName: 'Sarah',
            lastName: 'Duterte',
            suffixName: 'Jr',
            voteCounts: 6,
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

    const groupedCandidates = candidatesData.reduce((acc: any, candidate: any) => {
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
            {transformedData.map((positionData: any, index: any) => (
                <div key={index} style={{ width: '99%' }}>
                    <div className="text-4xl text-primary font-semibold">{`GRAPH FOR ${positionData.position.toUpperCase()}`}</div>
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
