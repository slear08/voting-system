import { create } from 'zustand';

export type User = {
    _id: string;
    email: string;
    googleId: string;
    name: string;
    profile: string;
    status: boolean;
    votes: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
};

type UserStore = {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
};

const useUserStore = create<UserStore>((set) => ({
    user: null,

    setUser: (user: User) => {
        set({ user });

        localStorage.setItem('user', JSON.stringify(user));
    },

    logout: () => {
        set({ user: null });

        localStorage.removeItem('user');
    }
}));

const storedUser = localStorage.getItem('user');
if (storedUser) {
    useUserStore.setState({ user: JSON.parse(storedUser) });
}

export default useUserStore;
