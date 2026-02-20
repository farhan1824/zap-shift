import React from 'react'
import logo from "../../assets/logo.png"
const Logo = () => {
    return (
        <div className='flex items-end'>
            <img src={logo} alt="" />
            <p className='text-2xl font-bold mt-5 -ml-2'>ZapShift</p>
        </div>
    )
}

export default Logo