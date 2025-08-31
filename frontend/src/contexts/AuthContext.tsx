import React, { createContext, useState, useEffect, useContext } from "react";
import { IUser } from "../types";
import { setToken, setUser, getUser, getToken, removeToken, removeUser } from "../utils/storage";
import { verifyOtp as verifyOtpApi } from "../services/authService";
import api from "../api/axios";

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  loginWithToken: (token: string, user?: IUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<IUser | null>(() => getUser());
  const [token, setTokenState] = useState<string | null>(() => getToken());
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token && !user) {
      // optional: fetch /me to get user
      (async () => {
        try {
          setLoading(true);
          const res = await api.get("/api/auth/me");
          setUserState(res.data.user);
          setUser(res.data.user);
        } catch (err) {
          // invalid token: logout
          setUserState(null);
          removeToken();
          removeUser();
          setTokenState(null);
        } finally {
          setLoading(false);
        }
      })();
    }
    // eslint-disable-next-line
  }, []);

  const loginWithToken = (t: string, u?: IUser) => {
    setToken(t);
    setTokenState(t);
    if (u) {
      setUser(u);
      setUserState(u);
    } else {
      // optionally fetch user later
    }
  };

  const logout = () => {
    removeToken();
    removeUser();
    setTokenState(null);
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, loginWithToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
