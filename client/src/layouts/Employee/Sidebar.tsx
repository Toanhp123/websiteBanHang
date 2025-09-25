import { useState } from "react";
import { Button, ButtonSidebarDashboard } from "@/components/shared";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const [closeSidebar, setCloseSidebar] = useState<boolean>(false);
    const [menuState, setMenuState] = useState<Record<string, boolean>>({
        product: true,
        warehouse: true,
        employee: true,
        discount: true,
    });

    const navigate = useNavigate();

    const handleNavigate = (location: string) => {
        navigate(`/dashboard/${location}`);
    };

    const handleCloseSidebar = () => {
        setCloseSidebar((prev) => !prev);
    };

    const toggleMenu = (menu: string) => {
        setMenuState((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));
    };

    const listOptionInProduct = [
        {
            text: "Danh sách sản phẩm",
            func: () => handleNavigate("productList"),
        },
        {
            text: "Thêm sản phẩm",
            func: () => handleNavigate("addProduct"),
        },
    ];

    const listOptionInWarehouse = [
        {
            text: "Giao dịch kho",
            func: () => handleNavigate("warehouseTransactions"),
        },
        {
            text: "Danh sách kho",
            func: () => handleNavigate("warehouseList"),
        },
        {
            text: "Danh sách nhà cung cấp",
            func: () => handleNavigate("supplierList"),
        },
        {
            text: "Quản lý kho",
            func: () => handleNavigate("warehouseManagement"),
        },
    ];

    const listOptionInEmployee = [
        {
            text: "Danh sách nhân viên",
            func: () => handleNavigate("employeeList"),
        },
        {
            text: "Thêm nhân viên",
            func: () => handleNavigate("employeeAdd"),
        },
    ];

    const listOptionInDiscount = [
        {
            text: "Danh sách khuyến mãi",
            func: () => handleNavigate("discountList"),
        },
        {
            text: "Thêm khuyến mãi",
            func: () => handleNavigate("discountAdd"),
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
                    text="Bảng điều khiển"
                    onClick={() => handleNavigate("")}
                />
                <ButtonSidebarDashboard
                    closeSidebar={closeSidebar}
                    icon="fa-solid fa-cart-shopping"
                    text="Đơn hàng"
                    onClick={() => handleNavigate("orders")}
                />
                <ButtonSidebarDashboard
                    closeSidebar={closeSidebar}
                    icon="fa-solid fa-bag-shopping"
                    text="Sản phẩm"
                    menu={true}
                    closeMenu={menuState.product}
                    listOption={listOptionInProduct}
                    onClick={() => toggleMenu("product")}
                />
                <ButtonSidebarDashboard
                    closeSidebar={closeSidebar}
                    icon="fa-solid fa-warehouse"
                    text="Kho"
                    menu={true}
                    closeMenu={menuState.warehouse}
                    listOption={listOptionInWarehouse}
                    onClick={() => toggleMenu("warehouse")}
                />
                <ButtonSidebarDashboard
                    closeSidebar={closeSidebar}
                    icon="fa-solid fa-tags"
                    text="Khuyến mãi"
                    menu={true}
                    closeMenu={menuState.discount}
                    listOption={listOptionInDiscount}
                    onClick={() => toggleMenu("discount")}
                />
            </div>
            <div className="w-full border-b border-gray-300"></div>

            <div className="space-y-4 px-4 py-6 font-semibold">
                <ButtonSidebarDashboard
                    closeSidebar={closeSidebar}
                    icon="fa-solid fa-user"
                    text="Khách hàng"
                    onClick={() => handleNavigate("customer")}
                />
                <ButtonSidebarDashboard
                    closeSidebar={closeSidebar}
                    icon="fa-solid fa-user"
                    text="Nhân viên"
                    menu={true}
                    closeMenu={menuState.employee}
                    listOption={listOptionInEmployee}
                    onClick={() => toggleMenu("employee")}
                />
            </div>
        </div>
    );
}

export default Sidebar;
