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
        <div className="w-full flex p-5 h-screen">
            <div className="w-1/2 flex flex-col items-center justify-center">
                <div className="h-1/2 flex flex-col gap-5">
                    <h1 className="text-7xl">Unlock your Voice</h1>
                    <p className="text-4xl">Select the leaders who best represent you</p>
                    <p className="text-2xl">with iSelect's empowering online voting platform.</p>
                    <Button
                        className={
                            'w-40 text-white flex gap-2 font-semibold hover:bg-primary-foreground bg-primary rounded-full py-2 px-5'
                        }
                        onClick={() => navigate('/candidates')}>
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
