"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState(null); // this option can be either "signin" or "signup"
  return (
    <AppContext.Provider value={{ selectedOption, setSelectedOption }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
