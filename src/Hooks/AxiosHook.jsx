import axios from 'axios'
import { use } from 'react'
import { AuthCotext } from '../Context/Authentication/AuthCotext'
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
})
export const AxiosHook = () => {
    const { user } = use(AuthCotext)
    // console.log(user.accessToken);
    axiosSecure.interceptors.request.use((config) => {
        if (user?.accessToken) {
            config.headers.authorization = `Bearer ${user.accessToken}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error)
    })
    return axiosSecure
}
