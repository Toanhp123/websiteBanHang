import { getWarehouse } from "@/features/products/services/product.api";
import type { Warehouse } from "@/features/products/types/product.type";
import { useEffect, useState } from "react";

export const useGetWarehouse = () => {
    const [warehouse, setWarehouse] = useState<Warehouse[]>([]);

    const handleGetAllWarehouse = async () => {
        try {
            const res = await getWarehouse();

            if (res) {
                setWarehouse(res);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetAllWarehouse();
    }, []);

    return warehouse;
};
