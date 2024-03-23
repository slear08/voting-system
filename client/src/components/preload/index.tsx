import logo from '@/assets/favicon.png';

const Preload = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center p-10">
            <div className="flex-col gap-4 w-full flex items-center justify-center">
                <div className="w-40 h-40 border-8 animate-spin border-gray-300 flex items-center justify-center border-t-primary rounded-full">
                    <img className="animate-ping" src={logo} alt="logo" />
                </div>
            </div>
        </div>
    );
};

export default Preload;
