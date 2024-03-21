import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
const ClientLayout = () => {
    return (
        <div className="h-screen">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default ClientLayout;
