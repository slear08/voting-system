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
                const userDetails = await GetUserDetails();
                setTimeout(() => {
                    setUser(userDetails);
                    navigate('/candidates', { replace: true });
                }, 3000);
            } catch (error) {
                setTimeout(() => {
                    navigate('/signin', { replace: true });
                }, 3000);
                console.error('Error fetching user details:', error);
            }
        };
        fetchData();
    }, [navigate]);

    return <Preload />;
};

export default Authenticated;
