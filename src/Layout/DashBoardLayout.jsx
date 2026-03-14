import React from 'react'
import { Outlet } from 'react-router'
import { NavLink } from 'react-router'
import Logo from '../Components/Logo/Logo'

export const DashBoardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* MAIN CONTENT */}
            <div className="drawer-content flex flex-col">

                {/* Navbar (mobile only button) */}
                <div className="navbar bg-base-300 w-full">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </label>
                    </div>

                    <div className="flex items-center justify-evenly gap-3">
                        <Logo />

                    </div>
                </div>

                {/* PAGE CONTENT */}
                <div className="p-6">
                    <Outlet></Outlet>
                </div>

            </div>

            {/* SIDEBAR */}
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                    <li><NavLink to="parcels">My Parcels</NavLink></li>
                    <li><NavLink to="payment-history">Payment History</NavLink></li>
                    <li><a>Settings</a></li>
                </ul>
            </div>
        </div >
    )
}
