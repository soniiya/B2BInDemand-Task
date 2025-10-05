"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Mail, Lock, User, Building } from "lucide-react";
import { signup } from "@/app/lib/api";
import { useRouter } from "next/navigation";

type UserSignUpPayload = {
  orgDomain: string;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UserSignUpPayload>({
    defaultValues: {
      orgDomain: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const [message, setMessage] = useState("");

  const onSubmit = async (data: UserSignUpPayload) => {

    try {
      const res = await signup(data);
      if(res){
       router.push('/dashboard');
      }
      else{
        throw('Sign up Failed')
      }
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div
        className="w-full max-w-md bg-white p-8 space-y-8 rounded-2xl shadow-2xl 
                   transform transition duration-300 hover:shadow-3xl 
                   border border-gray-100"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Create Your Account
          </h2>
          <p className="text-sm text-gray-600">
            Join the B2B Indemand platform
          </p>
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
              <Building size={18} />
            </span>
            <input
              {...register("orgDomain", {
                required: "Organization Domain is required.",
                // pattern: {
                //   value: /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
                //   message: "Enter a valid domain format.",
                // },
              })}
              type="text"
              placeholder="Organization Domain (e.g., acme.com)"
              className={`pl-10 w-full py-3 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.orgDomain ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.orgDomain && (
              <p className="text-xs text-red-600 mt-1">{errors.orgDomain.message}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">Your organization's unique domain.</p>
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <User size={18} />
            </span>
            <input
              {...register("name", {
                required: "Full Name is required.",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters.",
                },
              })}
              type="text"
              placeholder="Full Name"
              className={`pl-10 w-full py-3 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

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
              {isSubmitting ? "Registering..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="text-sm text-center pt-4">
          <Link
            href="login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
