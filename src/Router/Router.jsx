
import { createBrowserRouter } from "react-router";
import { RootLayout } from "../Layout/RootLayout";
import Home from "../Layout/Home/Home";
import AuthenticationLayout from "../Layout/AuthenticationLayout";
import Signin from "../Layout/Sigin/Signin";
import Register from "../Layout/Sigin/Register";
import Rider from "../Layout/Rider/Rider";
import { Pricing } from "../Layout/Pricing/Pricing";
import AboutUs from "../Layout/AboutUs/AboutUs";
import { Coverage } from "../Layout/Coverage/Coverage";
import ParcelOrder from "../Layout/ParcelOrder/ParcelOrder";
import { DashBoardLayout } from "../Layout/DashBoardLayout";
import MyParcels from "../Layout/Dashboard/MyParcels/MyParcels";
import { PrivateRoutes } from "../Components/Private/PrivateRoutes";
import ProductPayment from "../Layout/Dashboard/Payment/ProductPayment";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                path: "/",
                Component: Home,
                loader: async () => {
                    const [customerRes, cardListRes, servicesres] = await Promise.all([
                        fetch("/CustomerReview.json"),
                        fetch("/data.json"),
                        fetch("/services.json")
                    ]);

                    const customerservice = await customerRes.json();
                    const cardlistdata = await cardListRes.json();
                    const services = await servicesres.json();

                    return { customerservice, cardlistdata, services };
                }
            },
            {
                path: "/rider",
                Component: Rider
            },
            {
                path: "/coverage",
                Component: Coverage,
                loader: () => fetch("./warehouses.json")
            },
            {
                path: "/price",
                Component: Pricing

            },
            {
                path: "/parcel-order",
                element: <PrivateRoutes>
                    <ParcelOrder></ParcelOrder>
                </PrivateRoutes>,

                // Component: ParcelOrder,
                loader: () => fetch("./warehouses.json")
            }
            ,
            {
                path: "/about-us",
                Component: AboutUs
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
    {
        path: "/dashboard",
        element: <PrivateRoutes>
            <DashBoardLayout></DashBoardLayout>
        </PrivateRoutes>,
        // Component: DashBoardLayout,
        children: [
            {
                path: "parcels",
                Component: MyParcels,
            },
            {
                path: "payment/:ProductId",
                Component: ProductPayment,
            }
        ]
    },
]);
