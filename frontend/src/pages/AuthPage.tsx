import React, { useState } from "react";
import { requestOtp as requestOtpApi, verifyOtp as verifyOtpApi } from "../services/authService";
import { setToken, setUser } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// ✅ Import your assets from src/assets
import LoginIllustration from "../assets/login-illustration.png";
import Logo from "../assets/logo.png"; // (exported from Figma as PNG or SVG)

const AuthPage: React.FC = () => {
  const [isSignup, setIsSignup] = useState(true); // toggle between SignUp & SignIn
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const auth = useAuth();
  const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const resetState = () => {
    setEmail("");
    setOtp("");
    setOtpRequested(false);
    setError(null);
    setMsg(null);
  };

  const onRequestOtp = async () => {
    setError(null);
    setMsg(null);
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email");
      return;
    }
    try {
      setLoading(true);
      await requestOtpApi(email);
      setOtpRequested(true);
      setMsg("OTP sent to your email. Check spam if not received.");
    } catch (err: any) {
      setError(err?.response?.data?.error || err.message || "Failed to request OTP");
    } finally {
      setLoading(false);
    }
  };

  const onVerifyOtp = async () => {
    setError(null);
    setMsg(null);
    if (!otp || !/^\d{4,8}$/.test(otp)) {
      setError("Enter valid OTP");
      return;
    }
    try {
      setLoading(true);
      const res = await verifyOtpApi(email, otp);
      const { token, user } = res;
      setToken(token);
      setUser(user);
      auth.loginWithToken(token, user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.error || err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const onGoogleLogin = () => {
    window.location.href = `${apiBase}/api/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">

        {/* LEFT SIDE (Form) */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          
          {/* ✅ Logo */}
          <div className="flex items-center mb-6">
            <img src={Logo} alt="Notes App Logo" className="w-8 h-8 mr-2" />
            <span className="font-bold text-lg">Notes App</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold mb-2">{isSignup ? "Sign up" : "Sign in"}</h2>
          <p className="text-sm text-gray-600 mb-6">
            {isSignup
              ? "Sign up to try the features of Notes App"
              : "Please sign in to continue to your account"}
          </p>

          {msg && <div className="mb-3 text-sm text-green-600">{msg}</div>}
          {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              disabled={otpRequested}
            />
          </div>

          {/* OTP Flow */}
          {!otpRequested ? (
            <button
              onClick={onRequestOtp}
              disabled={loading}
              className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              {loading ? "Sending OTP..." : isSignup ? "Sign up" : "Sign in"}
            </button>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <button
                onClick={onVerifyOtp}
                disabled={loading}
                className="w-full py-2 rounded bg-green-600 hover:bg-green-700 text-white font-medium"
              >
                {loading ? "Verifying..." : "Continue"}
              </button>
            </>
          )}

          {/* Toggle between Sign up & Sign in */}
          <p className="mt-4 text-sm text-gray-600">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setIsSignup(false);
                    resetState();
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => {
                    setIsSignup(true);
                    resetState();
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </div>

        {/* RIGHT SIDE (Image) */}
        <div className="hidden md:block md:w-1/2 bg-gray-50">
          <img
            src={LoginIllustration}
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
