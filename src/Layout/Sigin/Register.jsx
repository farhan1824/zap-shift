import React, { useState } from 'react'

const Register = () => {
    const [image, setImage] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(URL.createObjectURL(file))
        }
    }

    return (
        <div className="w-full max-w-md text-black">
            <form className="w-full">
                
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

                {/* Name */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        id="name"
                        required
                        className="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 focus:outline-none focus:border-black"
                    />
                    <label
                        htmlFor="name"
                        className="absolute left-3 top-3 text-gray-500 text-sm transition-all
                        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black
                        peer-valid:-top-2 peer-valid:text-xs
                        bg-[#EAECED] px-1"
                    >
                        Name
                    </label>
                </div>

                {/* Email */}
                <div className="relative mb-6">
                    <input
                        type="email"
                        id="email"
                        required
                        className="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 focus:outline-none focus:border-black"
                    />
                    <label
                        htmlFor="email"
                        className="absolute left-3 top-3 text-gray-500 text-sm transition-all
                        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black
                        peer-valid:-top-2 peer-valid:text-xs
                        bg-[#EAECED] px-1"
                    >
                        Email
                    </label>
                </div>

                {/* Password */}
                <div className="relative mb-4">
                    <input
                        type="password"
                        id="password"
                        required
                        className="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 focus:outline-none focus:border-black"
                    />
                    <label
                        htmlFor="password"
                        className="absolute left-3 top-3 text-gray-500 text-sm transition-all
                        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black
                        peer-valid:-top-2 peer-valid:text-xs
                        bg-[#EAECED] px-1"
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

            </form>
        </div>
    )
}

export default Register