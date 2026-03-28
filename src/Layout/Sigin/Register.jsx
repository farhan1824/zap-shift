import React, { use, useState } from 'react'
import { useForm } from "react-hook-form";
import UseAuth from '../../Hooks/UseAuth';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';
import SigninwithGoogle from './SigninwithGoogle';
import { AuthCotext } from '../../Context/Authentication/AuthCotext';
import axios from 'axios';
const Register = () => {
    const [image, setImage] = useState("")
    const { createUser, updateUserProfile } = use(AuthCotext)
    const nav = useNavigate()
    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(URL.createObjectURL(file))
        }
        const formdata = new FormData();
        formdata.append("image", file);
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_uploader_key}`, formdata)
        setImage(res.data.data.url);
        // console.log(res.data.data.url);
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const handelregister = (data) => {
        createUser(data.email, data.password)
            .then(async (result) => {
                // sending user info to mongo
                const userinfo = {
                    email: data.email,
                    role: "user",
                    created_at: new Date().toISOString(),
                    last_login: new Date().toISOString(),
                }
                const userRes = await axios.post(`http://localhost:5000/users`, userinfo);
                console.log(userRes.data);
                // sending user info to firebase
                const userProfile = {
                    displayName: data.name,
                    photoURL: image
                }

                await updateUserProfile(userProfile)

                Swal.fire({
                    title: "Register Successfully",
                    icon: "success"
                });

                nav("/")
                reset()
            })
            .catch((error) => {
                alert("❌ Signup failed: " + error.message);
            });
    };
    return (
        <div className="w-full max-w-md text-black">
            <form className="w-full" onSubmit={handleSubmit(handelregister)}>

                {/* Profile Image Upload */}
                <div className="flex mb-6">
                    <label className="relative cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />

                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300">
                            {image ? (
                                <img
                                    src={image}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-10 h-10 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            )}
                        </div>

                        {/* Upload icon overlay */}
                        <div className="absolute bottom-0 right-0 bg-[#CAEB66] p-2 rounded-full border border-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 text-black"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 16.5v2A2.5 2.5 0 007.5 21h9a2.5 2.5 0 004.5-2.5v-2M16 8l-4-4m0 0L8 8m4-4v12"
                                />
                            </svg>
                        </div>
                    </label>
                </div>

                {/* FORM TITLE */}
                <h2 className="text-5xl font-bold mb-1.5">
                    Create an Account
                </h2>
                <p className='text-base mb-8'>Register with ZapShift</p>

                {/* Email */}
                <div className="relative mb-6">
                    <input
                        type="name"
                        id="name"
                        placeholder=" "
                        {...register("name", { required: true })}
                        className="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2
                       focus:outline-none focus:border-black bg-[#EAECED]"
                    />
                    {
                        errors.name?.type === "required" && <p className="text-red-700"> Please Enter Your name </p>
                    }
                    <label
                        htmlFor="name"
                        className="absolute left-3 px-1 text-gray-500 transition-all
                       top-3 text-sm
                       peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black
                       peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
                       peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs
                       bg-[#EAECED]"
                    >
                        Name
                    </label>
                </div>

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

                <button
                    type="submit"
                    className="w-full bg-[#CAEB66] text-black py-3 rounded-md hover:bg-[#94bb1e] transition"
                >
                    Register
                </button>
                {/* Login */}
                <p className="text-sm mt-6 text-gray-600">
                    Already Have An Account?{" "}
                    <Link to="/signin" className="text-black font-medium hover:underline">
                        login
                    </Link>
                </p>
            </form>
            <SigninwithGoogle></SigninwithGoogle>
        </div>
    )
}

export default Register