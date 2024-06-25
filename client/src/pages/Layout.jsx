import Header from "./Header";
import {Outlet} from "react-router-dom"

function Layout() {
    return(
        <div className="px-4 py-8 flex flex-col min-h-screen">
            <Header />
            <Outlet />
        </div>
    )
}
export default Layout;