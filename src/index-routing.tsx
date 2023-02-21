import React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';

import { Page404 } from 'views/Page404';
import { Login } from 'views/Login';
import { Register } from 'views/Register';
import { Timeline } from 'views/Timeline';
import { TweetDetail } from 'views/TweetDetail';

export const generateAppRoutes = (loginUser: string | null) => createBrowserRouter([
  {
    path: '*',
    element: <Page404/>,
  },
  {
    path: '/',
    loader: () => {
      if (loginUser) {
        return redirect(`/${loginUser}`);
      }

      return redirect('/login');
    },
  },
  {
    path: '/login',
    element: <Login/>,
    loader: () => {
      if (loginUser) {
        return redirect(`/${loginUser}`);
      }

      return null;
    },
  },
  {
    path: '/register',
    element: <Register/>,
    loader: () => {
      if (loginUser) {
        return redirect(`/${loginUser}`);
      }

      return null;
    },
  },
  {
    path: '/:username',
    element: <Timeline/>,
    loader: () => {
      if (loginUser) {
        return null;
      }

      return redirect('/login');
    },
  },
  {
    path: '/tweet/:id',
    element: <TweetDetail/>,
    loader: () => {
      if (loginUser) {
        return null;
      }

      return redirect('/login');
    },
  },
]);
