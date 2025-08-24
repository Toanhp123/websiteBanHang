import clsx from "clsx";
import { useState } from "react";
import type { ListAccountOptions } from "../types/accounts.type";
import UpdatePersonalInfo from "./UpdatePersonalInfo";
import UpdateMyOrder from "./UpdateMyOrder";

function AccountOptions() {
    const [select, setSelect] = useState<number>(0);
    const listOptions: ListAccountOptions[] = [
        { title: "Personal Information", feature: <UpdatePersonalInfo /> },
        { title: "My Order", feature: <UpdateMyOrder /> },
        { title: "Manage Address", feature: <UpdatePersonalInfo /> },
        { title: "Payments Method", feature: <UpdatePersonalInfo /> },
        { title: "Password Manager", feature: <UpdatePersonalInfo /> },
        { title: "Logout", feature: <UpdatePersonalInfo /> },
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
