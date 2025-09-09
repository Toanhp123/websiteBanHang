import { getAllPositionEmployee } from "@/features/accounts/services/account.api";
import type { PositionEmployee } from "@/features/accounts/types/accounts.type";
import { useEffect, useState } from "react";

export const useGetAllPositionEmployee = () => {
    const [position, setPosition] = useState<PositionEmployee[]>([]);

    const handleGetAllPosition = async () => {
        try {
            const res = await getAllPositionEmployee();

            setPosition(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetAllPosition();
    }, []);

    return position;
};
