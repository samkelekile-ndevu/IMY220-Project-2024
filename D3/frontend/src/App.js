import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import {Profile} from './pages/Profile';
import {Users} from './pages/Users';
import { Playlist } from './pages/Playlist'; 
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
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/users',
    element: <Users />,
  },
  {
    path: '/profile/:id',
    element: <Profile />, // Now this route supports dynamic :id for other users
  },
  // {
  //   path: '/profile',
  //   element: <Profile />, 
  // },
  
  {
    path: '/playlist/:id', // Add a new route for a specific playlist
    element: <Playlist/>,
  },
]);

class App extends React.Component {
  render() {
    return <RouterProvider router={router} />;
  }
}

export { App };
