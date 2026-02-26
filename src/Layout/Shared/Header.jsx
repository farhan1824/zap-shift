import React, { use } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../Components/Logo/Logo'
import { AuthCotext } from '../../Context/Authentication/AuthCotext'

const Header = () => {
    const { user, logout } = use(AuthCotext)
    console.log(user);
    const navsubmenu = (
        <>
            {[
                { to: "/services", label: "Services" },
                { to: "/coverage", label: "Coverage" },
                { to: "/about-us", label: "About Us" },
                { to: "/price", label: "Pricing" },
                { to: "/rider", label: "Be a Rider" },
            ].map(({ to, label }) => (
                <li key={to}>
                    <NavLink
                        to={to}
                        className={({ isActive }) =>
                            isActive
                                ? "btn btn-outline px-4 py-2 rounded-full border-gray-500 bg-[#CAEB66] text-black"
                                : "text-white"
                        }
                    >
                        {label}
                    </NavLink>
                </li>
            ))}
        </>
    )

    return (
        <div className="navbar bg-base-100 shadow-sm">
            {/* LEFT */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-10"
                    >
                        {navsubmenu}
                    </ul>
                </div>
                <Logo />
            </div>

            {/* CENTER */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navsubmenu}
                </ul>
            </div>

            {/* RIGHT */}
            <div className="navbar-end gap-4">
                {
                    user ? <a onClick={() => logout()}
                        to="/signin"
                        className="btn btn-outline px-8 py-4 rounded-full border-gray-500 text-white hover:text-black hover:bg-[#CAEB66]"
                    >
                        Logout
                    </a> : <NavLink
                        to="/signin"
                        className="btn btn-outline px-8 py-4 rounded-full border-gray-500 text-white hover:text-black hover:bg-[#CAEB66]"
                    >
                        Sign in
                    </NavLink>
                }

                <NavLink
                    to="/rider"
                    className="btn bg-[#CAEB66] px-8 py-4 rounded-full text-black"
                >
                    Be a Rider
                </NavLink>

                {/* Avatar Dropdown */}
                {/* <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">

                            <img
                                alt="User avatar"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            />

                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-10"
                    >
                        <li>
                            <a className="justify-between">
                                Profile

                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        {
                            user ? <li><a onClick={() => logout()}>Logout</a></li> : <></>


                        }
                    </ul>
                </div> */}
            </div>
        </div>
    )
}

export default Header