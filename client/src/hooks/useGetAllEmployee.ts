import { getAllEmployee } from "@/features/accounts/services/account.api";
import type { Employee } from "@/features/accounts/types/accounts.type";
import { useEffect, useState } from "react";

export const useGetAllEmployee = () => {
    const [employee, setEmployee] = useState<Employee[]>([]);

    const handleGetAllEmployee = async () => {
        try {
            const res = await getAllEmployee(false);

            if (res) {
                setEmployee(res);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetAllEmployee();
    }, []);

    return employee;
};
