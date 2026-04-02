import React from 'react'
import { Outlet, NavLink } from 'react-router'
import Logo from '../Components/Logo/Logo'
import useUserRole from '../Hooks/UserRoleCheck'

// ICONS
import { HiOutlineHome, HiOutlineCube, HiOutlineClock } from "react-icons/hi"
import { FaUserShield, FaUserCheck, FaUserClock, FaUserCog, FaMotorcycle } from "react-icons/fa"

export const DashBoardLayout = () => {
    const { role, isRoleLoading } = useUserRole()

    return (
        <div className="drawer lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* MAIN CONTENT */}
            <div className="drawer-content flex flex-col">

                {/* Navbar */}
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

                    <div className="flex items-center gap-3">
                        <Logo />
                    </div>
                </div>

                {/* PAGE CONTENT */}
                <div className="p-6">
                    <Outlet />
                </div>
            </div>

            {/* SIDEBAR */}
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                <ul className="menu bg-base-200 min-h-full w-80 p-4 space-y-1">

                    {/* USER ROUTES */}
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `flex items-center gap-3 ${isActive ? "text-[#CAEB66] font-semibold" : ""}`
                            }
                        >
                            <HiOutlineHome className="text-xl" />
                            Dashboard
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="parcels"
                            className={({ isActive }) =>
                                `flex items-center gap-3 ${isActive ? "text-[#CAEB66] font-semibold" : ""}`
                            }
                        >
                            <HiOutlineCube className="text-xl" />
                            My Parcels
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="payment-history"
                            className={({ isActive }) =>
                                `flex items-center gap-3 ${isActive ? "text-[#CAEB66] font-semibold" : ""}`
                            }
                        >
                            <HiOutlineClock className="text-xl" />
                            Payment History
                        </NavLink>
                    </li>

                    {/* ADMIN ROUTES */}
                    {
                        !isRoleLoading && role === "admin" && (
                            <>
                                <div className="divider">Admin Panel</div>

                                <li>
                                    <NavLink
                                        to="assign-rider"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 ${isActive ? "text-[#CAEB66] font-semibold" : ""}`
                                        }
                                    >
                                        <FaUserCog className="text-lg" />
                                        Assign Rider
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="active-riders"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 ${isActive ? "text-[#CAEB66] font-semibold" : ""}`
                                        }
                                    >
                                        <FaUserCheck className="text-lg" />
                                        Active Riders
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="pending-riders"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 ${isActive ? "text-[#CAEB66] font-semibold" : ""}`
                                        }
                                    >
                                        <FaUserClock className="text-lg" />
                                        Pending Riders
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="make-admin"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 ${isActive ? "text-[#CAEB66] font-semibold" : ""}`
                                        }
                                    >
                                        <FaUserShield className="text-lg" />
                                        Make Admin
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="rider-details"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 ${isActive ? "text-[#CAEB66] font-semibold" : ""}`
                                        }
                                    >
                                        <FaMotorcycle className="text-lg" />
                                        Rider Details
                                    </NavLink>
                                </li>
                            </>
                        )
                    }

                </ul>
            </div>
        </div>
    )
}