
import { createBrowserRouter } from "react-router";
import { RootLayout } from "../Layout/RootLayout";
import Home from "../Layout/Home/Home";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                path: "/",
                Component: Home
            }
        ]
    },
]);
