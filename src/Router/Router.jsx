
import { createBrowserRouter } from "react-router";
import { RootLayout } from "../Layout/RootLayout";
import Home from "../Layout/Home/Home";
import AuthenticationLayout from "../Layout/AuthenticationLayout";
import Signin from "../Layout/Sigin/Signin";
import Register from "../Layout/Sigin/Register";
import Rider from "../Layout/Rider/Rider";
import { Pricing } from "../Layout/Pricing/Pricing";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                path: "/",
                Component: Home
            },
            {
                path: "/rider",
                Component: Rider
            },
            {
                path: "/price",
                Component: Pricing
            }
        ]
    },
    {
        path: "/",
        Component: AuthenticationLayout,
        children: [
            {
                path: "/signin",
                Component: Signin,
            },
            {
                path: "/register",
                Component: Register,
            }
        ]
    },
]);
