import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
//first create context like this
const AppContext = createContext();

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;

  const storedDarkMode = localStorage.getItem("darkTheme") === "true";

  if (storedDarkMode === null) return prefersDarkMode;
  if (storedDarkMode !== null) return storedDarkMode;
};

//create a fun called AppProvider with children prop so, we can access it later.
export const AppProvider = ({ children }) => {
  //create a state to keep track of dark theme
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState("Ethiopia");
  //create a function
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);
  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

//there is why we create context file is because we wanna stop using props drilling
//we create context file to avoid that.
