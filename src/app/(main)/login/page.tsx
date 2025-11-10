// "use client";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "@/store/authSlice";

// type FormValues = {
//   email: string;
//   password: string;
// };

// export default function LoginPage() {
//   const router = useRouter();
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();

//   // Initialize React Hook Form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>();

//   // Handle form submission
//   const onSubmit = async (data: FormValues) => {
//     let role: 'buyer' | 'farmer' = 'buyer';
//     if (data.email.includes('farmer')) role = 'farmer';

//     const user = {
//       name: "mary",
//       email: data.email,
//       role,
//     };
//     dispatch(loginSuccess(user));

//     // Redirect based on role:
//     if (role === "farmer") {
//       router.push("/farmer/dashboard");
//     } else {
//       router.push("/");
//     }

//     // call an API:
//     /*
//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: data.email, password: data.password }),
//       });

//       if (response.ok) {
//         router.push("/");
//       } else {
//         setError("Invalid email or password.");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       setError("An error occurred. Please try again.");
//     }
//     */
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center justify-start">
//       <Image
//         src="/images/background.jpg"
//         alt="farmMart"
//         width={1000}
//         height={400}
//         className="w-full h-64 object-cover mb-4"
//       />

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex flex-col gap-4 px-8 py-8 w-full max-w-xl mx-auto"
//       >
//         <h2 className="text-2xl font-semibold mb-2">
//           Log into <span className="text-orange-600 font-bold">farmMart</span>
//         </h2>
//         <p className="text-gray-600 mb-4">Get Started Now</p>

//         {/*Email Field */}
//         <label className="text-sm font-medium">Email</label>
//         <input
//           type="email"
//           className="border rounded px-3 py-2"
//           {...register("email", {
//             required: "Email is required",
//             pattern: {
//               value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//               message: "Enter a valid email",
//             },
//           })}
//         />
//         {errors.email && (
//           <p className="text-red-500 text-sm">{errors.email.message}</p>
//         )}

//         {/* Password Field */}
//         <label className="text-sm font-medium">Password</label>
//         <input
//           type="password"
//           className="border rounded px-3 py-2"
//           {...register("password", {
//             required: "Password is required",
//             minLength: {
//               value: 6,
//               message: "Password must be at least 6 characters",
//             },
//           })}
//         />
//         {errors.password && (
//           <p className="text-red-500 text-sm">{errors.password.message}</p>
//         )}

//         {/* General Error (e.g., from API) */}
//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         <div className="flex justify-between text-xs text-gray-500 mb-2">
//           <button type="button" className="hover:underline">
//             Forgotten Password? Reset Password
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="bg-orange-600 text-white rounded py-2 font-semibold hover:bg-orange-700 transition mt-2"
//         >
//           Login
//         </button>

//         <div className="text-center text-sm mt-2">
//           don&apos;t have an account?{" "}
//           <Link href="/signup" className="text-orange-600 hover:underline">
//             Sign up
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// }

//using mock data
"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/authSlice";
import { mockUsers } from "@/data/mockUser";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    // ✅ Find a matching user in the mock list
    const matchedUser = mockUsers.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (!matchedUser) {
      // ❌ No match found
      setError("Invalid email or password.");
      return;
    }

    // ✅ Dispatch to redux
    dispatch(
      loginSuccess({
        name: matchedUser.name,
        email: matchedUser.email,
        role: matchedUser.role,
      })
    );

    // ✅ Redirect based on role
    if (matchedUser.role === "farmer") {
      router.push("/farmer/dashboard");
    } else {
      router.push("/");
    }

    // Your API code remains commented out for later use
    /*
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again.");
    }
    */
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start">
      <Image
        src="/images/background.jpg"
        alt="farmMart"
        width={1000}
        height={400}
        className="w-full h-64 object-cover mb-4"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 px-8 py-8 w-full max-w-xl mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-2">
          Log into <span className="text-orange-600 font-bold">farmMart</span>
        </h2>
        <p className="text-gray-600 mb-4">Get Started Now</p>

        {/* Email Field */}
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          className="border rounded px-3 py-2"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Password Field */}
        <label className="text-sm font-medium">Password</label>
        <input
          type="password"
          className="border rounded px-3 py-2"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {/* General Error */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <button type="button" className="hover:underline">
            Forgotten Password? Reset Password
          </button>
        </div>

        <button
          type="submit"
          className="bg-orange-600 text-white rounded py-2 font-semibold hover:bg-orange-700 transition mt-2"
        >
          Login
        </button>

        <div className="text-center text-sm mt-2">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-orange-600 hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}

// "use client";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginSuccess } from "@/store/authSlice";
// import type { RootState } from "@/store/store";

// type FormValues = {
//   email: string;
//   password: string;
// };

// export default function LoginPage() {
//   const router = useRouter();
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();

//   // Get registered users from Redux
//   const registeredUsers = useSelector(
//     (state: RootState) => state.auth.registeredUsers
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>();

//   // Handle form submission
//   const onSubmit = async (data: FormValues) => {
//     // Look for user in Redux state
//     const matchedUser = registeredUsers.find(
//       (u: any) =>
//         u.email === data.email
//         // && u.password === data.password  // uncomment if storing password
//     );

//     if (!matchedUser) {
//       setError("Invalid email or password.");
//       return;
//     }

//     // Dispatch login success
//     dispatch(loginSuccess(matchedUser));

//     // Redirect based on role
//     if (matchedUser.role === "farmer") {
//       router.push("/farmer/dashboard");
//     } else if (matchedUser.role === "buyer") {
//       router.push("/");
//     } else {
//       router.push("/");
//     }

//     // Your API call block remains exactly as you wrote it:
//     /*
//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: data.email, password: data.password }),
//       });

//       if (response.ok) {
//         router.push("/");
//       } else {
//         setError("Invalid email or password.");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       setError("An error occurred. Please try again.");
//     }
//     */
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center justify-start">
//       <Image
//         src="/images/background.jpg"
//         alt="farmMart"
//         width={1000}
//         height={400}
//         className="w-full h-64 object-cover mb-4"
//       />

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex flex-col gap-4 px-8 py-8 w-full max-w-xl mx-auto"
//       >
//         <h2 className="text-2xl font-semibold mb-2">
//           Log into <span className="text-orange-600 font-bold">farmMart</span>
//         </h2>
//         <p className="text-gray-600 mb-4">Get Started Now</p>

//         {/*Email Field */}
//         <label className="text-sm font-medium">Email</label>
//         <input
//           type="email"
//           className="border rounded px-3 py-2"
//           {...register("email", {
//             required: "Email is required",
//             pattern: {
//               value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//               message: "Enter a valid email",
//             },
//           })}
//         />
//         {errors.email && (
//           <p className="text-red-500 text-sm">{errors.email.message}</p>
//         )}

//         {/* Password Field */}
//         <label className="text-sm font-medium">Password</label>
//         <input
//           type="password"
//           className="border rounded px-3 py-2"
//           {...register("password", {
//             required: "Password is required",
//             minLength: {
//               value: 6,
//               message: "Password must be at least 6 characters",
//             },
//           })}
//         />
//         {errors.password && (
//           <p className="text-red-500 text-sm">{errors.password.message}</p>
//         )}

//         {/* General Error */}
//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         <div className="flex justify-between text-xs text-gray-500 mb-2">
//           <button type="button" className="hover:underline">
//             Forgotten Password? Reset Password
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="bg-orange-600 text-white rounded py-2 font-semibold hover:bg-orange-700 transition mt-2"
//         >
//           Login
//         </button>

//         <div className="text-center text-sm mt-2">
//           don&apos;t have an account?{" "}
//           <Link href="/signup" className="text-orange-600 hover:underline">
//             Sign up
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// }

