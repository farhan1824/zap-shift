import React from 'react'
import { NavLink } from 'react-router'
import Logo from '../../Components/Logo/Logo'

const Header = () => {
    const navsubmenu = <>
        <li>
        <NavLink
                to="/services"
                className={({ isActive }) =>
                    isActive
                        ? "btn btn-outline px-4 py-2 rounded-full border-gray-500 bg-[#CAEB66] text-black"
                        : "text-white"
                }
            >
                Services
            </NavLink>
        
        </li>
        <li>
        <NavLink
                to="/coverage"
                className={({ isActive }) =>
                    isActive
                        ? "btn btn-outline px-4 py-2 rounded-full border-gray-500 bg-[#CAEB66] text-black"
                        : "text-white"
                }
            >
                Coverage
            </NavLink>
        
        </li>
        <li>
        <NavLink
                to="/about-us"
                className={({ isActive }) =>
                    isActive
                        ? "btn btn-outline px-4 py-2 rounded-full border-gray-500 bg-[#CAEB66] text-black"
                        : "text-white"
                }
            >
                About Us
            </NavLink>
        
        </li>
        <li>
        <NavLink
                to="/price"
                className={({ isActive }) =>
                    isActive
                        ? "btn btn-outline px-4 py-2 rounded-full border-gray-500 bg-[#CAEB66] text-black"
                        : "text-white"
                }
            >
                Pricing
            </NavLink>
        
        </li>
        <li>
            <NavLink
                to="/rider"
                className={({ isActive }) =>
                    isActive
                        ? "btn btn-outline px-4 py-2 rounded-full border-gray-500 bg-[#CAEB66] text-black"
                        : "text-white"
                }
            >
                Be a Rider
            </NavLink>
        </li>
    </>
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                navsubmenu}

                        </ul>
                    </div>
                    <Logo></Logo>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navsubmenu}

                    </ul>
                </div>
                <div className="navbar-end gap-4">
                    <NavLink to="/signin"
                        className="btn btn-outline px-8 py-4 rounded-full border-gray-500 text-white hover:text-black hover:bg-[#CAEB66] "
                    >
                        Sign in
                    </NavLink>
                    <NavLink to="/rider"
                        className="btn bg-[#CAEB66] px-8 py-4 rounded-full text-black"
                    >
                        Be a Rider
                    </NavLink>

                </div>
            </div>
        </div>
    )
}

export default Header