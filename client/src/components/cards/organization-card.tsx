import { Link } from 'react-router-dom';

const OrganizationCard = ({ image, title, info, link, label }: any) => {
    return (
        <div className="bg-slate-800 p-4 h-[500px] rounded-xl">
            <div className="h-1/2 rounded-xl overflow-hidden bg-slate-500">
                <img className="w-full h-full" src={image} alt="logo" />
            </div>
            <div className="text-center mt-5">
                <h1 className="text-white font-bold text-3xl">{title}</h1>
            </div>
            <div className="text-center mt-5">
                <p className="text-white">{info}</p>
            </div>
            <div className="text-center mt-10">
                <Link
                    className="bg-primary hover:bg-primary-foreground px-8 py-2 rounded-full text-white"
                    to={link}>
                    {label ? label : 'View More'}
                </Link>
            </div>
        </div>
    );
};

export default OrganizationCard;
