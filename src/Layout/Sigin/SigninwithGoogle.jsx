import React from 'react'
import UseAuth from '../../Hooks/UseAuth'

function SigninwithGoogle() {
    const { signinwithGoogle } = UseAuth()
    const handelsignin = () => {
        signinwithGoogle()
            .then((result) => {
                console.log(result);
            })
            .then((error) => {
                console.log(error);
            })
    }
    return (
        <>
            {/* Divider */}
            <div className="flex items-center my-8">
                <div className="grow h-px bg-gray-300" />
                <span className="px-4 text-sm text-gray-500">OR</span>
                <div className="grow h-px bg-gray-300" />
            </div>

            {/* Google Login */}
            <button onClick={handelsignin} className="w-full border bg-white border-gray-300 py-3 rounded-md
                         flex items-center justify-center gap-2
                         hover:bg-gray-50 transition">
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                />
                Login with Google
            </button>
        </>

    )
}

export default SigninwithGoogle