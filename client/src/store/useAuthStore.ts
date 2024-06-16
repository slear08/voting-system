import { create } from 'zustand';

export type Auth = {
    isAuthenticated: boolean;
};

type UserAuth = {
    isAuthenticated: Auth | null;
    setAuthenticate: (isAuthenticated: Auth) => void;
    logout: () => void;
};

const useAuthStore = create<UserAuth>((set) => ({
    isAuthenticated: null,

    setAuthenticate: (isAuthenticated: Auth) => {
        set({ isAuthenticated });

        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    },

    logout: () => {
        set({ isAuthenticated: null });

        localStorage.removeItem('isAuthenticated');
    }
}));

const storedUser = localStorage.getItem('isAuthenticated');
if (storedUser) {
    useAuthStore.setState({ isAuthenticated: JSON.parse(storedUser) });
}

export default useAuthStore;
