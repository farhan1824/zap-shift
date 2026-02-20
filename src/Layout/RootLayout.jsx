import { Outlet } from "react-router"
import Header from "./Shared/Header"
import Footer from "./Shared/Footer"

export const RootLayout = () => {
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    )

}
