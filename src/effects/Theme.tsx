import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
  createContext,
  useState,
  ReactNode,
} from 'react';
import { ConfigProvider, theme as antdTheme } from "antd";

interface ThemeContextInterface {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextInterface>({
  theme: 'light',
  setTheme: () => null,
  toggleTheme: () => null,
});

const getTheme = () => {
  const theme = localStorage.getItem('theme');
  if (!theme) { // default theme
    localStorage.setItem('theme', 'light');
    return 'light';
  }

  return theme;
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [ theme, setTheme ] = useState(getTheme);

  function toggleTheme() {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  const refreshTheme = useCallback(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    refreshTheme();
  }, [refreshTheme, theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      <div className={`theme-container ${theme}`}>
        <ConfigProvider
          theme={{
            algorithm: theme === 'dark'
              ? antdTheme.darkAlgorithm
              : antdTheme.defaultAlgorithm
          }}
        >
          {children}
        </ConfigProvider>
      </div>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
