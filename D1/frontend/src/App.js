import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Users } from './pages/Users';

// Set up routers
const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/profile',
        element: <Profile /> 
    },
    {
        path:'users',
        element:<Users/>
    }
]);

class App extends React.Component {
    render() {
        return (
            <RouterProvider router={router} />
        );
    }
}

export { App };
