import {
    selectShippingAddress,
    setShippingAddress,
} from "@/features/invoice/redux/shippingAddress.slice";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { useEffect } from "react";
import { getAllAddressShipping } from "@/features/invoice/services/invoice.api";

export const useGetAddressShipping = () => {
    const shippingAddress = useAppSelector(selectShippingAddress);
    const dispatch = useAppDispatch();

    const handleGetAllAddressShipping = async () => {
        const res = await getAllAddressShipping();

        if (res) {
            dispatch(setShippingAddress(res));
        }
    };

    useEffect(() => {
        handleGetAllAddressShipping();
    }, []);

    return shippingAddress;
};
