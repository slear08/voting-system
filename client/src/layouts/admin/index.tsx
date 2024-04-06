import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
const AdminLayout = () => {
    return (
        <div className="flex">
            <div className="w-[300px] fixed">
                <Sidebar />
            </div>
            <div className="w-full px-16 py-5 ml-[300px]">
                <div className="w-full flex justify-end">
                    <Topbar />
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
