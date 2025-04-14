/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children, value }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
