import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';

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

const FormSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'This field has to be filled.' })
        .refine((value) => /\b[A-Za-z0-9._%+-]+@g\.batstate\.edu\.ph\b/.test(value), {
            message: 'Invalid email use your institutional email @g.batstate.edu.ph'
        })
});

const CandidateByOrg = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { data, isLoading } = useQuery({
        queryFn: () => {
            if (id) {
                return GetCandidatesByOrgID(id);
            }
            return null;
        },
        queryKey: [`candidates-org-${id}`]
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: ''
        }
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
            setIsOpen(false);
            form.reset();
            toast({
                title: 'VOTES',
                description: 'Vote Submitted Successfully'
            });
        },
        onError: (error: any) => {
            setIsOpen(false);
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

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const selectedCandidateIds = Object.values(selectedCandidates);
        CreateVote({ email: data.email, candidateID: selectedCandidateIds });
    }

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
                                        className="cursor-pointer"
                                        onClick={() => handleCardClick(candidate.id, position)}>
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
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="w-1/2 bg-primary hover:bg-primary-foreground text-white">
                            SUBMIT VOTES
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Please provide your registered email to be able to count your votes.
                            </AlertDialogTitle>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="johndoe@g.batstate.edu.ph"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <AlertDialogFooter className="mt-5">
                                        <AlertDialogCancel>Close</AlertDialogCancel>
                                        <Button className="text-white">Submit</Button>
                                    </AlertDialogFooter>
                                </form>
                            </Form>
                        </AlertDialogHeader>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default CandidateByOrg;
