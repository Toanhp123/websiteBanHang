import { getSupplier } from "@/features/products/services/product.api";
import type { Supplier } from "@/features/products/types/product.type";
import { useEffect, useState } from "react";

export const useGetSupplier = () => {
    const [supplier, setSupplier] = useState<Supplier[]>([]);

    const handleGetSupplier = async () => {
        try {
            const res = await getSupplier();

            setSupplier(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetSupplier();
    }, []);

    return supplier;
};
