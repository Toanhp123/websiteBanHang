import { useEffect, useState } from "react";
import { getAllCustomer, updateAccountStatus } from "../services/account.api";
import type { Customer } from "../types/accounts.type";

function CustomerListTable() {
    const [editMenu, setEditMenu] = useState<number | null>(null);
    const [customerList, setCustomerList] = useState<Customer[]>([]);
    const [reload, setReload] = useState(false);

    const handleGetAllCustomer = async () => {
        try {
            const res = await getAllCustomer();

            if (res) {
                setCustomerList(res);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeAccountStatus = async (
        customer_id: number,
        status: string,
    ) => {
        try {
            const res = await updateAccountStatus(customer_id, status);

            if (res) {
                setReload((prev) => !prev);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenEditMenu = (id: number) => {
        setEditMenu((prev) => (prev === id ? null : id));
    };

    useEffect(() => {
        handleGetAllCustomer();
    }, [reload]);

    return (
        <div
            className="space-y-8 rounded-2xl bg-white px-8 py-6"
            onClick={() => {
                if (editMenu) {
                    setEditMenu(null);
                }
            }}
        >
            <div>
                <p className="font-semibold">
                    We found {customerList.length} customer for you
                </p>

                <div className="mt-4 border-b border-gray-300"></div>
            </div>

            <table className="w-full text-left">
                <thead>
                    <tr>
                        <th className="p-2">ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Phone</th>
                        <th className="p-2">Birth Day</th>
                        <th className="p-2">Type</th>
                        <th className="p-2">Status</th>
                        <th className="p-2 text-right">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {customerList.map((customer) => (
                        <tr
                            key={customer.customer_id}
                            className="even:bg-gray-100"
                        >
                            <td className="p-2">{customer.customer_id}</td>
                            <td className="p-2">
                                {customer.first_name + " " + customer.last_name}
                            </td>
                            <td className="p-2">{customer.email}</td>
                            <td className="p-2">{customer.phone_number}</td>
                            <td className="p-2">
                                {customer.customer_birthday}
                            </td>
                            <td className="p-2">{customer.customer_type}</td>
                            <td className="p-2">{customer.account_status}</td>
                            <td className="p-2 text-right">
                                <div className="relative">
                                    <button
                                        className="h-8 w-8 rounded-full hover:cursor-pointer hover:bg-gray-300"
                                        onClick={() =>
                                            handleOpenEditMenu(
                                                customer.customer_id,
                                            )
                                        }
                                    >
                                        <i className="fa-solid fa-ellipsis"></i>
                                    </button>

                                    {editMenu === customer.customer_id && (
                                        <div className="shadow-light absolute top-8 right-0 z-50 h-25 w-50 rounded-2xl bg-white">
                                            <div className="flex h-full w-full flex-col px-4 py-2">
                                                <button
                                                    className="text-main-primary disabled:text-disable hover:text-main-secondary flex flex-1 items-center rounded-2xl px-3 font-semibold hover:cursor-pointer hover:bg-gray-300"
                                                    onClick={() =>
                                                        handleChangeAccountStatus(
                                                            customer.customer_id,
                                                            "approved",
                                                        )
                                                    }
                                                    disabled={
                                                        customer.account_status ===
                                                        "approved"
                                                    }
                                                >
                                                    Unban account
                                                </button>

                                                <button
                                                    className="disabled:text-disable flex flex-1 items-center rounded-2xl px-3 font-semibold text-red-600 hover:cursor-pointer hover:bg-gray-300 hover:text-red-500"
                                                    onClick={() =>
                                                        handleChangeAccountStatus(
                                                            customer.customer_id,
                                                            "rejected",
                                                        )
                                                    }
                                                    disabled={
                                                        customer.account_status ===
                                                        "rejected"
                                                    }
                                                >
                                                    Ban Account
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerListTable;
