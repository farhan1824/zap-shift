import React, { use } from 'react'
import { AuthCotext } from '../Context/Authentication/AuthCotext'

const UseAuth = () => {
    const authinfo = use(AuthCotext)
    return authinfo
}

export default UseAuth