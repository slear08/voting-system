import hero from '@/assets/hero.png';
import { BookOpenCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import useUserStore from '@/store/useUserStore';
import { RedirectToGoogleSSO } from '@/api/services/client/GoogleSignIn';

const Home = () => {
    const { user }: any = useUserStore();
    const navigate = useNavigate();

    return (
        <div className="w-full flex">
            <div className="w-1/2 flex flex-col items-center justify-center">
                <div className="h-1/2 flex flex-col gap-5">
                    <h1 className="text-7xl">Lorem, ipsum dolor.</h1>
                    <p className="text-4xl">Lorem ipsum dolor sit amet.</p>
                    <p className="text-2xl">Lorem ipsum dolor sit amet consectetur similique.</p>
                    <Button
                        className={
                            'w-40 text-white flex gap-2 font-semibold hover:bg-primary-foreground bg-primary rounded-full py-2 px-5'
                        }
                        onClick={() => (user ? navigate('/candidates') : RedirectToGoogleSSO())}>
                        <BookOpenCheck />
                        Vote Now
                    </Button>
                </div>
            </div>
            <div className="w-1/2">
                <img src={hero} alt="hero" />
            </div>
        </div>
    );
};

export default Home;
