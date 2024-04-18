export const RedirectToGoogleSSO = () => {
    window.open(import.meta.env.VITE_SERVER, '_self');
};
