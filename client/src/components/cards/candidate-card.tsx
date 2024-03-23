import { Link } from 'react-router-dom';

const CandidateCard = ({ fullname, id, profile, isSelected }: any) => {
    return (
        <div className="w-full p-2">
            <div
                className={`${
                    isSelected ? 'bg-red-500' : 'bg-slate-800'
                } px-6 py-8 rounded-lg shadow-lg text-center`}>
                <div className="flex justify-center items-center">
                    <div className="mb-3 w-[150px] h-[150px] rounded-full overflow-hidden">
                        <img className="mx-auto w-full h-full" src={profile} alt="candidate" />
                    </div>
                </div>
                <h2 className="text-xl font-medium text-white mb-6">{fullname}</h2>
                <Link
                    to={`/candidate/${id}`}
                    className="px-4 py-2 bg-primary hover:bg-primary-foreground text-white rounded-full">
                    View Candidate
                </Link>
            </div>
        </div>
    );
};

export default CandidateCard;
