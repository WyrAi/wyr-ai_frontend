import { createContext, useContext, useEffect, useState } from "react";
import { getAuthToken, setAuthToken } from "../Utils/authUtils";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const { children } = props;
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    if (auth) {
      setAuthToken(auth);
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);

