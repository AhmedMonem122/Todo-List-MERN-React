import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const saveUserData = () => {
    const encodedToken = localStorage.getItem("Authorization");
    const decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  };

  useEffect(() => {
    if (localStorage.getItem("Authorization")) {
      saveUserData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData, saveUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
