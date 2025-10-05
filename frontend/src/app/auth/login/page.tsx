"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Mail, Lock, User, Building } from "lucide-react";
import { login } from "@/app/lib/api";
import { useRouter } from "next/navigation";

type IUserLoginPayload = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUserLoginPayload>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [message, setMessage] = useState("");

  const onSubmit = async (data: IUserLoginPayload) => {
    setMessage("");

    try {
      const res = await login(data);
      if(res) {
      setMessage("Login successful!");
      router.push('/dashboard')
      }
      else throw "Login failed"
    } catch (error) {
      console.error("Sign up failed:", error);
      setMessage("login failed. Please try again.");
    }
  };

  useEffect(() => {
    console.log("State updated. Current message is:", message);
}, [message]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div
        className="w-full max-w-md bg-white p-8 space-y-8 rounded-2xl shadow-2xl 
                   transform transition duration-300 hover:shadow-3xl 
                   border border-gray-100"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Sign In Your Account
          </h2>
        </div>

        {message && (
          <div
            className={`p-3 rounded-xl text-sm ${
              message.includes("successful")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Mail size={18} />
            </span>
            <input
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email address.",
                },
              })}
              type="email"
              placeholder="Email Address"
              className={`pl-10 w-full py-3 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock size={18} />
            </span>
            <input
              {...register("password", {
                required: "Password is required.",
                // minLength: {
                //   value: 8,
                //   message: "Password must be at least 8 characters.",
                // },
              })}
              type="password"
              placeholder="Password"
              className={`pl-10 w-full py-3 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full flex justify-center py-3 px-4 border border-transparent 
                text-sm font-medium rounded-xl shadow-lg transition duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                transform hover:scale-[1.01]
                ${
                  isSubmitting
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }
              `}
            >
              {isSubmitting ? "Logging In..." : "Log In"}
            </button>
          </div>
        </form>

        <div className="text-sm text-center pt-4">
          <Link
            href="signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Don't have a account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;



 {/* Confirm Password (Client-side validation) */}
          {/* <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock size={18} />
            </span>
            <input
              {...register("confirmPassword", {
                required: "Confirm Password is required.",
                validate: (value: any) =>
                  value === password || "Passwords do not match.",
              })}
              type="password"
              placeholder="Confirm Password"
              className={`pl-10 w-full py-3 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-600 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div> */}