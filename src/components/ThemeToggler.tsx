import React, { useContext } from "react";
import { Switch } from 'antd';

import { ThemeContext } from 'effects/Theme';

export const ThemeToggler = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className="absolute top-2 right-2 cursor-pointer select-none"
      onClick={() => toggleTheme()}
    >
      <Switch checked={theme === 'dark'} />
    </div>
  );
};
