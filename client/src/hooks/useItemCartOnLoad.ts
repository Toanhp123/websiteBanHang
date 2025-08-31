import { getCartFromDatabase } from "@/features/cart/services/cart.api";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { selectCart, setItemToCart } from "@/features/cart/redux/cart.slice";
import { useEffect, useState } from "react";

export const useItemCartOnLoad = () => {
    const [loading, setLoading] = useState(true);
    const cart = useAppSelector(selectCart);
    const dispatch = useAppDispatch();

    const handleGetItemCartOnLoad = async (): Promise<void> => {
        const res = await getCartFromDatabase();

        if (res) {
            dispatch(setItemToCart(res));
        }

        setLoading(false);
    };

    useEffect(() => {
        handleGetItemCartOnLoad();
    }, []);

    return { cart, loading };
};
