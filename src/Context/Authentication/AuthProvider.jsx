import { AuthCotext } from './AuthCotext'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'
import { auth } from '../../Firebase/Firebase.init'
import { useEffect, useState } from 'react'

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = async (email, password) => {
        setLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            // console.log(userCredential);
            return userCredential.user
        } catch (error) {
            console.error(error.message)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const signInUser = async (email, password) => {
        setLoading(true)
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            // console.log(userCredential);
            return userCredential.user
        } catch (error) {
            console.error(error.message)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        setLoading(true)
        await signOut(auth)
        setLoading(false)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
            console.log(currentUser);
        })

        return unsubscribe
    }, [])

    const authinfo = {
        user,
        loading,
        createUser,
        signInUser,
        logout
    }

    return (
        <AuthCotext value={authinfo}>
            {children}
        </AuthCotext>
    )
}

export default AuthProvider