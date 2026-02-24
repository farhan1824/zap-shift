import React from 'react'
import logo from "../../assets/logo.png"
import { NavLink } from 'react-router'
const Logo = () => {
    return (
        <NavLink to="/" className='flex items-end'>
            <img src={logo} alt="" />
            <p className='text-2xl font-bold mt-5 -ml-2'>ZapShift</p>
        </NavLink>
    )
}

export default Logo