"use client";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signupSuccess } from "@/store/authSlice"; // ✅ use signupSuccess now

// Types for buyer form
type BuyerFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Types for farmer form
type FarmerFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  farmName: string;
  location: string;
  phone: string;
};

// Buyer form component
function BuyerSignupForm({ onBack }: { onBack: () => void }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BuyerFormValues>({ mode: "onBlur" });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password");
  const dispatch = useDispatch();

  const onSubmit = (data: BuyerFormValues) => {
    const user = {
      name: data.name,
      email: data.email,
      role: "buyer" as const,
    };
    dispatch(signupSuccess(user)); // store this user in Redux
    router.push("/"); // redirect to buyer dashboard
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 px-8 py-8 w-full max-w-xl mx-auto"
      noValidate
    >
      <h2 className="text-2xl font-semibold mb-2">
        Sign up as <span className="text-green-600 font-bold">Buyer</span>
      </h2>

      {/* Name */}
      <label className="text-sm font-medium">Name</label>
      <input
        type="text"
        className="border rounded px-3 py-2"
        {...register("name", { required: "Name is required" })}
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      {/* Email */}
      <label className="text-sm font-medium">Email</label>
      <input
        type="email"
        className="border rounded px-3 py-2"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email",
          },
        })}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      {/* Password */}
      <label className="text-sm font-medium">Password</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className="border rounded px-3 py-2 w-full"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-2 text-gray-600 hover:text-gray-900"
        >
          {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </button>
      </div>
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

      {/* Confirm Password */}
      <label className="text-sm font-medium">Confirm Password</label>
      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          className="border rounded px-3 py-2 w-full"
          {...register("confirmPassword", {
            required: "Confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-2 top-2 text-gray-600 hover:text-gray-900"
        >
          {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </button>
      </div>
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
      )}

      <div className="flex gap-2 mt-2">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-200 text-gray-700 rounded py-2 px-4 font-semibold hover:bg-gray-300 transition"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white rounded py-2 px-4 font-semibold hover:bg-green-700 transition"
        >
          Signup
        </button>
      </div>

      <div className="text-center text-sm mt-2 mb-2">
        Have an account?{" "}
        <Link href="/login" className="text-green-600 hover:underline">
          Sign in
        </Link>
      </div>
    </form>
  );
}

// Farmer form component
function FarmerSignupForm({ onBack }: { onBack: () => void }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FarmerFormValues>({ mode: "onBlur" });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password");
  const dispatch = useDispatch();

  const onSubmit = (data: FarmerFormValues) => {
    const user = {
      name: data.name,
      email: data.email,
      role: "farmer" as const,
      farmName: data.farmName,
      location: data.location,
      phone: data.phone,
    };
    dispatch(signupSuccess(user)); // store in Redux
    router.push("/farmer/dashboard"); // redirect
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 px-8 py-8 w-full max-w-xl mx-auto"
      noValidate
    >
      <h2 className="text-2xl font-semibold mb-2">
        Sign up as <span className="text-green-600 font-bold">Farmer</span>
      </h2>

      {/* Name */}
      <label className="text-sm font-medium">Full Name</label>
      <input
        type="text"
        className="border rounded px-3 py-2"
        {...register("name", { required: "Full name is required" })}
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      {/* Email */}
      <label className="text-sm font-medium">Email</label>
      <input
        type="email"
        className="border rounded px-3 py-2"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email",
          },
        })}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      {/* Password */}
      <label className="text-sm font-medium">Password</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className="border rounded px-3 py-2 w-full"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-2 text-gray-600 hover:text-gray-900"
        >
          {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </button>
      </div>
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

      {/* Confirm Password */}
      <label className="text-sm font-medium">Confirm Password</label>
      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          className="border rounded px-3 py-2 w-full"
          {...register("confirmPassword", {
            required: "Confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-2 top-2 text-gray-600 hover:text-gray-900"
        >
          {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </button>
      </div>
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
      )}

      {/* Farm Name */}
      <label className="text-sm font-medium">Farm Name</label>
      <input
        type="text"
        className="border rounded px-3 py-2"
        {...register("farmName", { required: "Farm name is required" })}
      />
      {errors.farmName && <p className="text-red-500 text-sm">{errors.farmName.message}</p>}

      {/* Farm Location */}
      <label className="text-sm font-medium">Farm Location</label>
      <input
        type="text"
        className="border rounded px-3 py-2"
        {...register("location", { required: "Farm location is required" })}
      />
      {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}

      {/* Phone */}
      <label className="text-sm font-medium">Phone Number</label>
      <input
        type="text"
        className="border rounded px-3 py-2"
        {...register("phone", {
          required: "Phone number is required",
          pattern: { value: /^[0-9]+$/, message: "Only numbers allowed" },
        })}
      />
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

      <div className="flex gap-2 mt-2">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-200 text-gray-700 rounded py-2 px-4 font-semibold hover:bg-gray-300 transition"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white rounded py-2 px-4 font-semibold hover:bg-green-700 transition"
        >
          Signup
        </button>
      </div>

      <div className="text-center text-sm mt-2 mb-2">
        Have an account?{" "}
        <Link href="/login" className="text-green-600 hover:underline">
          Sign in
        </Link>
      </div>
    </form>
  );
}

export default function SignupPage() {
  const [formType, setFormType] = useState<"none" | "buyer" | "farmer">("none");
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  const handleSelect = (type: "buyer" | "farmer") => {
    setFormType(type);
    setShowModal(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
    router.push("/login");
  };

  const handleBack = () => {
    setFormType("none");
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start">
      <Image
        src="/images/background.jpg"
        alt="Agrilink"
        width={1000}
        height={400}
        className="w-full h-64 object-cover mb-4"
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto relative">
            <button
              onClick={handleModalClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Sign up for <span className="text-green-600 font-bold">Agrilink</span>
            </h2>
            <div className="flex gap-6 justify-center">
              <button
                className="bg-green-600 text-white rounded px-8 py-4 font-bold text-lg hover:bg-green-700 transition"
                onClick={() => handleSelect("buyer")}
              >
                Sign up as Buyer
              </button>
              <button
                className="bg-green-600 text-white rounded px-8 py-4 font-bold text-lg hover:bg-green-700 transition"
                onClick={() => handleSelect("farmer")}
              >
                Sign up as Farmer
              </button>
            </div>
          </div>
        </div>
      )}

      {formType === "buyer" && <BuyerSignupForm onBack={handleBack} />}
      {formType === "farmer" && <FarmerSignupForm onBack={handleBack} />}
    </div>
  );
}
