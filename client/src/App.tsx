import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';

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
import Results from '@/pages/admin/Results';
import CandidatesResults from '@/pages/admin/Results/candidates';
import Voters from '@/pages/admin/Voters';
import CandidatesAdmin from '@/pages/admin/Candidates';
import OrganizationAdmin from '@/pages/admin/Organization';
import OrganizationByIDAdmin from '@/pages/admin/components/organization';
import CreateOrganization from '@/pages/admin/components/organization/create-form';
import NotFound from '@/pages/404Page';
import AuthenticatedRoute from '@/components/auth';

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
                }
            ]
        },
        {
            path: '/admin',
            element: <AdminLayout />,
            children: [
                {
                    path: '',
                    element: <AuthenticatedRoute />,
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
                            element: <Results />
                        },
                        {
                            path: 'results/org/:id',
                            element: <CandidatesResults />
                        },
                        {
                            path: 'voters',
                            element: <Voters />
                        },
                        {
                            path: 'candidates',
                            element: <CandidatesAdmin />
                        },
                        {
                            path: 'organizations',
                            children: [
                                {
                                    path: '',
                                    element: <OrganizationAdmin />
                                },
                                {
                                    path: 'org/edit/:id',
                                    element: <OrganizationByIDAdmin />
                                },
                                {
                                    path: 'org/create',
                                    element: <CreateOrganization />
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            path: '/login/success',
            element: <Authenticated />
        },
        {
            path: '/signin',
            element: <AdminLogin />
        },
        {
            path: '*',
            element: <NotFound />
        }
    ]);

    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster />
        </QueryClientProvider>
    );
}

export default App;
