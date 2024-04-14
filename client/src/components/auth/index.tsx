import useAuthStore from '@/store/useAuthStore';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthenticatedRoute = () => {
    const { isAuthenticated } = useAuthStore();
    const location = useLocation();
    if (!isAuthenticated) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }
    return <Outlet />;
};

export default AuthenticatedRoute;
