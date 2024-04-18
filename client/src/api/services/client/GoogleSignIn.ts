export const RedirectToGoogleSSO = () => {
    window.open(`${import.meta.env.VITE_SERVER}/api/auth/login/google`, '_self');
};
