import {
    UpdatePassword,
    UpdatePersonalInfo,
} from "@/features/accounts/components";
import { Logout } from "@/features/auth/components";
import { DiscountListForCustomer } from "@/features/discount/components";
import {
    ListInvoice,
    UpdateAddressShipping,
} from "@/features/invoice/components";
import clsx from "clsx";
import { useState } from "react";
import type { ReactNode } from "react";

type ListAccountOptions = {
    title: string;
    feature: ReactNode;
};

function AccountOptions() {
    const [select, setSelect] = useState<number>(0);
    const listOptions: ListAccountOptions[] = [
        {
            title: "Thay đổi thông tin cá nhân",
            feature: <UpdatePersonalInfo />,
        },
        { title: "Đơn hàng của tôi", feature: <ListInvoice /> },
        { title: "Quản lý địa chỉ", feature: <UpdateAddressShipping /> },
        { title: "Ưu đãi ", feature: <DiscountListForCustomer /> },
        { title: "Đổi mật khẩu", feature: <UpdatePassword /> },
        { title: "Đăng xuất", feature: <Logout /> },
    ];

    const handleSetSelect = (index: number): void => {
        if (select === index) return;

        setSelect(index);
    };

    return (
        <div className="flex gap-8">
            <div className="flex-1 space-y-4">
                {listOptions.map((option, index) => (
                    <div
                        key={index}
                        className={clsx(
                            "rounded-xl border px-6 py-3",
                            select === index
                                ? "bg-surface border-surface"
                                : "border-gray-300",
                        )}
                        onClick={() => handleSetSelect(index)}
                    >
                        <p className="text-xl font-semibold">{option.title}</p>
                    </div>
                ))}
            </div>

            <div className="flex-2">{listOptions[select].feature}</div>
        </div>
    );
}

export default AccountOptions;
