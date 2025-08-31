import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setToken, setUser } from "../utils/storage";
import { useAuth } from "../contexts/AuthContext";

/**
 * Backend redirects to FRONTEND_URL/auth/google/success?token=...
 * We parse token and log the user in.
 */
const GoogleCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      navigate("/auth");
      return;
    }
    // store token. Backend doesn't return user here; we let AuthProvider fetch /me if needed
    setToken(token);
    auth.loginWithToken(token, undefined);
    // redirect to dashboard
    navigate("/dashboard");
  }, [searchParams, auth, navigate]);

  return <div className="text-center py-20">Signing you in…</div>;
};

export default GoogleCallback;
