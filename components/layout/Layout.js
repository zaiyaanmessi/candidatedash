import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import Breadcrumb from './Breadcrumb'
import BurgerIcon from './BurgerIcon'
import Footer from './Footer'
import Header from './Header'
import MobileMenu from './MobileMenu'
import PageHead from './PageHead'
import Sidebar from './Sidebar'
import EmpSidebar from "./Empsidebar"

export default function Layout({ headTitle, breadcrumbTitle, breadcrumbActive, children, hideSidebar = false }) {
    const router = useRouter();
    const [isToggled, setToggled] = useState(false);

    const handleToggle = () => {
        setToggled(!isToggled)
        !isToggled 
            ? document.body.classList.add("mobile-menu-active") 
            : document.body.classList.remove("mobile-menu-active");
    };

    return (
        <>
            <PageHead headTitle={headTitle} />
            <div className="body-overlay-1" onClick={handleToggle} />
            <Header />
            <BurgerIcon handleToggle={handleToggle} isToggled={isToggled} />
            <MobileMenu handleToggle={handleToggle} isToggled={isToggled} />
            <main className="main">
                {/* Conditionally render sidebar based on current route */}
                {!hideSidebar && (router.pathname === '/EmpDashboar' ? <EmpSidebar /> : <Sidebar />)}
                <div className={`box-content ${hideSidebar ? 'full-width' : ''}`}>
                    {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} breadcrumbActive={breadcrumbActive} />}
                    <div className="row">
                        {children}
                    </div>
                    <Footer />
                </div>
            </main>
        </>
    )
}