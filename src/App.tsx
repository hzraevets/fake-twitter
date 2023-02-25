import React, { useContext } from "react";
import { RouterProvider } from 'react-router-dom';

import { generateAppRoutes } from './index-routing';
import { IdentityContext } from 'effects/Identity';

export function App() {
  const { loginUser } = useContext(IdentityContext);

  return (
    <div className="app relative h-screen w-full min-w-min bg-blue-400 dark:bg-black text-black dark:text-white">
      <RouterProvider router={generateAppRoutes(loginUser)} />
    </div>
  );
}
