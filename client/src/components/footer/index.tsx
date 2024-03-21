import logo from '@/assets/logo.png';
const Footer = () => {
    return (
        <footer className="bg-slate-300">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-8" alt="Flowbite Logo" />
                    </div>
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © 2024 iSelect™ . All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
