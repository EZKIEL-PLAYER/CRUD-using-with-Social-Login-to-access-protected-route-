import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLoginMutation } from "../../features/auth/authSlide";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useState } from "react";

import { useLoginWithGoogle } from "../../components/social-auth/GoogleAuthComponent";
import { useLoginWithFacebook } from "../../components/social-auth/FacebookAuthComponent";
import { useLoginWithGitHub } from "../../components/social-auth/GithubAuthComponent";

import FacebookLogo from '../../assets/social-media/facebook.png';
import GithubLogo from '../../assets/social-media/github.png';
import GoogleLogo from '../../assets/social-media/google.png';

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

  const { loginWithGoogle } = useLoginWithGoogle();
  const { loginWithGitHub } = useLoginWithGitHub();
  const { loginWithFacebook } = useLoginWithFacebook();

  const schema = z.object({
    email: z.string().nonempty("Email is required").email(),
    password: z.string().nonempty("Password is required"),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await login(data).unwrap();
      if (result) navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || "Login failed");
    } finally {
      reset();
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-900 transition";

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration / Branding */}
      <div className="hidden lg:flex w-1/2 bg-green-500 items-center justify-center">
        <div className="text-center px-10">
          <h1 className="text-5xl font-extrabold text-white mb-6">
            Welcome Back!
          </h1>
          <p className="text-white text-lg mb-8">
            Sign in to access your dashboard and manage your products effortlessly.
          </p>
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80"
            alt="Illustration"
            className="rounded-xl shadow-xl"
          />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-1 items-center justify-center bg-green-50">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-green-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <input
              {...register("email")}
              type="text"
              placeholder="Email"
              className={inputClass}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <div className="relative">
              <input
                {...register("password")}
                type={isShowPassword ? "text" : "password"}
                placeholder="Password"
                className={inputClass + " pr-12"}
              />
              <div
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute top-3 right-3 cursor-pointer text-gray-400"
              >
                {isShowPassword ? "👁️" : "🙈"}
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 mt-2 rounded-xl font-semibold text-white text-lg transition ${
                isLoading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 shadow-md"
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4 font-medium">Or login with</p>
            <div className="flex justify-center gap-5">
              <button onClick={loginWithGoogle} className="transform hover:scale-110 transition">
                <img src={GoogleLogo} alt="Google" className="w-10 h-10" />
              </button>
              <button onClick={loginWithFacebook} className="transform hover:scale-110 transition">
                <img src={FacebookLogo} alt="Facebook" className="w-10 h-10" />
              </button>
              <button onClick={loginWithGitHub} className="transform hover:scale-110 transition">
                <img src={GithubLogo} alt="GitHub" className="w-10 h-10" />
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-green-500 font-semibold hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
