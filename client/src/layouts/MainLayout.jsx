import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlobalLoader from "../components/GlobalLoader";
const MainLayout=()=>{
    return (
        <>
        <nav>
            <Navbar/>
        </nav>
        <main>
            {/* saare child pages yaha par render honge */}
            <GlobalLoader>
                <Outlet/>
            </GlobalLoader>
        </main>
        <footer>
            <Footer/>
        </footer>   
        </>
    )
}
export default MainLayout;