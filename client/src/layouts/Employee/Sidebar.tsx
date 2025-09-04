import { Button, ButtonSidebarDashboard } from "@/components/shared";
import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const [closeSidebar, setCloseSidebar] = useState<boolean>(false);
    const [closeMenuInSidebar, setCloseMenuInSidebar] = useState<boolean>(true);

    const navigate = useNavigate();

    const handleNavigate = (location: string) => {
        navigate(`/dashboard/${location}`);
    };

    const handleCloseSidebar = () => {
        setCloseSidebar((prev) => !prev);
    };

    const listOptionInProduct = [
        {
            text: "Product List",
            func: () => handleNavigate("productList"),
        },
        {
            text: "Add Product",
            func: () => handleNavigate("addProduct"),
        },
    ];

    return (
        <div
            className={clsx(
                "h-screen border-r border-gray-300",
                !closeSidebar && "w-70",
            )}
        >
            <div
                className={clsx("flex items-center justify-between px-6 py-4")}
            >
                {!closeSidebar && <h1>Logo</h1>}
                <div>
                    <Button
                        icon="fa-solid fa-bars"
                        textColor="text-gray-500"
                        onClick={handleCloseSidebar}
                        border=""
                        bgColor=""
                        hoverColor=""
                        textColorHover=""
                    />
                </div>
            </div>
            <div className="w-full border-b border-gray-300"></div>

            <div className="space-y-4 px-4 py-6 font-semibold">
                <ButtonSidebarDashboard
                    closeSidebar={closeSidebar}
                    icon="fa-solid fa-house"
                    text="Dashboard"
                    onClick={() => handleNavigate("")}
                />
                <ButtonSidebarDashboard
                    closeSidebar={closeSidebar}
                    icon="fa-solid fa-cart-shopping"
                    text="Orders"
                    onClick={() => handleNavigate("orders")}
                />
                <ButtonSidebarDashboard
                    closeSidebar={closeSidebar}
                    icon="fa-solid fa-bag-shopping"
                    text="Product"
                    menu={true}
                    closeMenu={closeMenuInSidebar}
                    listOption={listOptionInProduct}
                    onClick={() => setCloseMenuInSidebar((prev) => !prev)}
                />
                <ButtonSidebarDashboard
                    closeSidebar={closeSidebar}
                    icon="fa-solid fa-tag"
                    text="Promotion"
                    onClick={() => handleNavigate("promotion")}
                />
            </div>
            <div className="w-full border-b border-gray-300"></div>

            <div className="space-y-4 px-4 py-6 font-semibold">
                <ButtonSidebarDashboard
                    closeSidebar={closeSidebar}
                    icon="fa-solid fa-user"
                    text="Customer"
                    onClick={() => handleNavigate("customer")}
                />
                <ButtonSidebarDashboard
                    closeSidebar={closeSidebar}
                    icon="fa-solid fa-user"
                    text="Employee"
                    onClick={() => handleNavigate("employee")}
                />
            </div>
        </div>
    );
}

export default Sidebar;
