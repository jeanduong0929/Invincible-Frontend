import { useState, createContext, useEffect } from "react";
import Auth from "../models/Auth";

export const AuthContext = createContext<Auth | null>(null);
export const SetAuthContext = createContext<Function | null>(null);

const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    const data = window.sessionStorage.getItem("auth");
    if (data !== null) {
      setAuth!({ ...JSON.parse(data) });
    }
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      <SetAuthContext.Provider value={setAuth}>
        {children}
      </SetAuthContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
