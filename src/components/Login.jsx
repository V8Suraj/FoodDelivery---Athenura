import React, { useState } from "react";
import Loginbg2 from "../assets/loginbg2.png";

// Firebase
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword
} from "firebase/auth";

// Icons
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // 🔥 loader

  // ✅ Email Login
  const handleEmailLogin = async () => {
    try {
      if (!email || !password) {
        alert("Enter email and password");
        return;
      }

      setLoading(true);

      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      localStorage.setItem("user", JSON.stringify(user));

      setTimeout(() => {
        window.location.reload();
      }, 3000);

    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  // ✅ Google Login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      localStorage.setItem("user", JSON.stringify(user));

      setTimeout(() => {
        window.location.reload();
      }, 3000);

    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('${Loginbg2}')`,
      }}
    >
      <div className="bg-white w-[360px] p-8 rounded-2xl shadow-xl text-center">

        <h1 className="text-3xl font-semibold mb-2">Login</h1>
        <p className="text-gray-400 text-sm mb-6">
          More than <span className="text-pink-500 font-semibold">15,000 recipes</span> from around the world!
        </p>

        {/* Email */}
        <div className="relative mb-4">
          <input
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-200 outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-200 outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Options */}
        <div className="flex justify-between text-sm text-gray-400 mb-5">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>
          <span className="cursor-pointer hover:text-orange-500">
            Forgot Password?
          </span>
        </div>

        {/* 🔥 Loader OR Button */}
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <button 
            className="cursor-pointer w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold transition"
            onClick={handleEmailLogin}
          >
            LOGIN
          </button>
        )}

        {/* Divider */}
        <div className="flex items-center gap-2 my-5 text-gray-300 text-sm">
          <div className="flex-1 h-[1px] bg-gray-200"></div>
          Login with
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 text-lg">

          <span className="cursor-pointer bg-gray-100 p-3 rounded-full">
            <FaFacebookF className="text-blue-600" />
          </span>

          <span 
            onClick={handleGoogleLogin}
            className="cursor-pointer bg-gray-100 p-3 rounded-full"
          >
            <FaGoogle className="text-red-500" />
          </span>

          <span className="cursor-pointer bg-gray-100 p-3 rounded-full">
            <FaTwitter className="text-sky-500" />
          </span>

        </div>

      </div>
    </div>
  );
};

export default Login;