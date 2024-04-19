import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const OrganizationCard = ({ image, title, info, link, label }: any) => {
    return (
        <div className="bg-slate-800 p-4 h-[500px] rounded-xl">
            <div className="h-1/2 rounded-xl overflow-hidden bg-slate-500 flex items-center justify-center">
                <Avatar className="w-[200px] h-[200px] border-2 border-primary">
                    <AvatarImage src={image} alt="preview" />
                    <AvatarFallback className="text-5xl">
                        {title.charAt(0).toLocaleUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className="text-center mt-5">
                <h1 className="text-white font-bold text-3xl">{title}</h1>
            </div>
            <div className="text-center mt-5">
                <p className="text-white">{info}</p>
            </div>
            <div className="text-center mt-10">
                <Link
                    className="bg-primary hover:bg-primary-foreground p-2 rounded-full text-white"
                    to={link}>
                    {label ? label : 'View More'}
                </Link>
            </div>
        </div>
    );
};

export default OrganizationCard;
