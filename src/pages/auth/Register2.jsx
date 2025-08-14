import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEyeSlash } from "react-icons/fa";
import { PiEye } from "react-icons/pi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadFileMutation } from "../../features/file/fileSlice";
import { useRegisterMutation } from "../../features/auth/authSlide";
import { useNavigate } from "react-router";

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: z.string().nonempty("Password is required").min(4, "Must be greater than 4"),
});

export default function Register2() {
  const [uploadFile] = useUploadFileMutation();
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "", avatar: "" },
  });

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    let avatarUrl = "";
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      const res = await uploadFile(formData).unwrap();
      avatarUrl = res.location;
    }

    const submitData = { ...data, avatar: avatarUrl };
    const result = await registerUser(submitData).unwrap();
    if (result) navigate("/login");
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-900 transition";

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration / Branding */}
      <div className="hidden lg:flex w-1/2 bg-green-500 items-center justify-center">
        <div className="text-center px-10">
          <h1 className="text-5xl font-extrabold text-white mb-6">
            Join Us!
          </h1>
          <p className="text-white text-lg mb-8">
            Create your account and start managing your products easily.
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-green-200"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Create Your Account
          </h2>

          {/* Avatar Upload */}
          <div className="flex justify-center mb-8">
            <label htmlFor="avatar" className="cursor-pointer group">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-32 h-32 flex flex-col items-center justify-center rounded-full border-4 border-dashed border-green-400 text-gray-400 bg-white/60 group-hover:bg-white/80 transition">
                  <svg className="w-8 h-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-sm">Upload</p>
                </div>
              )}
              <input
                {...register("avatar")}
                type="file"
                accept="image/*"
                id="avatar"
                className="hidden"
                onChange={handleImagePreview}
              />
            </label>
          </div>

          {/* Name */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              className={inputClass}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={inputClass}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <input
              type={isShowPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className={inputClass + " pr-12"}
            />
            <div
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="absolute top-3 right-3 text-gray-500 cursor-pointer"
            >
              {isShowPassword ? "👁️" : "🙈"}
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-xl font-semibold text-white text-lg bg-green-500 hover:bg-green-600 shadow-md transition"
          >
            Register
          </button>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-green-500 font-semibold hover:underline">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
