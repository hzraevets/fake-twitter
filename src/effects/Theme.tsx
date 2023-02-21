import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  createContext,
  useState,
  ReactNode,
} from 'react';

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

  useEffect(() => {
    const refreshTheme = () => {
      localStorage.setItem('theme', theme);
    };

    refreshTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
