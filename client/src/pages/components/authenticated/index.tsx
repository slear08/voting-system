import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetUserDetails } from '@/api/services/client/GetUserDetails';
import Preload from '@/components/preload';
import useUserStore from '@/store/useUserStore';

const Authenticated = () => {
    const navigate = useNavigate();
    const setUser = useUserStore((state: any) => state.setUser);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setTimeout(() => {
                    navigate('/candidates', { replace: true });
                }, 100);
            } catch (error) {
                setTimeout(() => {
                    navigate('/signin', { replace: true });
                }, 100);
                console.error('Error fetching user details:', error);
            }
        };
        fetchData();
    }, [navigate]);

    return <Preload />;
};

export default Authenticated;
