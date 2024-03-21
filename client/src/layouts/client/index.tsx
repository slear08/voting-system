import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
const ClientLayout = () => {
    return (
        <>
            <Navbar />
            <div className="h-screen">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default ClientLayout;
