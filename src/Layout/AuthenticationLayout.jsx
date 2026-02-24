import React from "react";
import { Outlet } from "react-router";
import Logo from "../Components/Logo/Logo";
import autheticationpic from "../assets/authImage.png";

const AuthenticationLayout = () => {
    return (
        <div className="relative min-h-screen text-black">
            {/* RIGHT SIDE BACKGROUND */}
            <div className="hidden lg:block absolute top-0 right-0 h-full w-1/2 bg-[#F6FAE8] z-0" />

            <div className="relative z-10 min-h-screen">
                {/* LOGO — untouched */}
                <Logo />

                {/* CONTENT — centered vertically */}
                <div className="flex min-h-[calc(100vh-80px)] items-center">
                    {/* LEFT SIDE */}
                    <div className="w-full lg:w-1/2 flex flex-col px-10 py-8">
                        <div className="flex flex-col justify-center grow max-w-md">
                            <Outlet />
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="hidden lg:flex w-1/2 items-center justify-center">
                        <img
                            src={autheticationpic}
                            alt="Authentication Illustration"
                            className="w-3/4 max-w-md"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthenticationLayout;