import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import Profile from './pages/Profile';
import Users from './pages/Users'; // Ensure this path is correct
import { SplashPage } from './pages/SplashPage';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SplashPage />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/profile/:id',
    element: <Profile />, // Now this route supports dynamic :id
  },
  {
    path: '/users',
    element: <Users />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

class App extends React.Component {
  render() {
    return <RouterProvider router={router} />;
  }
}

export { App };
