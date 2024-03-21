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
                    path: '/candidates/:id',
                    element: <CandidatesByID />
                },
                {
                    path: '/signin',
                    element: <Login />
                }
            ]
        }
    ]);

    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />;
        </QueryClientProvider>
    );
}

export default App;
