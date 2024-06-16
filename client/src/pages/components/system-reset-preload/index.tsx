import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Preload from '@/components/preload';
import { toast } from '@/components/ui/use-toast';

const SystemResetPreload = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/admin', { replace: true });
            toast({
                title: 'System Reset',
                description: 'Your system has been reset'
            });
        }, 3000);
    }, [navigate]);

    return <Preload />;
};

export default SystemResetPreload;
