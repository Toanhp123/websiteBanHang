import { useState } from "react";
import SideBar from "./SideBar";
import { Button, NavItem } from "@/components/shared";
import SearchBar from "@/features/search/components/SearchBar";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { useNavigate } from "react-router-dom";

function Header() {
    const [sideBar, setSideBar] = useState<boolean>(false);
    const width = useWindowWidth();
    const navigate = useNavigate();

    const handleClick = (location: string): void => {
        navigate("/" + location);
    };

    const handleGetListCategory = () => {
        console.log(1);
    };

    return (
        <header>
            <nav className="bg-primary flex h-16 justify-center gap-4 py-4 lg:h-36">
                {/* Sidebar */}
                {sideBar && <SideBar />}

                {/* Navbar */}
                <div className="flex h-full w-full max-w-7/8 lg:flex-col">
                    {/* Hàng 1 */}
                    <div className="flex flex-1 items-center justify-between px-8">
                        <h1 className="text-xl font-semibold text-white lg:flex-1/4">
                            LOGO
                        </h1>

                        {width < 1024 && (
                            <div
                                className="text-xl font-semibold text-white"
                                onClick={() =>
                                    setSideBar((sideBar) => !sideBar)
                                }
                            >
                                <i className="fa-solid fa-bars"></i>
                            </div>
                        )}

                        {width >= 1024 && (
                            <div className="flex h-full w-full justify-between">
                                <SearchBar />

                                <div className="flex gap-4">
                                    <Button
                                        border=""
                                        hoverColor=""
                                        icon="fa-solid fa-heart"
                                    />
                                    <Button
                                        border=""
                                        hoverColor=""
                                        icon="fa-solid fa-bag-shopping"
                                        onClick={() => handleClick("cartShop")}
                                    />
                                    <Button
                                        border=""
                                        hoverColor=""
                                        icon="fa-solid fa-user"
                                        onClick={() => handleClick("myAccount")}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Hàng 2 cho màn hình lớn */}
                    {width >= 1024 && (
                        <div className="flex flex-1 justify-between">
                            <div className="flex flex-3/4 items-center justify-between px-8">
                                <button
                                    className="bg-surface flex items-center justify-center gap-3 rounded-xl px-4 py-2 font-bold"
                                    onClick={handleGetListCategory}
                                >
                                    <i className="fa-solid fa-bars"></i>
                                    <h1>Browse All Categories</h1>
                                </button>

                                <NavItem text="Home" to="#" />
                                <NavItem text="Shop" to="shop" />
                                <NavItem text="About Us" to="aboutUs" />
                                <NavItem text="Blog" to="blog" />
                            </div>

                            <div className="text-surface flex flex-1/4 items-center justify-end gap-2 pr-12">
                                <p>Recently Viewed</p>
                                <i className="fa-solid fa-caret-down"></i>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
