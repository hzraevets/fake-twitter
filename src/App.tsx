import React, { useContext } from "react";
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme as antdTheme } from "antd";

import { generateAppRoutes } from './index-routing';
import { ThemeContext } from 'effects/Theme';
import { IdentityContext } from 'effects/Identity';

export function App() {
  const { theme } = useContext(ThemeContext);
  const { loginUser } = useContext(IdentityContext);

  return (
    <ConfigProvider theme={{ algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm }}>
      <div className={`app-container ${theme}`}>
        <div className="app relative h-screen w-full min-w-min bg-blue-400 dark:bg-black text-black dark:text-white">
          <RouterProvider router={generateAppRoutes(loginUser)} />
        </div>
      </div>
    </ConfigProvider>
  );
}
