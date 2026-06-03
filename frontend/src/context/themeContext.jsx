import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeAccent, setThemeAccent] = useState(
    localStorage.getItem('themeAccent') || 'purple'
  );

  useEffect(() => {
    localStorage.setItem('themeAccent', themeAccent);

    document.documentElement.setAttribute(
      'data-theme',
      themeAccent
    );
  }, [themeAccent]);

  return (
    <ThemeContext.Provider
      value={{
        themeAccent,
        setThemeAccent,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  console.log('Theme Context:', context);

  return context;
}