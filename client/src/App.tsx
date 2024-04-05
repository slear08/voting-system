import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// CLIENT PAGES
import ClientLayout from '@/layouts/client';
import About from '@/pages/client/about';
import Home from '@/pages/client/home';
import Login from '@/pages/client/login';
import Organization from '@/pages/client/organization';
import OrganizationByID from '@/pages/components/organization';
import Candidates from '@/pages/client/candidates';
import CandidatesByID from '@/pages/components/candidates';
import CandidateByOrg from '@/pages/components/candidates/candidatesByOrg';
import Authenticated from '@/pages/components/authenticated';

// ADMIN PAGES
import AdminLayout from '@/layouts/admin';
import AdminLogin from '@/pages/admin/Login';
import Main from '@/pages/admin/Main';
function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <ClientLayout />,
            children: [
                {
                    path: '/',
                    element: <Home />
                },
                {
                    path: '/home',
                    element: <Home />
                },
                {
                    path: '/about',
                    element: <About />
                },
                {
                    path: '/organizations',
                    element: <Organization />
                },
                {
                    path: '/candidates',
                    element: <Candidates />
                },
                {
                    path: '/organizations/:id',
                    element: <OrganizationByID />
                },
                {
                    path: '/candidate/:id',
                    element: <CandidatesByID />
                },
                {
                    path: '/candidates/org/:id',
                    element: <CandidateByOrg />
                },
                {
                    path: '/signin',
                    element: <Login />
                }
            ]
        },
        {
            path: '/admin',
            element: <AdminLayout />,
            children: [
                {
                    path: '',
                    element: <Main />
                },
                {
                    path: 'dashboard',
                    element: <Main />
                },
                {
                    path: 'results',
                    element: <Main />
                },
                {
                    path: 'voters',
                    element: <Main />
                },
                {
                    path: 'candidates',
                    element: <Main />
                },
                {
                    path: 'organizations',
                    element: <Main />
                }
            ]
        },
        {
            path: '/login/success',
            element: <Authenticated />
        },
        {
            path: '/login',
            element: <AdminLogin />
        }
    ]);

    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
