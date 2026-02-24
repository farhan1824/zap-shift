import React from 'react'
import { NavLink } from 'react-router'
import Logo from '../../Components/Logo/Logo'

const Header = () => {
    const navsubmenu = <>
        <li> <NavLink>Submenu 1</NavLink></li>
        <li> <NavLink>Submenu 2</NavLink></li>
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
                            <li><a>Services</a></li>
                            <li><a>Coverage</a></li>
                            <li><a>About Us</a></li>
                            <li><a>Pricing</a></li>
                            <li><a>Be a Rider</a></li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    {
                                        navsubmenu
                                    }
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div>
                    <Logo></Logo>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Services</a></li>
                        <li><a>Coverage</a></li>
                        <li><a>About Us</a></li>
                        <li><a>Pricing</a></li>
                        <li><a>Be a Rider</a></li>
                        <li>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2 bg-base-100 w-40 z-1">
                                    {/* <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li> */}
                                    {
                                        navsubmenu
                                    }
                                </ul>
                            </details>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <NavLink to="/signin"
                        className="btn btn-outline px-8 py-4 rounded-full border-gray-500 text-white hover:text-black hover:bg-[#CAEB66] "
                    >
                        Sign in
                    </NavLink>
                    <a className="btn bg-[#CAEB66] px-8 py-4 rounded-full text-black">Be a Rider</a>

                </div>
            </div>
        </div>
    )
}

export default Header