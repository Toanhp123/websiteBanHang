import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import {
    selectCategories,
    setCategories,
} from "@/features/categories/redux/category.slice";
import { getCategories } from "@/features/categories/services/getCategories.api";

export const useCategories = () => {
    const category = useAppSelector(selectCategories);
    const dispatch = useAppDispatch();

    const handleGetCategories = async (): Promise<void> => {
        dispatch(setCategories(await getCategories()));
    };

    useEffect(() => {
        if (category.categories.length === 0) {
            handleGetCategories();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return category;
};
