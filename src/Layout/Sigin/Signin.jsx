import React from "react";
import { useForm } from "react-hook-form";

const Signin = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const handellogin = (data) => {
        console.log(data);
        // optional: clear form after submit
        // reset();
    };

    return (
        <div className="w-full max-w-md text-black">
            {/* FORM */}
            <form className="w-full" onSubmit={handleSubmit(handellogin)}>
                <h2 className="text-5xl font-bold mb-8">Welcome Back</h2>

                {/* Email */}
                <div className="relative mb-6">
                    <input
                        type="email"
                        id="email"
                        placeholder=" "
                        {...register("email", { required: true })}
                        className="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2
                       focus:outline-none focus:border-black bg-[#EAECED]"
                    />
                    {
                        errors.email?.type === "required" && <p className="text-red-700"> Please Enter Your Email </p>
                    }
                    <label
                        htmlFor="email"
                        className="absolute left-3 px-1 text-gray-500 transition-all
                       top-3 text-sm
                       peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black
                       peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
                       peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs
                       bg-[#EAECED]"
                    >
                        Email
                    </label>
                </div>

                {/* Password */}
                <div className="relative mb-4">
                    <input
                        type="password"
                        id="password"
                        placeholder=" "
                        {...register("password", { required: true, minLength: 6 })}
                        className="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2
                       focus:outline-none focus:border-black bg-[#EAECED]"

                    />
                    {
                        errors.password?.type === "required" && <p className="text-red-700"> Password Is Required </p>
                    }
                    {
                        errors.password?.type === "minLength" && <p className="text-red-700"> Password Must be 6 Character or Longer </p>
                    }
                    <label
                        htmlFor="password"
                        className="absolute left-3 px-1 text-gray-500 transition-all
                       top-3 text-sm
                       peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black
                       peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
                       peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs
                       bg-[#EAECED]"
                    >
                        Password
                    </label>
                </div>

                {/* Forgot password */}
                <div className="mb-6">
                    <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-black underline"
                    >
                        Forgot password?
                    </a>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full bg-[#CAEB66] text-black py-3 rounded-md
                     hover:bg-[#94bb1e] transition"
                >
                    Login
                </button>

                {/* Register */}
                <p className="text-sm mt-6 text-gray-600">
                    Don’t have an account?{" "}
                    <a href="register" className="text-black font-medium hover:underline">
                        Register
                    </a>
                </p>
            </form>

            {/* Divider */}
            <div className="flex items-center my-8">
                <div className="grow h-px bg-gray-300" />
                <span className="px-4 text-sm text-gray-500">OR</span>
                <div className="grow h-px bg-gray-300" />
            </div>

            {/* Google Login */}
            <button className="w-full border bg-white border-gray-300 py-3 rounded-md
                         flex items-center justify-center gap-2
                         hover:bg-gray-50 transition">
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                />
                Login with Google
            </button>
        </div>
    );
};

export default Signin;