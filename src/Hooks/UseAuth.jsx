import { useContext } from 'react'
import { AuthCotext } from '../Context/Authentication/AuthCotext'

const UseAuth = () => {
    const authinfo = useContext(AuthCotext)
    return authinfo
}

export default UseAuth