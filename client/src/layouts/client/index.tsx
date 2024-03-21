import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
const ClientLayout = () => {
    return (
        <>
            <Navbar />
            <div>
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default ClientLayout;
