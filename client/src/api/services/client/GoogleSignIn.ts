export const RedirectToGoogleSSO = () => {
    window.open('http://localhost:3000/api/auth/login/google', '_self');
};
